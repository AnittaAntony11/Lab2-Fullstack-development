// server/routes/index.js
const express = require('express');
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');

const router = express.Router();

// Root route (optional)
router.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// POST: Add Employee
router.post('/api/employees', async (req, res) => {
  try {
    const { employee_id, full_name, email, hashed_password } = req.body;
    const newEmployee = new Employee({ employee_id, full_name, email, hashed_password });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: 'Error adding employee' });
  }
});

// POST: Add Project
router.post('/api/projects', async (req, res) => {
  try {
    const { project_code, project_name, project_description } = req.body;
    const newProject = new Project({ project_code, project_name, project_description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: 'Error adding project' });
  }
});

// POST: Assign Project
router.post('/api/project_assignments', async (req, res) => {
  try {
    const { employee_id, project_code, start_date } = req.body;
    const newAssignment = new ProjectAssignment({ employee_id, project_code, start_date });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ message: 'Error assigning project' });
  }
});

// GET: List all project assignments with populated data
router.get('/api/project_assignments', async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('employee_id') // This will populate the employee details
      .populate('project_code'); // This will populate the project details

    res.status(200).json(assignments);  // Return populated assignments
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
});

module.exports = router;
