
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root")

if (!container) {
  console.error("Failed to find the root element");
} else {
  const root = createRoot(container)
  
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log("Successfully rendered App component")
  } catch (error) {
    console.error("Error rendering the application:", error)
    container.innerHTML = '<div style="color: red; padding: 20px;">Failed to load the application. Check the console for more details.</div>'
  }
}
