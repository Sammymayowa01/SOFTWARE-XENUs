const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  transactionId: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);
