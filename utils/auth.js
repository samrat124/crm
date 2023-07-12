const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');

const authenticateEmployee = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }
  jwt.verify(token, 'secret_key', async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const { email } = decoded;
    try {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.employee = employee;
      next();
    } catch (error) {
      console.error('Employee authentication error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
};

module.exports = {
  authenticateEmployee,
};
