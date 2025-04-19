// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // <-- Import
import './index.css'
import App from './App.jsx'

// Only mount the app if we're in a browser environment
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter> {/* <-- Wrap App */}
          <App />
        </BrowserRouter>
      </StrictMode>,
    )
  }
}