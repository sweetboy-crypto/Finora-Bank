const express = require('express');
const { getAccounts, createAccount } = require('../controllers/accountsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Re-route into other resource routers
const transactionRouter = require('./accountTransactions');
router.use('/:accountId/transactions', transactionRouter);

// All routes in this file will be protected
router.use(protect);

router.route('/').get(getAccounts).post(createAccount);

module.exports = router;
