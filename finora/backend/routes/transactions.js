const express = require('express');
const { transferFunds } = require('../controllers/transactionsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// This router handles general transaction-related routes

router.post('/transfer', protect, transferFunds);

module.exports = router;
