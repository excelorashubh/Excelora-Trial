const express = require('express');
const router = express.Router();
const { listUsers, createUser, updateUser, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');
const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.use(protect, permit('admin'));

router.get('/users', listUsers);
router.post('/users', [
	body('name').trim().notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
], runValidation, createUser);
router.put('/users/:id', [
	body('email').optional().isEmail().withMessage('Valid email is required'),
	body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
], runValidation, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
