const axios = require('axios');
const Payment = require('../models/Payment');
const Plan = require('../models/Plan');

// @desc    Initiate payment
// @route   POST /api/payment/initiate
// @access  Public
exports.initiatePayment = async (req, res, next) => {
  try {
    const { email, planTitle } = req.body;

    // Find the plan to get the amount
    const plan = await Plan.findOne({ title: planTitle });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    if (plan.amount === 0) {
      return res.status(400).json({ success: false, message: 'Please contact us for this plan.' });
    }

    const exchangeRate = Number(process.env.EXCHANGE_RATE) || 1600;
    const amountInKobo = plan.amount * 100 * exchangeRate; 

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: Math.round(amountInKobo),
        currency: process.env.CURRENCY || 'NGN',
        metadata: {
          planTitle,
          custom_fields: [
            {
              display_name: "Plan",
              variable_name: "plan",
              value: planTitle
            }
          ]
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { authorization_url, reference } = response.data.data;

    // Save pending payment to DB
    await Payment.create({
      email,
      plan: planTitle,
      amount: plan.amount,
      reference,
      status: 'pending',
    });

    res.status(200).json({
      success: true,
      data: {
        authorization_url,
        reference,
      },
    });
  } catch (error) {
    console.error('Paystack error:', error.response?.data || error.message);
    next(error);
  }
};

// @desc    Verify payment
// @route   GET /api/payment/verify
// @access  Public
exports.verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.query;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, amount, customer, metadata } = response.data.data;

    if (status === 'success') {
      // Update payment in DB
      await Payment.findOneAndUpdate(
        { reference },
        {
          status: 'success',
          transactionId: response.data.data.id.toString(),
        }
      );

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: response.data.data,
      });
    } else {
      await Payment.findOneAndUpdate({ reference }, { status: 'failed' });
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        status,
      });
    }
  } catch (error) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    next(error);
  }
};
