import React, { useCallback } from 'react';
import { Map, X } from 'lucide-react';
import '../styles/scrollbars.css';

interface MobileNavToggleProps {
    showNavigation: boolean;
    setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavToggle: React.FC<MobileNavToggleProps> = ({
    showNavigation,
    setShowNavigation
}) => {
    const toggleNavWithHaptic = useCallback(() => {
        // Add haptic feedback if supported
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        setShowNavigation(!showNavigation);
    }, [showNavigation, setShowNavigation]);

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
            <button
                onClick={toggleNavWithHaptic}
                className={`p-4 sm:p-3 rounded-full shadow-lg ${showNavigation ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 ease-in-out border border-gray-700 transform active:scale-95 touch-manipulation`}
                aria-label={showNavigation ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={showNavigation}
                style={{ minWidth: '50px', minHeight: '50px' }}
            >
                {showNavigation ? <X className="w-5 h-5 text-white" /> : <Map className="w-5 h-5 text-white" />}
            </button>
        </div>
    );
};

export default MobileNavToggle; 