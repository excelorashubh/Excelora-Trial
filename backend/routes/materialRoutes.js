const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadMaterial } = require('../controllers/materialController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

// Only teachers and admins can upload materials for a class
router.post('/:classId/upload', protect, permit('teacher', 'admin'), upload.single('file'), uploadMaterial);

module.exports = router;
