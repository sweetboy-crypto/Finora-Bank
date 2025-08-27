const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserAccounts,
    updateUserAccountBalance
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

module.exports = router;
