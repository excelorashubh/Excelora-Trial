const Class = require('../models/Class');
const User = require('../models/User');

exports.markAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { date, present } = req.body; // present: array of student IDs
    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    cls.attendance = cls.attendance || [];
    cls.attendance.push({ date: date || new Date(), present });
    await cls.save();
    res.json({ message: 'Attendance recorded' });
  } catch (err) { next(err); }
};

exports.getAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const cls = await Class.findById(classId).populate('students', 'name email');
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json(cls.attendance || []);
  } catch (err) { next(err); }
};
