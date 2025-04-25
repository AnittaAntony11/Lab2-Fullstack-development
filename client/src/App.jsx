// App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure your CSS file is being imported

function App() {
  const [assignments, setAssignments] = useState([]); // Store assignments data

  useEffect(() => {
    // Function to fetch project assignments from the backend
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project_assignments');
        setAssignments(response.data);  // Update the state with the latest assignments
      } catch (error) {
        console.error('Error fetching assignments:', error);  // Log any error
      }
    };

    // Fetch the data initially when the component mounts
    fetchAssignments();

    // Set up a timer to automatically fetch updates every minute (60000 ms = 1 minute)
    const interval = setInterval(fetchAssignments, 60000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);  // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>Project Assignments</h1>
      <table>
        <thead>
          <tr>
            <th>Employee_ID</th>
            <th>Employee_Name</th>
            <th>Project_Name</th>
            <th>Start_Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.slice(0, 5).map((assignment) => ( // Limiting to the latest 5 assignments
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
