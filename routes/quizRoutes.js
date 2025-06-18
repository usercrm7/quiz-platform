const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createQuiz } = require('../controllers/quizController');

router.post('/', auth, createQuiz);

module.exports = router;