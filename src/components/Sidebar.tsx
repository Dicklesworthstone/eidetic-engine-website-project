import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import '../styles/scrollbars.css';

interface NavItem {
    id: string;
    name: string;
    icon: React.ReactNode;
}

interface DocLink {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColorClass: string;
    textColorClass: string;
}

interface SidebarProps {
    showNavigation: boolean;
    setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
    activeSection: string;
    navItems: NavItem[];
    docLinks?: DocLink[];
    scrollToSection: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    showNavigation,
    setShowNavigation,
    activeSection,
    navItems,
    docLinks = [],
    scrollToSection
}) => {
    const sidebarRef = useRef<HTMLElement>(null);
    let touchStartX = 0;

    useEffect(() => {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;

        // Handle swipe to close
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!showNavigation) return;
            
            const touchEndX = e.touches[0].clientX;
            const diffX = touchStartX - touchEndX;
            
            // If swiping left more than 50px, close the sidebar
            if (diffX > 50) {
                setShowNavigation(false);
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        };

        sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
        sidebar.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            sidebar.removeEventListener('touchstart', handleTouchStart);
            sidebar.removeEventListener('touchmove', handleTouchMove);
        };
    }, [showNavigation, setShowNavigation]);

    // Update mobile overlay visibility when sidebar state changes
    useEffect(() => {
        const overlay = document.getElementById('mobile-overlay');
        if (overlay) {
            if (showNavigation) {
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                overlay.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                overlay.classList.add('opacity-0', 'pointer-events-none');
                overlay.classList.remove('opacity-100', 'pointer-events-auto');
            }
        }
    }, [showNavigation]);

    return (
        <aside
            ref={sidebarRef}
            className={`fixed top-16 bottom-0 left-0 bg-gray-900 border-r border-gray-800 w-64 transition-transform duration-300 ease-in-out z-30 ${showNavigation ? 'translate-x-0 shadow-xl md:shadow-none' : '-translate-x-full'} md:translate-x-0`}
            aria-hidden={!showNavigation}
            tabIndex={showNavigation ? 0 : -1}
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
            {/* Mobile close button inside aside */}
            <div className="absolute top-4 right-4 md:hidden">
                <button
                    onClick={() => {
                        setShowNavigation(false);
                        if (navigator.vibrate) {
                            navigator.vibrate(50);
                        }
                    }}
                    className="p-2 min-h-[44px] min-w-[44px] rounded-full bg-gray-800 hover:bg-gray-700 transition-colors touch-manipulation"
                    aria-label="Close navigation menu"
                >
                    <X className="h-5 w-5 text-gray-400" />
                </button>
            </div>
            {/* Adjusted padding for nav content */}
            <nav className="p-4 pt-6 h-full overflow-y-auto code-scrollbar">
                <div className="mb-8">
                    <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-4 px-4">Navigation</h2>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                scrollToSection(item.id);
                                if (navigator.vibrate) {
                                    navigator.vibrate(30);
                                }
                            }}
                            className={`flex items-center space-x-3 w-full text-left px-4 py-3.5 md:py-2.5 rounded-lg mb-1.5 hover:bg-gray-800 transition-colors duration-150 touch-manipulation ${activeSection === item.id ? 'bg-blue-900 bg-opacity-50 text-blue-300 font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                        >
                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{item.icon}</span>
                            <span className="text-sm">{item.name}</span>
                        </button>
                    ))}
                </div>

                {docLinks.length > 0 && (
                    <div className="mt-auto">
                        <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-4 px-4">Technical Docs</h2>

                        {docLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`flex items-center w-full text-left px-4 py-4 md:py-2.5 rounded-lg mb-4 
                bg-gradient-to-r ${link.bgColorClass} hover:from-opacity-60 hover:to-opacity-40 
                border border-opacity-30 shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation`}
                                onClick={() => {
                                    if (navigator.vibrate) {
                                        navigator.vibrate(30);
                                    }
                                }}
                            >
                                <div className={`mr-3 p-2 ${link.bgColorClass} rounded-lg`}>
                                    {link.icon}
                                </div>
                                <div>
                                    <p className={`${link.textColorClass} font-medium text-sm`}>{link.title}</p>
                                    <p className="text-xs text-gray-400">{link.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar; 