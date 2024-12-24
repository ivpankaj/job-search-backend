
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

  if (!location) {
    return res.status(400).json({ error: 'Location query parameter is required.' });
  }

  try {
    const jobs = await Job.find({ location: { $regex: location, $options: 'i' } }); // Case-insensitive search
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'No jobs found for the given location.' });
    }
    res.status(200).json({ jobs });
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
