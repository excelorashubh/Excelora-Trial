const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const User = require('../models/User');

let rz = null;

const getRazorpay = () => {
  if (!rz) {
    rz = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  return rz;
};

exports.createOrder = async (req, res, next) => {
  try {
    const { amount, month } = req.body;
    if (!amount || !month) return res.status(400).json({ message: 'Missing amount or month' });
    const options = {
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    };
    const order = await getRazorpay().orders.create(options);
    // create pending payment record
    const payment = await Payment.create({ student: req.user.id, month, amount, status: 'pending', transactionId: order.id });
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID, paymentId: payment._id, amount: options.amount });
  } catch (err) { next(err); }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentRecordId } = req.body;
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (shasum !== razorpay_signature) return res.status(400).json({ message: 'Invalid signature' });
    // update payment record
    const p = await Payment.findByIdAndUpdate(paymentRecordId, { status: 'paid', transactionId: razorpay_payment_id, date: new Date() }, { new: true });
    res.json({ success: true, payment: p });
  } catch (err) { next(err); }
};

exports.getPayments = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    let query = {};
    if (role === 'student') query = { student: id };
    const list = await Payment.find(query).populate('student', 'name email');
    res.json(list);
  } catch (err) { next(err); }
};
