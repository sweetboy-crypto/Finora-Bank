const Holding = require('../models/Holding');
const Portfolio = require('../models/Portfolio');
const Asset = require('../models/Asset');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// @desc    Buy an asset
// @route   POST /api/holdings/buy
// @access  Private
exports.buyAsset = async (req, res, next) => {
    const { assetId, quantity, fromAccountId } = req.body;
    const numericQuantity = Number(quantity);

    try {
        const asset = await Asset.findById(assetId);
        const account = await Account.findById(fromAccountId);
        const portfolio = await Portfolio.findOne({ user: req.user.id });

        // Validations
        if (!asset || !account || !portfolio) {
            return res.status(404).json({ success: false, message: 'Required data not found.' });
        }
        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to use this account.' });
        }

        const totalCost = asset.currentPrice * numericQuantity;
        if (account.balance < totalCost) {
            return res.status(400).json({ success: false, message: 'Insufficient funds.' });
        }

        // Process transaction
        account.balance -= totalCost;

        let holding = await Holding.findOne({ portfolio: portfolio._id, asset: assetId });

        if (holding) {
            // Update existing holding
            const newTotalQuantity = holding.quantity + numericQuantity;
            const newTotalCost = (holding.quantity * holding.purchasePrice) + totalCost;
            holding.purchasePrice = newTotalCost / newTotalQuantity; // New average price
            holding.quantity = newTotalQuantity;
        } else {
            // Create new holding
            holding = new Holding({
                portfolio: portfolio._id,
                asset: assetId,
                quantity: numericQuantity,
                purchasePrice: asset.currentPrice
            });
        }

        await account.save();
        await holding.save();
        await Transaction.create({
            account: fromAccountId,
            type: 'transfer', // Represent as a transfer to investment
            amount: -totalCost,
            description: `Buy ${numericQuantity} shares of ${asset.tickerSymbol}`
        });

        res.status(200).json({ success: true, data: holding });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Sell an asset
// @route   POST /api/holdings/sell
// @access  Private
exports.sellAsset = async (req, res, next) => {
    const { holdingId, quantity, toAccountId } = req.body;
    const numericQuantity = Number(quantity);

    try {
        const holding = await Holding.findById(holdingId).populate('asset');
        const account = await Account.findById(toAccountId);

        // Validations
        if (!holding || !account) {
            return res.status(404).json({ success: false, message: 'Required data not found.' });
        }
        const portfolio = await Portfolio.findOne({ _id: holding.portfolio, user: req.user.id });
        if (!portfolio || account.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized for this action.' });
        }
        if (holding.quantity < numericQuantity) {
            return res.status(400).json({ success: false, message: 'Cannot sell more shares than you own.' });
        }

        // Process transaction
        const proceeds = holding.asset.currentPrice * numericQuantity;
        account.balance += proceeds;

        holding.quantity -= numericQuantity;

        await account.save();

        if (holding.quantity === 0) {
            await holding.deleteOne();
        } else {
            await holding.save();
        }

        await Transaction.create({
            account: toAccountId,
            type: 'transfer', // Represent as a transfer from investment
            amount: proceeds,
            description: `Sell ${numericQuantity} shares of ${holding.asset.tickerSymbol}`
        });

        res.status(200).json({ success: true, data: {} });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
