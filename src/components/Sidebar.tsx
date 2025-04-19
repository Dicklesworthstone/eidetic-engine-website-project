import React from 'react';
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
    return (
        <aside
            className={`fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto code-scrollbar bg-gray-900 border-r border-gray-800 w-64 transition-transform duration-300 ease-in-out z-30 md:translate-x-0 ${showNavigation ? 'translate-x-0 shadow-xl' : '-translate-x-full'} md:left-0`}
            aria-hidden={!showNavigation}
            tabIndex={showNavigation ? 0 : -1}
        >
            {/* Mobile close button inside aside */}
            <div className="absolute top-4 right-4 md:hidden">
                <button
                    onClick={() => setShowNavigation(false)}
                    className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Close navigation menu"
                >
                    <X className="h-5 w-5 text-gray-400" />
                </button>
            </div>
            {/* Adjusted padding for nav content */}
            <nav className="p-4 pt-6">
                <div className="mb-8">
                    <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-4 px-4">Navigation</h2>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex items-center space-x-3 w-full text-left px-4 py-3 md:py-2.5 rounded-lg mb-1 hover:bg-gray-800 transition-colors duration-150 ${activeSection === item.id ? 'bg-blue-900 bg-opacity-50 text-blue-300 font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                        >
                            <span className="flex-shrink-0 w-4">{item.icon}</span>
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
                                className={`flex items-center w-full text-left px-4 py-3 md:py-2.5 rounded-lg mb-4 
                bg-gradient-to-r ${link.bgColorClass} hover:from-opacity-60 hover:to-opacity-40 
                border border-opacity-30 shadow-md hover:shadow-lg transition-all duration-300`}
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