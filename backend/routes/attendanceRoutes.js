const express = require('express');
const router = express.Router();
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.use(protect);

const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.post('/:classId/mark', permit('teacher','admin'), [
	body('present').isArray().withMessage('Present must be an array of student IDs')
], runValidation, markAttendance);
router.get('/:classId', permit('teacher','admin','student'), getAttendance);

module.exports = router;
