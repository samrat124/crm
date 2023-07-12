const express = require('express');
const enquiryController = require('../controllers/enquiryController');
const { authenticateEmployee } = require('../utils/auth');

const router = express.Router();

// Public Enquiry Submission
router.post('/', enquiryController.submitEnquiry);

// Claim Enquiry
router.post('/:enquiryId/claim', authenticateEmployee, enquiryController.claimEnquiry);

// Fetch Unclaimed Enquiries
router.get('/unclaimed', authenticateEmployee, enquiryController.getUnclaimedEnquiries);

// Fetch User's Claimed Enquiries
router.get('/claimed', authenticateEmployee, enquiryController.getClaimedEnquiries);

module.exports = router;
