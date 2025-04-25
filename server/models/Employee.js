const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true, required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
