const express = require('express');
const {
  getTransactionsForAccount,
  addDeposit,
  addWithdrawal
} = require('../controllers/transactionsController');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(protect, getTransactionsForAccount);

router.route('/deposit')
  .post(protect, addDeposit);

router.route('/withdraw')
  .post(protect, addWithdrawal);

module.exports = router;
