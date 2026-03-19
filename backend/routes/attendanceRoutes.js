const express = require('express');
const router = express.Router();
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');
const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.use(protect);

router.post('/:classId/mark', permit('teacher', 'admin', 'staff'), [
  body('present').isArray().withMessage('Present must be an array of student IDs')
], runValidation, markAttendance);

router.get('/:classId', permit('teacher', 'admin', 'staff', 'student'), getAttendance);

module.exports = router;
