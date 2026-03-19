const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const weeklyScheduleSchema = new mongoose.Schema({
  day: String,
  startTime: String,
  endTime: String,
  subject: String,
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'user', 'staff', 'salesman', 'student'],
    default: 'student',
  },
  phone: {
    type: String,
  },
  class: {
    type: String,
  },
  school: {
    type: String,
  },
  weeklySchedule: [weeklyScheduleSchema],
  // Teacher & staff fields
  qualification: {
    type: String,
  },
  subject: {
    type: String,
  },
  experience: {
    type: Number,
  },
  weeklyAvailability: [weeklyScheduleSchema],
  assignedStudents: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  assignedTeacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
