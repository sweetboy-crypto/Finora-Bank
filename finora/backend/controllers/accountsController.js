const Account = require('../models/Account');

// @desc    Get all accounts for the logged-in user
// @route   GET /api/accounts
// @access  Private
exports.getAccounts = async (req, res, next) => {
  try {
    // req.user is attached by the protect middleware
    const accounts = await Account.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: accounts.length,
      data: accounts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new account for the logged-in user
// @route   POST /api/accounts
// @access  Private
exports.createAccount = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const account = await Account.create(req.body);

    res.status(201).json({
      success: true,
      data: account
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
