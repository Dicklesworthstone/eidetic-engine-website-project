import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HapticContextType {
  isHapticEnabled: boolean;
  toggleHaptic: () => void;
  setHapticEnabled: (enabled: boolean) => void;
}

const defaultContext: HapticContextType = {
  isHapticEnabled: true,
  toggleHaptic: () => {},
  setHapticEnabled: () => {},
};

const HapticContext = createContext<HapticContextType>(defaultContext);

export const useHapticContext = () => useContext(HapticContext);

interface HapticProviderProps {
  children: ReactNode;
}

export const HapticProvider: React.FC<HapticProviderProps> = ({ children }) => {
  // Try to get the saved preference from localStorage, default to true
  const [isHapticEnabled, setIsHapticEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('eidetic-haptic-enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (error) {
      console.error('Error loading haptic preference from localStorage:', error);
      return true;
    }
  });

  // Save preference to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('eidetic-haptic-enabled', JSON.stringify(isHapticEnabled));
    } catch (error) {
      console.error('Error saving haptic preference to localStorage:', error);
    }
  }, [isHapticEnabled]);

  const toggleHaptic = () => {
    setIsHapticEnabled(prev => !prev);
  };

  const setHapticEnabled = (enabled: boolean) => {
    setIsHapticEnabled(enabled);
  };

  const value = {
    isHapticEnabled,
    toggleHaptic,
    setHapticEnabled,
  };

  return (
    <HapticContext.Provider value={value}>
      {children}
    </HapticContext.Provider>
  );
};

export default HapticContext; 