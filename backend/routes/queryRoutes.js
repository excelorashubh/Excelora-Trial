const express = require('express');
const router = express.Router();
const { createQuery, getQueries, updateQuery, deleteQuery } = require('../controllers/queryController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/', permit('admin'), createQuery);
router.get('/', permit('admin'), getQueries);
router.put('/:id', permit('admin'), updateQuery);
router.delete('/:id', permit('admin'), deleteQuery);

module.exports = router;
