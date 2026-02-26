const Query = require('../models/Query');

exports.createQuery = async (req, res, next) => {
  try {
    const {
      studentName,
      className,
      board,
      school,
      requirement,
      contactNumber,
      location,
      city,
      leadsource,
    } = req.body;
    const query = await Query.create({
      studentName,
      className,
      board,
      school: school || '',
      requirement: requirement || '',
      contactNumber,
      location: location || '',
      city,
      leadsource: leadsource || '',
    });
    res.status(201).json(query);
  } catch (err) {
    next(err);
  }
};

exports.getQueries = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const allowedLimits = [20, 50, 100];
    const finalLimit = allowedLimits.includes(limit) ? limit : 20;
    const skip = (page - 1) * finalLimit;

    const [queries, total] = await Promise.all([
      Query.find().sort({ createdAt: -1 }).skip(skip).limit(finalLimit).lean(),
      Query.countDocuments(),
    ]);

    res.json({
      queries,
      total,
      page,
      totalPages: Math.ceil(total / finalLimit) || 1,
      limit: finalLimit,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateQuery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      studentName,
      className,
      board,
      school,
      requirement,
      contactNumber,
      location,
      city,
      leadsource,
    } = req.body;
    const query = await Query.findByIdAndUpdate(
      id,
      {
        ...(studentName != null && { studentName }),
        ...(className != null && { className }),
        ...(board != null && { board }),
        ...(school != null && { school }),
        ...(requirement != null && { requirement }),
        ...(contactNumber != null && { contactNumber }),
        ...(location != null && { location }),
        ...(city != null && { city }),
        ...(leadsource != null && { leadsource }),
      },
      { new: true }
    );
    if (!query) return res.status(404).json({ message: 'Query not found' });
    res.json(query);
  } catch (err) {
    next(err);
  }
};

exports.deleteQuery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await Query.findByIdAndDelete(id);
    if (!query) return res.status(404).json({ message: 'Query not found' });
    res.json({ message: 'Query deleted' });
  } catch (err) {
    next(err);
  }
};
