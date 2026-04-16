const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
exports.getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a plan (Admin only conceptually)
// @route   POST /api/plans
// @access  Private/Admin
exports.createPlan = async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};
