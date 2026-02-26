const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  classDate: { type: String }, // Format: YYYY-MM-DD
  classTime: { type: String }, // Format: HH:MM
  schedule: { type: Date }, // Kept for backward compatibility
  meetingLink: { type: String },
  materials: [{ type: String }],
  assignments: [{ title: String, file: String, dueDate: Date }],
  attendance: [{ date: Date, present: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }],
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
