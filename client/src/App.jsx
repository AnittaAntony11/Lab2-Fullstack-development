import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'start_date', direction: 'asc' });

  useEffect(() => {
    // Function to fetch project assignments
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project_assignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    // Fetch data initially
    fetchAssignments();

    // Auto refresh data every minute (60000 ms = 1 minute)
    const interval = setInterval(fetchAssignments, 60000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Sort data by column name
  const sortData = (key) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedAssignments = [...assignments].sort((a, b) => {
      if (key === 'employee_id') {
        // Sorting by employee_name (nested inside employee_id)
        if (a.employee_id.full_name < b.employee_id.full_name) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a.employee_id.full_name > b.employee_id.full_name) return sortConfig.direction === 'asc' ? 1 : -1;
      }
      if (key === 'project_code') {
        // Sorting by project_name (nested inside project_code)
        if (a.project_code.project_name < b.project_code.project_name) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a.project_code.project_name > b.project_code.project_name) return sortConfig.direction === 'asc' ? 1 : -1;
      }
      // Sorting for start_date (or other columns)
      if (key === 'start_date') {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      // Default sorting for other fields
      if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    setAssignments(sortedAssignments); // Update the state with sorted data
    setSortConfig({ key, direction }); // Update the sort configuration
  };

  return (
    <div>
      <h1>Project Assignments</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData('employee_id')}>Employee_ID</th>
            <th onClick={() => sortData('employee_id')}>Employee_Name</th>
            <th onClick={() => sortData('project_code')}>Project_Name</th>
            <th onClick={() => sortData('start_date')}>Start_Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.slice(0, 5).map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id._id}</td>
              <td>{assignment.employee_id.full_name}</td>
              <td>{assignment.project_code.project_name}</td>
              <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
