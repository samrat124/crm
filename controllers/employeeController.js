const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }
    const employee = new Employee({ email, password });
    await employee.save();
    res.json({ message: 'Employee registered successfully' });
  } catch (error) {
    console.error('Employee registration error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee || employee.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ email: employee.email }, 'secret_key');
    res.json({ token });
  } catch (error) {
    console.error('Employee login error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  register,
  login,
};
