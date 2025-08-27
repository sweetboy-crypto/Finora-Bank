const Portfolio = require('../models/Portfolio');
const Holding = require('../models/Holding');

// @desc    Get portfolio for the logged-in user
// @route   GET /api/portfolio
// @access  Private
exports.getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    // Find holdings and populate the 'asset' field with details from the Asset model
    const holdings = await Holding.find({ portfolio: portfolio._id }).populate({
      path: 'asset',
      select: 'name tickerSymbol currentPrice assetType'
    });

    // Calculate total portfolio value
    const totalValue = holdings.reduce((acc, holding) => {
      return acc + (holding.quantity * holding.asset.currentPrice);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        _id: portfolio._id,
        user: portfolio.user,
        holdings,
        totalValue,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
