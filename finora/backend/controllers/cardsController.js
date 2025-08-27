const Card = require('../models/Card');

// @desc    Get all saved cards for the logged-in user
// @route   GET /api/cards
// @access  Private
exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({ user: req.user.id });
    res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add a new card for the logged-in user
// @route   POST /api/cards
// @access  Private
exports.addCard = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    // For a real app, you would never store full card details.
    // This is safe because we only store the last four digits.
    const card = await Card.create(req.body);

    res.status(201).json({ success: true, data: card });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
