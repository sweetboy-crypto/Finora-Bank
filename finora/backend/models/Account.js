const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  accountName: {
    type: String,
    default: 'Primary Checking'
  },
  accountType: {
    type: String,
    enum: ['Checking', 'Savings', 'Investment'],
    default: 'Checking',
  },
  balance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
