const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPayment } = require('../controllers/paymentController');

const { validatePayment } = require('../middleware/validation');

router.post('/initiate', validatePayment, initiatePayment);
router.get('/verify', verifyPayment);

module.exports = router;
