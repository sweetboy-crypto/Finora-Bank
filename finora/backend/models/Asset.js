const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an asset name'],
    trim: true,
  },
  tickerSymbol: {
    type: String,
    required: [true, 'Please add a ticker symbol'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  currentPrice: {
    type: Number,
    required: [true, 'Please add a current price'],
  },
  assetType: {
    type: String,
    enum: ['Stock', 'ETF', 'Mutual Fund'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Asset', AssetSchema);
