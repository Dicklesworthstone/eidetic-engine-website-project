import React from 'react';
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
    const toggleNav = () => {
        setShowNavigation(!showNavigation);
    };

    return (
        <div className="fixed bottom-4 right-4 z-40 md:hidden">
            <button
                onClick={toggleNav}
                className={`p-3 rounded-full shadow-lg ${showNavigation ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 ease-in-out border border-gray-700 transform active:scale-95`}
                aria-label={showNavigation ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={showNavigation}
            >
                {showNavigation ? <X className="w-5 h-5 text-white" /> : <Map className="w-5 h-5 text-white" />}
            </button>
        </div>
    );
};

export default MobileNavToggle; 