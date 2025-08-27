const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Get all transactions for a specific account
// @route   GET /api/accounts/:accountId/transactions
// @access  Private
exports.getTransactionsForAccount = async (req, res, next) => {
  try {
    // First, check if the account belongs to the logged-in user
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authorized to access this account' });
    }

    const transactions = await Transaction.find({ account: req.params.accountId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Transfer funds between accounts
// @route   POST /api/transactions/transfer
// @access  Private
exports.transferFunds = async (req, res, next) => {
    // For simplicity, this route is not nested. We get account IDs from the body.
    const { fromAccountId, toAccountId, amount, description } = req.body;

    if (fromAccountId === toAccountId) {
        return res.status(400).json({ success: false, message: 'Cannot transfer to the same account' });
    }

    try {
        const fromAccount = await Account.findById(fromAccountId);
        const toAccount = await Account.findById(toAccountId);

        // Validation
        if (!fromAccount || !toAccount) {
            return res.status(404).json({ success: false, message: 'One or more accounts not found' });
        }
        if (fromAccount.user.toString() !== req.user.id || toAccount.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'User not authorized for one or more accounts' });
        }
        if (fromAccount.balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient funds' });
        }

        // Perform transfer
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        // Save both account changes
        await fromAccount.save();
        await toAccount.save();

        // Create transaction records for both accounts
        await Transaction.create({
            account: fromAccountId,
            type: 'transfer',
            amount: -amount,
            description: `Transfer to ${toAccount.accountName}: ${description}`,
        });
        await Transaction.create({
            account: toAccountId,
            type: 'transfer',
            amount: amount,
            description: `Transfer from ${fromAccount.accountName}: ${description}`,
        });

        res.status(200).json({ success: true, data: { fromAccount, toAccount } });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add a deposit transaction
// @route   POST /api/accounts/:accountId/transactions/deposit
// @access  Private
exports.addDeposit = async (req, res, next) => {
  try {
    const { amount, description } = req.body;
    const accountId = req.params.accountId;

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authorized' });
    }

    // Update balance
    account.balance += amount;
    await account.save();

    // Create transaction record
    await Transaction.create({
      account: accountId,
      type: 'deposit',
      amount,
      description,
    });

    res.status(200).json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add a withdrawal transaction
// @route   POST /api/accounts/:accountId/transactions/withdraw
// @access  Private
exports.addWithdrawal = async (req, res, next) => {
  try {
    const { amount, description } = req.body;
    const accountId = req.params.accountId;

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authorized' });
    }
    if (account.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient funds' });
    }

    // Update balance
    account.balance -= amount;
    await account.save();

    // Create transaction record
    await Transaction.create({
      account: accountId,
      type: 'withdrawal',
      amount: -amount, // Store withdrawal as a negative number
      description,
    });

    res.status(200).json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
