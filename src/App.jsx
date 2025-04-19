// src/App.jsx
import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'; // <-- Import routing components
import EideticEngineWebsite from './EideticEngineWebsite';
import UmsTechnicalAnalysis from './UmsTechnicalAnalysis';
import AmlTechnicalAnalysis from './AmlTechnicalAnalysis';
import Layout from './Layout';
import { Brain, Map, X, FileText, Eye } from 'lucide-react'; // <-- Import necessary icons for Header
import './index.css'; // <-- Keep index.css

// --- Define Layout Component ---
// This extracts the common shell (Header, Progress Bar, etc.)
// Note: We need to pass down scrollProgress, showNavigation etc. if Layout needs them.
// For simplicity here, we might need to adjust how Header/ProgressBar state is managed
// Or simply render them within each page for now if state management is complex.
// Let's assume EideticEngineWebsite contains the structure we want on all pages.
// A better refactor would extract Header/ProgressBar/Footer into a Layout component.
// For now, let's keep it simple and just define the routes.

function App() {
  return (
    <Routes>
      {/* Wrap all pages in shared Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<EideticEngineWebsite />} />
        <Route path="ums-technical-analysis" element={<UmsTechnicalAnalysis />} />
        <Route path="aml-technical-analysis" element={<AmlTechnicalAnalysis />} />
      </Route>
    </Routes>
  );
}

export default App;