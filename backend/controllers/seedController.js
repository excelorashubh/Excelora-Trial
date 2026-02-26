const User = require('../models/User');
const Class = require('../models/Class');
const bcrypt = require('bcrypt');

exports.seedDemoData = async (req, res, next) => {
  try {
    // Check if demo data already exists
    const existingAdmin = await User.findOne({ email: 'admin@demo.com' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Demo data already seeded' });
    }

    // Create demo users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Demo123!', salt);

    const admin = await User.create({
      name: 'Admin Demo',
      email: 'admin@demo.com',
      password: hashedPassword,
      role: 'admin'
    });

    const teacher = await User.create({
      name: 'John Teacher',
      email: 'teacher@demo.com',
      password: hashedPassword,
      role: 'teacher'
    });

    const student1 = await User.create({
      name: 'Alice Student',
      email: 'student1@demo.com',
      password: hashedPassword,
      role: 'student'
    });

    const student2 = await User.create({
      name: 'Bob Student',
      email: 'student2@demo.com',
      password: hashedPassword,
      role: 'student'
    });

    // Create demo classes
    const class1 = await Class.create({
      title: 'React Advanced Patterns',
      subject: 'Frontend Development',
      teacher: teacher._id,
      students: [student1._id, student2._id],
      schedule: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      meetingLink: 'https://zoom.us/j/123456789',
      status: 'upcoming'
    });

    const class2 = await Class.create({
      title: 'Node.js Fundamentals',
      subject: 'Backend Development',
      teacher: teacher._id,
      students: [student1._id],
      schedule: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      meetingLink: 'https://zoom.us/j/987654321',
      status: 'upcoming'
    });

    res.json({
      message: 'Demo data seeded successfully',
      admin: { email: admin.email, password: 'Demo123!' },
      teacher: { email: teacher.email, password: 'Demo123!' },
      students: [
        { email: student1.email, password: 'Demo123!' },
        { email: student2.email, password: 'Demo123!' }
      ],
      classes: [
        { title: class1.title, students: 2 },
        { title: class2.title, students: 1 }
      ]
    });
  } catch (err) {
    next(err);
  }
};

exports.clearDemoData = async (req, res, next) => {
  try {
    await User.deleteMany({ email: { $in: ['admin@demo.com', 'teacher@demo.com', 'student1@demo.com', 'student2@demo.com'] } });
    await Class.deleteMany({ title: { $in: ['React Advanced Patterns', 'Node.js Fundamentals'] } });
    res.json({ message: 'Demo data cleared' });
  } catch (err) {
    next(err);
  }
};
