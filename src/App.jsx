// src/App.jsx
import React, { Suspense } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'; // <-- Import routing components
import Layout from './Layout';
import { Brain, Map, X, FileText, Eye } from 'lucide-react'; // <-- Import necessary icons for Header
import './index.css'; // <-- Keep index.css

// Use React.lazy for code splitting
const EideticEngineWebsite = React.lazy(() => import('./EideticEngineWebsite'));
const UmsTechnicalAnalysis = React.lazy(() => import('./UmsTechnicalAnalysis'));
const AmlTechnicalAnalysis = React.lazy(() => import('./AmlTechnicalAnalysis'));

// Loading component to show while chunks are loading
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
  </div>
);

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
        <Route path="/" element={
          <Suspense fallback={<Loading />}>
            <EideticEngineWebsite />
          </Suspense>
        } />
        <Route path="ums-technical-analysis" element={
          <Suspense fallback={<Loading />}>
            <UmsTechnicalAnalysis />
          </Suspense>
        } />
        <Route path="aml-technical-analysis" element={
          <Suspense fallback={<Loading />}>
            <AmlTechnicalAnalysis />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;