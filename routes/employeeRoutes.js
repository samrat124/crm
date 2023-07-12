const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Employee Registration
router.post('/register', employeeController.register);

// Employee Login
router.post('/login', employeeController.login);

module.exports = router;
