const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const Holding = require('../models/Holding');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
     res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a user's investment holding
// @route   PUT /api/admin/holdings/:holdingId
// @access  Private/Admin
exports.updateUserHolding = async (req, res, next) => {
  try {
    const { quantity, purchasePrice } = req.body;

    const holding = await Holding.findByIdAndUpdate(req.params.holdingId, { quantity, purchasePrice }, {
      new: true,
      runValidators: true
    });

    if (!holding) {
      return res.status(404).json({ success: false, message: 'Holding not found' });
    }

    res.status(200).json({ success: true, data: holding });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all transactions on the platform
// @route   GET /api/admin/transactions
// @access  Private/Admin
exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate({
        path: 'account',
        select: 'accountNumber user',
        populate: {
            path: 'user',
            select: 'name email'
        }
    }).sort({ date: -1 });

    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get portfolio for a specific user
// @route   GET /api/admin/users/:userId/portfolio
// @access  Private/Admin
exports.getUserPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.params.userId });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio not found for this user' });
        }

        const holdings = await Holding.find({ portfolio: portfolio._id }).populate('asset');
        const totalValue = holdings.reduce((acc, holding) => acc + (holding.quantity * holding.asset.currentPrice), 0);

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
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAccounts = await Account.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    const totalFunds = await Account.aggregate([
      { $group: { _id: null, total: { $sum: '$balance' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalAccounts,
        totalTransactions,
        totalFunds: totalFunds[0]?.total || 0
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all accounts for a specific user
// @route   GET /api/admin/users/:userId/accounts
// @access  Private/Admin
exports.getUserAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.params.userId });
    res.status(200).json({ success: true, count: accounts.length, data: accounts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a user's account balance
// @route   PUT /api/admin/accounts/:accountId
// @access  Private/Admin
exports.updateUserAccountBalance = async (req, res, next) => {
  try {
    const { balance, description } = req.body;
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    const oldBalance = account.balance;
    account.balance = balance;
    await account.save();

    // Create a transaction log for the adjustment
    await Transaction.create({
      account: account._id,
      type: 'adjustment',
      amount: balance - oldBalance,
      description: `Admin adjustment: ${description}`,
    });

    res.status(200).json({ success: true, data: account });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update user details (e.g., role)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
     res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    // We should also delete associated accounts, portfolios, etc.
    // For now, we'll just delete the user for simplicity.
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
     res.status(500).json({ success: false, message: 'Server Error' });
  }
};
