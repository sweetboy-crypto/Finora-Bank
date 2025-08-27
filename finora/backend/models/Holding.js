const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.ObjectId,
    ref: 'Portfolio',
    required: true,
  },
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can't have duplicate holdings of the same asset in one portfolio
HoldingSchema.index({ portfolio: 1, asset: 1 }, { unique: true });

module.exports = mongoose.model('Holding', HoldingSchema);
