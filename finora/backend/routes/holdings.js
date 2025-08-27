const express = require('express');
const { buyAsset, sellAsset } = require('../controllers/holdingsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.post('/buy', buyAsset);
router.post('/sell', sellAsset);

module.exports = router;
