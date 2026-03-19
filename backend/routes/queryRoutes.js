const express = require('express');
const router = express.Router();
const { createQuery, getQueries, updateQuery, deleteQuery } = require('../controllers/queryController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.use(protect);

// Salesman and staff can create/view/update queries; only admin can delete
router.post('/', permit('admin', 'salesman', 'staff'), createQuery);
router.get('/', permit('admin', 'salesman', 'staff'), getQueries);
router.put('/:id', permit('admin', 'salesman', 'staff'), updateQuery);
router.delete('/:id', permit('admin'), deleteQuery);

module.exports = router;
