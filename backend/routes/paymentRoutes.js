const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { runValidation } = require('../utils/validate');

router.use(protect);

router.post('/create-order', [
	body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
	body('month').trim().notEmpty().withMessage('Month is required')
], runValidation, createOrder);

router.post('/verify', [
	body('razorpay_order_id').notEmpty(),
	body('razorpay_payment_id').notEmpty(),
	body('razorpay_signature').notEmpty(),
	body('paymentRecordId').notEmpty()
], runValidation, verifyPayment);

router.get('/', getPayments);

module.exports = router;
