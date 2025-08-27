const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  cardholderName: {
    type: String,
    required: [true, 'Please add a cardholder name'],
    trim: true,
  },
  cardType: {
    type: String,
    enum: ['Visa', 'Mastercard', 'Amex'],
    required: true,
  },
  lastFour: {
    type: String,
    required: [true, 'Please add the last four digits of the card number'],
    minlength: 4,
    maxlength: 4,
  },
  expiryDate: {
    type: String, // Stored as MM/YY string
    required: [true, 'Please add an expiry date'],
    match: [/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Please use MM/YY format'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', CardSchema);
