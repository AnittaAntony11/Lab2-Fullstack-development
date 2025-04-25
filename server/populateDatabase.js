const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const Project = require('./models/Project');
const ProjectAssignment = require('./models/ProjectAssignment');

// Sample data for employees, projects, and project assignments
const employees = [
  { employee_id: 'E001', full_name: 'John Doe', email: 'john.doe@example.com', hashed_password: 'hashed_password_123' },
  { employee_id: 'E002', full_name: 'Jane Smith', email: 'jane.smith@example.com', hashed_password: 'hashed_password_124' },
  { employee_id: 'E003', full_name: 'Michael Brown', email: 'michael.brown@example.com', hashed_password: 'hashed_password_125' },
  { employee_id: 'E004', full_name: 'Emily White', email: 'emily.white@example.com', hashed_password: 'hashed_password_126' },
  { employee_id: 'E005', full_name: 'Chris Green', email: 'chris.green@example.com', hashed_password: 'hashed_password_127' },
];

const projects = [
  { project_code: 'P001', project_name: 'Project Alpha', project_description: 'A description of Project Alpha.' },
  { project_code: 'P002', project_name: 'Project Beta', project_description: 'A description of Project Beta.' },
  { project_code: 'P003', project_name: 'Project Gamma', project_description: 'A description of Project Gamma.' },
  { project_code: 'P004', project_name: 'Project Delta', project_description: 'A description of Project Delta.' },
  { project_code: 'P005', project_name: 'Project Epsilon', project_description: 'A description of Project Epsilon.' },
];

const projectAssignments = [
  { employee_id: 'E001', project_code: 'P001', start_date: '2025-04-19' },
  { employee_id: 'E002', project_code: 'P002', start_date: '2025-04-20' },
  { employee_id: 'E003', project_code: 'P003', start_date: '2025-04-21' },
  { employee_id: 'E004', project_code: 'P004', start_date: '2025-04-22' },
  { employee_id: 'E005', project_code: 'P005', start_date: '2025-04-23' },
];

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://Anitta:AnittaAntony@anitta11.uorqqo6.mongodb.net/?retryWrites=true&w=majority&appName=Anitta11, { useNewUrlParser: true, useUnifiedTopology: true }');

    // Insert Employees
    for (let employee of employees) {
      await new Employee(employee).save();
    }

    // Insert Projects
    for (let project of projects) {
      await new Project(project).save();
    }

    // Insert Project Assignments
    for (let assignment of projectAssignments) {
      const employee = await Employee.findOne({ employee_id: assignment.employee_id });
      const project = await Project.findOne({ project_code: assignment.project_code });

      // Create a new project assignment
      await new ProjectAssignment({
        employee_id: employee._id,  // Use ObjectId reference
        project_code: project._id,   // Use ObjectId reference
        start_date: assignment.start_date,
      }).save();
    }

    console.log('Database populated successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error populating database:', error);
    mongoose.disconnect();
  }
}

// Execute the function
populateDatabase();
