
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to create a new job
router.post('/create', jobController.createJob);

// Route to fetch all jobs with pagination
router.get('/get', jobController.getJobs);

// Route to filter jobs by location
router.get('/search', jobController.searchJobsByLocation);

// Route to fetch a job by ID
router.get('/:jobId', jobController.getJobById);

module.exports = router;
