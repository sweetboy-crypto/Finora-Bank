const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

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
