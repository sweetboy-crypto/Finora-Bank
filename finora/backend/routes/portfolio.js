const express = require('express');
const { getPortfolio } = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/').get(getPortfolio);

module.exports = router;
