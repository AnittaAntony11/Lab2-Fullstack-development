import { StrictMode } from 'react'; // Enabling strict mode for development checks
import { createRoot } from 'react-dom/client'; // Creating the root for rendering the app
import './index.css'; // Global styles for the app
import App from './App.jsx'; // Main component to render

// Rendering the App component inside the 'root' element with StrictMode for development checks
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
