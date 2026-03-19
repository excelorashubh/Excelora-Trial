const User = require('../models/User');

exports.listUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) filter.$or = [
      { name: new RegExp(req.query.search, 'i') },
      { email: new RegExp(req.query.search, 'i') }
    ];
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .skip(skip).limit(limit)
      .select('-password')
      .populate('assignedTeacher', 'name email subject')
      .populate('assignedStudents', 'name email class');
    res.json({ total, page, perPage: limit, users });
  } catch (err) { next(err); }
};

exports.createUser = async (req, res, next) => {
  try {
    const {
      name, email, password, role,
      phone, class: cls, school,
      qualification, subject, experience,
      weeklySchedule, weeklyAvailability,
      assignedStudents, assignedTeacher, status
    } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    // Model pre-save hook handles password hashing
    const user = await User.create({
      name, email, password, role: role || 'student',
      phone, class: cls, school,
      qualification, subject, experience,
      weeklySchedule, weeklyAvailability,
      assignedStudents, assignedTeacher, status
    });

    const populated = await User.findById(user._id)
      .select('-password')
      .populate('assignedTeacher', 'name email subject')
      .populate('assignedStudents', 'name email');
    res.status(201).json(populated);
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    // If password is being updated, let the pre-save hook handle hashing
    if (updates.password) {
      const user = await User.findById(req.params.id).select('+password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.set(updates);
      await user.save();
      const updated = await User.findById(req.params.id)
        .select('-password')
        .populate('assignedTeacher', 'name email subject')
        .populate('assignedStudents', 'name email');
      return res.json(updated);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
      .select('-password')
      .populate('assignedTeacher', 'name email subject')
      .populate('assignedStudents', 'name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

// Assign a teacher to a student
exports.assignTeacher = async (req, res, next) => {
  try {
    const { studentId, teacherId } = req.body;
    const student = await User.findByIdAndUpdate(
      studentId,
      { assignedTeacher: teacherId },
      { new: true }
    ).select('-password').populate('assignedTeacher', 'name email subject');

    // Also add student to teacher's assignedStudents
    await User.findByIdAndUpdate(teacherId, { $addToSet: { assignedStudents: studentId } });

    res.json(student);
  } catch (err) { next(err); }
};

// Get all students assigned to a teacher
exports.getTeacherStudents = async (req, res, next) => {
  try {
    const students = await User.find({ assignedTeacher: req.params.teacherId })
      .select('-password');
    res.json(students);
  } catch (err) { next(err); }
};
