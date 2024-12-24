const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routers/jobs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
