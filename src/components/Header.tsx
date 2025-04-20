import React, { useCallback } from 'react';
import { Brain, Map } from 'lucide-react';
import '../styles/scrollbars.css';
import useHapticFeedback from '../hooks/useHapticFeedback';

interface HeaderProps {
    showNavigation: boolean;
    setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
    scrollProgress: number;
}

const Header: React.FC<HeaderProps> = ({ showNavigation, setShowNavigation, scrollProgress }) => {
    const { navigationFeedback } = useHapticFeedback();

    const toggleNav = useCallback(() => {
        // Trigger haptic feedback for navigation toggle
        navigationFeedback();
        setShowNavigation(!showNavigation);
    }, [showNavigation, setShowNavigation, navigationFeedback]);

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm z-40 shadow-xl border-b border-gray-800">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-800">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-width duration-150 ease-linear"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <div className="container mx-auto px-2 md:px-4 py-3 md:py-4 flex justify-between items-center">
                <a href="/" className="flex items-center flex-shrink-0 group transition-all duration-300 transform hover:scale-105"
                    title="Go to Home Page" aria-label="EideticEngine Home">
                    <Brain className="w-7 md:w-8 h-7 md:h-8 text-blue-500 group-hover:text-blue-400 mr-2 md:mr-3 flex-shrink-0 transition-colors duration-300" />
                    <h1 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-blue-300 group-hover:to-purple-400 whitespace-nowrap transition-all duration-300">
                        EideticEngine
                    </h1>
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1 w-3 h-3 md:w-4 md:h-4"><path d="m9 18 6-6-6-6" /></svg>
                    </span>
                </a>
                <div className="flex md:hidden">
                    <button
                        onClick={toggleNav}
                        className="min-h-[38px] min-w-[80px] px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition-colors flex items-center justify-center text-sm touch-manipulation"
                        aria-label={showNavigation ? "Hide navigation" : "Show navigation"}
                    >
                        <span className="whitespace-nowrap">{showNavigation ? 'Hide' : 'Show'}</span> <Map className="ml-1.5 w-4 h-4 flex-shrink-0" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header; 