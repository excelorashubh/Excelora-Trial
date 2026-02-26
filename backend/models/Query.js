const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  board: { type: String, required: true },
  school: { type: String, default: '' },
  requirement: { type: String, default: '' },
  contactNumber: { type: String, required: true },
  location: { type: String, default: '' },
  city: { type: String, required: true },
  leadsource: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
