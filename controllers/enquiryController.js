const Enquiry = require('../models/enquiryModel');

const submitEnquiry = async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const enquiry = new Enquiry({ name, email, course });
    await enquiry.save();
    res.json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const claimEnquiry = async (req, res) => {
  try {
    const { enquiryId } = req.params;
    const employeeId = req.employee._id;
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    if (enquiry.claimedBy) {
      return res.status(400).json({ message: 'Enquiry is already claimed' });
    }
    enquiry.claimedBy = employeeId;
    await enquiry.save();
    res.json({ message: 'Enquiry claimed successfully' });
  } catch (error) {
    console.error('Claim enquiry error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const getUnclaimedEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: null });
    res.json({ enquiries });
  } catch (error) {
    console.error('Fetch unclaimed enquiries error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const getClaimedEnquiries = async (req, res) => {
  try {
    const employeeId = req.employee._id;
    const enquiries = await Enquiry.find({ claimedBy: employeeId });
    res.json({ enquiries });
  } catch (error) {
    console.error('Fetch claimed enquiries error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  submitEnquiry,
  claimEnquiry,
  getUnclaimedEnquiries,
  getClaimedEnquiries,
};
