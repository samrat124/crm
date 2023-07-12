const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
