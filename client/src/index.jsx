// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Import your CSS for styling
import App from './App';  // Import your App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
