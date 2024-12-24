const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');

router.post('/create', async (req, res) => {
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
    maxExp
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
});



// Fetch all jobs
// Updated backend to return totalPages
router.get('/get', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const jobs = await Job.find().skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);

    res.json({
      jobs: jobs,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});


// Filter jobs by location
router.get('/search', async (req, res) => {
  const { location } = req.query;
  try {
    const jobs = await Job.find({ location: new RegExp(location, 'i') });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Fetch a single job by ID
router.get('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

module.exports = router;
