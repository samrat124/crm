const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Start the server
const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
