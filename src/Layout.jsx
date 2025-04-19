import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';
import './index.css';

// Layout component providing common background, header, and progress bar
export default function Layout() {
  const [scrollProg, setScrollProg] = useState(0);
  const location = useLocation();
  
  // Initialize Google Analytics
  useGoogleAnalytics();
  
  // Track page views on route change
  useEffect(() => {
    // This will track page views in Google Analytics when the route changes
    import('react-ga4').then((ReactGA) => {
      ReactGA.default.send({ 
        hitType: "pageview", 
        page: location.pathname + location.search 
      });
    });
  }, [location]);
  
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const onScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProg(total > 0 ? window.scrollY / total : 0);
      };
      
      // Initial call to set initial position
      onScroll();
      
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const handleOverlayClick = () => {
    // Only dispatch event in browser environment
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('toggle-sidebar', { detail: { show: false } }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 font-sans relative overflow-x-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-width duration-150 ease-linear"
          style={{ width: `${scrollProg * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm z-40 shadow-xl border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center">
          <Link to="/" className="flex items-center">
            <Brain className="w-7 sm:w-8 h-7 sm:h-8 text-blue-500 mr-2" />
            <h1 className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 whitespace-nowrap">
              EideticEngine
            </h1>
          </Link>
        </div>
      </header>

      {/* Mobile Overlay - only visible when sidebar is open on mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 opacity-0 pointer-events-none"
        id="mobile-overlay"
        onClick={handleOverlayClick}
      ></div>

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </div>
      </main>
      
      {/* Vercel Analytics */}
      <Analytics />

    </div>
  );
}