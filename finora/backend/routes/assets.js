const express = require('express');
const { getAssets } = require('../controllers/assetsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/').get(getAssets);

module.exports = router;
