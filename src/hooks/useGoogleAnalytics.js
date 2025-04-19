import { useEffect } from 'react';
import ReactGA from 'react-ga4';

// Google Analytics tracking ID
const GA_TRACKING_ID = 'G-3G7S4LCHE1';

export default function useGoogleAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Google Analytics
      ReactGA.initialize(GA_TRACKING_ID, {
        gaOptions: {
          cookieFlags: 'SameSite=None;Secure'
        }
      });
      
      // Send initial pageview
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search
      });
      
      // Track page changes if using React Router
      const handleRouteChange = (url) => {
        ReactGA.send({
          hitType: 'pageview',
          page: url
        });
      };
      
      // Clean up event listener
      return () => {
        // Nothing to clean up for now
      };
    }
  }, []);
} 