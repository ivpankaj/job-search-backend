const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  company: String,
  location: String,
  jobLink: String,
  employmentType: String,
  experience: String,
  source: String,
  country: String,
  postedDateTime: Date,
  companyImageUrl: String,
  minExp: Number,
  maxExp: Number,

});

module.exports = mongoose.model('Job', JobSchema);
