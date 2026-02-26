const express = require('express');
const router = express.Router();
const { seedDemoData, clearDemoData } = require('../controllers/seedController');

// POST /api/seed/demo - Create demo data
router.post('/demo', seedDemoData);

// POST /api/seed/clear - Clear demo data
router.post('/clear', clearDemoData);

module.exports = router;
