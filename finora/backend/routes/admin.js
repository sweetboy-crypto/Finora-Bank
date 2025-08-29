const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserAccounts,
    updateUserAccountBalance,
    getStats,
    getUserPortfolio,
    getAllTransactions,
    updateUserHolding
} = require('../controllers/adminController');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// All routes in this file are protected and restricted to admins
router.use(protect);
router.use(authorize('admin'));

router.route('/users')
    .get(getUsers);

router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/users/:userId/accounts')
    .get(getUserAccounts);

router.route('/accounts/:accountId')
    .put(updateUserAccountBalance);

router.route('/stats')
    .get(getStats);

router.route('/users/:userId/portfolio')
    .get(getUserPortfolio);

router.route('/transactions')
    .get(getAllTransactions);

router.route('/holdings/:holdingId')
    .put(updateUserHolding);

module.exports = router;
