import { useState, useEffect } from 'react';

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Hook to get safe area insets for mobile devices
 * Provides inset values for areas like notches and home indicators on mobile devices
 * Falls back to 0 values when environment variables aren't available
 */
export function useSafeArea(): SafeAreaInsets {
  const [safeArea, setSafeArea] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    function updateSafeArea() {
      // Get CSS environment variables for safe area insets if supported
      const computedStyle = window.getComputedStyle(document.documentElement);
      
      // Function to safely get environment variable values
      const getEnvValue = (position: string): number => {
        const value = computedStyle.getPropertyValue(`--safe-area-inset-${position}`);
        return value ? parseInt(value, 10) : 0;
      };

      setSafeArea({
        top: getEnvValue('top'),
        right: getEnvValue('right'),
        bottom: getEnvValue('bottom'),
        left: getEnvValue('left'),
      });
    }

    // Set up CSS to access environment variables
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --safe-area-inset-top: env(safe-area-inset-top, 0px);
        --safe-area-inset-right: env(safe-area-inset-right, 0px);
        --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-area-inset-left: env(safe-area-inset-left, 0px);
      }
    `;
    document.head.appendChild(style);

    // Initial update
    updateSafeArea();
    
    // Update on resize
    window.addEventListener('resize', updateSafeArea);
    
    return () => {
      window.removeEventListener('resize', updateSafeArea);
      document.head.removeChild(style);
    };
  }, []);

  return safeArea;
} 