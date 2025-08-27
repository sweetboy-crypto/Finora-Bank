const express = require('express');
const { getCards, addCard } = require('../controllers/cardsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/')
    .get(getCards)
    .post(addCard);

module.exports = router;
