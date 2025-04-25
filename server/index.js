const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const routes = require('./routes');

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

// Use routes defined in routes/index.js
app.use(routes);

// Serve static files from React build (for production)
app.use(express.static('client/build'));

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
