const Asset = require('../models/Asset');

const defaultAssets = [
    { name: 'Finora Growth Fund', tickerSymbol: 'FNGRX', currentPrice: 508.61, assetType: 'Mutual Fund' },
    { name: 'Tech Stocks ETF', tickerSymbol: 'FTEC', currentPrice: 154.30, assetType: 'ETF' },
    { name: 'US Bond Index', tickerSymbol: 'BND', currentPrice: 75.50, assetType: 'ETF' },
    { name: 'Global Equity Fund', tickerSymbol: 'GLBEQ', currentPrice: 210.75, assetType: 'Mutual Fund' },
    { name: 'Innovate Corp', tickerSymbol: 'INVT', currentPrice: 88.20, assetType: 'Stock' },
];

// @desc    Get all available assets, and seed if empty
// @route   GET /api/assets
// @access  Private
exports.getAssets = async (req, res, next) => {
  try {
    let assets = await Asset.find();

    // If no assets exist, seed the database with defaults
    if (assets.length === 0) {
      console.log('No assets found, seeding database...');
      await Asset.insertMany(defaultAssets);
      assets = await Asset.find();
    }

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
