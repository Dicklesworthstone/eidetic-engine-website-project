import React, { createContext, useContext } from 'react';
import ReactGA from 'react-ga4';

// Create context
export const GoogleAnalyticsContext = createContext();

// Export hook for easy access
export const useGA = () => useContext(GoogleAnalyticsContext);

// Provider component
export const GoogleAnalyticsProvider = ({ children }) => {
  // Function to track events
  const trackEvent = (category, action, label, value) => {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  };

  return (
    <GoogleAnalyticsContext.Provider
      value={{
        trackEvent
      }}
    >
      {children}
    </GoogleAnalyticsContext.Provider>
  );
}; 