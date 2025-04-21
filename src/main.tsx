
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'

// Add runtime error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Display error on page for easier debugging in production
  const container = document.getElementById("root");
  if (container) {
    container.innerHTML += `<div style="position: fixed; bottom: 10px; right: 10px; background: #ffe0e0; border: 1px solid #ff8080; padding: 10px; max-width: 80%; z-index: 9999; overflow: auto; max-height: 200px;">
      <strong>Error:</strong> ${event.error ? event.error.message : 'Unknown error'} 
      <pre style="font-size: 10px; margin-top: 5px;">${event.error ? event.error.stack : ''}</pre>
    </div>`;
  }
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Application initialization started');

const container = document.getElementById("root")

if (!container) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to find root element for app rendering.</div>';
} else {
  const root = createRoot(container)
  
  try {
    console.log("Attempting to render App component");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Successfully rendered App component");
  } catch (error) {
    console.error("Error rendering the application:", error);
    container.innerHTML = '<div style="color: red; padding: 20px;">Failed to load the application. Check the console for more details.</div>';
  }
}
