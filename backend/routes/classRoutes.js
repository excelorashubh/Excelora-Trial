const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClass, updateClass, deleteClass } = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');
const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.use(protect);

router.post('/', permit('admin'), [
	body('title').trim().notEmpty().withMessage('Title is required'),
	body('subject').trim().notEmpty().withMessage('Subject is required')
], runValidation, createClass);
router.get('/', getClasses);
router.get('/:id', getClass);
router.put('/:id', permit('admin'), [
	body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
	body('subject').optional().trim().notEmpty().withMessage('Subject cannot be empty')
], runValidation, updateClass);
router.delete('/:id', permit('admin'), deleteClass);

module.exports = router;
