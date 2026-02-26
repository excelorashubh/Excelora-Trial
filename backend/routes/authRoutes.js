const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.post('/register', [
	body('name').trim().notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], runValidation, register);

router.post('/login', [
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').notEmpty().withMessage('Password is required')
], runValidation, login);

router.get('/me', protect, getMe);

module.exports = router;
