const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

// Define Employee schema
const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true, required: true }, // Unique and required employee ID
  full_name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true }, 
});


module.exports = mongoose.model('Employee', EmployeeSchema);
