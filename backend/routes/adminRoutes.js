const express = require('express');
const router = express.Router();
const {
  listUsers, createUser, updateUser, deleteUser,
  assignTeacher, getTeacherStudents
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');
const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.use(protect, permit('admin'));

router.get('/users', listUsers);

router.post('/users', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  body('role').optional().isIn(['admin', 'teacher', 'user', 'staff', 'salesman', 'student']).withMessage('Invalid role'),
], runValidation, createUser);

router.put('/users/:id', [
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  body('role').optional().isIn(['admin', 'teacher', 'user', 'staff', 'salesman', 'student']).withMessage('Invalid role'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
], runValidation, updateUser);

router.delete('/users/:id', deleteUser);

// Assign teacher to student
router.post('/assign-teacher', [
  body('studentId').notEmpty().withMessage('studentId is required'),
  body('teacherId').notEmpty().withMessage('teacherId is required'),
], runValidation, assignTeacher);

// Get students assigned to a teacher
router.get('/teachers/:teacherId/students', getTeacherStudents);

module.exports = router;
