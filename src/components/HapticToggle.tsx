import React from 'react';
import { useHapticContext } from '../contexts/HapticContext';
import useHapticFeedback from '../hooks/useHapticFeedback';

interface HapticToggleProps {
  className?: string;
}

const HapticToggle: React.FC<HapticToggleProps> = ({ className = '' }) => {
  const { isHapticEnabled, toggleHaptic } = useHapticContext();
  const { selectionFeedback, isSupported } = useHapticFeedback();

  // If the device doesn't support haptic feedback, don't show the toggle
  if (!isSupported) {
    return null;
  }

  const handleToggle = () => {
    // Provide feedback before toggling off
    if (isHapticEnabled) {
      selectionFeedback();
    }
    toggleHaptic();
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-sm text-gray-400 mr-2">Haptic Feedback</span>
      <button
        onClick={handleToggle}
        role="switch"
        aria-checked={isHapticEnabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isHapticEnabled ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        <span className="sr-only">
          {isHapticEnabled ? 'Enable' : 'Disable'} haptic feedback
        </span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isHapticEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default HapticToggle; 