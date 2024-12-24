const Job = require('../models/jobs');

exports.createJob = async (req, res) => {
  const {
    jobId,
    title,
    company,
    location,
    jobLink,
    employmentType,
    experience,
    source,
    country,
    postedDateTime,
    companyImageUrl,
    minExp,
    maxExp,
  } = req.body;

  try {
    const newJob = new Job({
      jobId,
      title,
      company,
      location,
      jobLink,
      employmentType,
      experience,
      source,
      country,
      postedDateTime,
      companyImageUrl,
      minExp,
      maxExp,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const jobs = await Job.find().skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);

    res.json({
      jobs,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

exports.searchJobsByLocation = async (req, res) => {
  const { location } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20; // Default to 20 items
  const skip = (page - 1) * limit;

  if (!location) {
    return res.status(400).json({ error: 'Location query parameter is required.' });
  }

  try {
    // Perform a case-insensitive search
    const jobs = await Job.find({ location: { $regex: location, $options: 'i' } })
      .skip(skip)
      .limit(limit);

    // Total matching jobs count for pagination
    const totalJobs = await Job.countDocuments({ location: { $regex: location, $options: 'i' } });
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).json({
      jobs,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
};



exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};