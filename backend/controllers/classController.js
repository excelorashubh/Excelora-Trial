const Class = require('../models/Class');
const User = require('../models/User');
const { createGoogleMeetForClass } = require('../utils/googleCalendar');

exports.createClass = async (req, res, next) => {
  try {
    const { title, subject, teacher, students, classDate, classTime, meetingLink, teacherName, studentNames } = req.body;
    // Combine classDate and classTime for schedule field (backward compatibility)
    const schedule = classDate && classTime ? new Date(`${classDate}T${classTime}`) : null;
    
    // Resolve teacher by ID or by name
    let teacherId = teacher || null;
    let teacherDoc = null;
    if (!teacherId && teacherName) {
      teacherDoc = await User.findOne({ name: teacherName, role: 'teacher' });
      if (!teacherDoc) {
        return res.status(400).json({ message: 'Teacher not found' });
      }
      teacherId = teacherDoc._id;
    } else if (teacherId) {
      teacherDoc = await User.findById(teacherId);
    }

    // Resolve students by IDs or by names
    let studentIds = Array.isArray(students) ? students : [];
    if ((!studentIds || studentIds.length === 0) && Array.isArray(studentNames) && studentNames.length > 0) {
      const studentDocs = await User.find({ name: { $in: studentNames }, role: 'student' });
      studentIds = studentDocs.map(s => s._id);
    }

    // Collect student emails for calendar invite
    let studentEmails = [];
    if (studentIds && studentIds.length > 0) {
      const studentDocs = await User.find({ _id: { $in: studentIds } }).select('email');
      studentEmails = studentDocs.map(s => s.email).filter(Boolean);
    }

    // Auto-create Google Meet link when none is provided
    let finalMeetingLink = meetingLink;
    if (!finalMeetingLink && teacherDoc && teacherDoc.email && classDate && classTime) {
      try {
        const { meetLink } = await createGoogleMeetForClass({
          title,
          classDate,
          classTime,
          teacherEmail: teacherDoc.email,
          studentEmails,
        });
        if (meetLink) {
          finalMeetingLink = meetLink;
        }
      } catch (calendarErr) {
        // Fallback: continue without blocking class creation
        console.error('Failed to create Google Meet for class:', calendarErr.message || calendarErr);
      }
    }

    const cls = await Class.create({ 
      title, 
      subject, 
      teacher: teacherId || undefined, 
      students: studentIds || [], 
      classDate,
      classTime,
      schedule,
      meetingLink: finalMeetingLink || meetingLink 
    });
    res.status(201).json(cls);
  } catch (err) { next(err); }
};

exports.getClasses = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    let query = {};
    if (role === 'admin') {
      // Admins see all classes
      query = {};
    } else if (role === 'teacher') {
      // Teachers see classes they teach
      query = { teacher: id };
    } else if (role === 'student') {
      // Students see classes they're enrolled in
      query = { students: id };
    }
    const list = await Class.find(query)
      .populate('teacher', 'name email')
      .populate('students', 'name email')
      .populate('attendance.present', 'name email');
    res.json(list);
  } catch (err) { next(err); }
};

exports.getClass = async (req, res, next) => {
  try {
    const cls = await Class.findById(req.params.id).populate('teacher', 'name email').populate('students', 'name email');
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json(cls);
  } catch (err) { next(err); }
};

exports.updateClass = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    // Support updating by teacherName / studentNames as well
    const { teacherName, studentNames } = req.body;

    if (teacherName) {
      const teacherDoc = await User.findOne({ name: teacherName, role: 'teacher' });
      if (!teacherDoc) {
        return res.status(400).json({ message: 'Teacher not found' });
      }
      updates.teacher = teacherDoc._id;
      delete updates.teacherName;
    }

    if (Array.isArray(studentNames)) {
      const studentDocs = await User.find({ name: { $in: studentNames }, role: 'student' });
      updates.students = studentDocs.map(s => s._id);
      delete updates.studentNames;
    }

    const cls = await Class.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(cls);
  } catch (err) { next(err); }
};

exports.deleteClass = async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
