const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user has only one portfolio
  },
  // We can add summary fields later, like totalValue
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
