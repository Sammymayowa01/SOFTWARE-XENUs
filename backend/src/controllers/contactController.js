const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been received. We will get back to you soon.'
    });
  } catch (error) {
    next(error);
  }
};
