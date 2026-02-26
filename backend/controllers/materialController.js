const Class = require('../models/Class');

exports.uploadMaterial = async (req, res, next) => {
  try {
    const classId = req.params.classId;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const filePath = `/uploads/${req.file.filename}`;
    const cls = await Class.findByIdAndUpdate(classId, { $push: { materials: filePath } }, { new: true });
    res.json({ message: 'Uploaded', class: cls });
  } catch (err) { next(err); }
};
