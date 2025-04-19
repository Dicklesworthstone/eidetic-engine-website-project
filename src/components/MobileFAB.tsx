import React, { useState } from 'react';
import { ArrowUp, FileText, Menu, X } from 'lucide-react';

interface ActionItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    action: () => void;
}

interface MobileFABProps {
    actions?: ActionItem[];
}

const MobileFAB: React.FC<MobileFABProps> = ({ 
    actions = []
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    // Default actions if none provided
    const defaultActions: ActionItem[] = [
        {
            id: 'scroll-top',
            icon: <ArrowUp className="h-5 w-5" />,
            label: 'Scroll to top',
            action: scrollToTop
        },
        {
            id: 'view-paper',
            icon: <FileText className="h-5 w-5" />,
            label: 'Read Paper',
            action: () => {
                window.open('https://mozilla.github.io/pdf.js/web/viewer.html?file=https://raw.githubusercontent.com/Dicklesworthstone/ultimate_mcp_client/main/eidetic_engine_paper.pdf', '_blank');
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        }
    ];

    const fabActions = actions.length > 0 ? actions : defaultActions;

    return (
        <div className="fixed bottom-4 right-4 flex flex-col-reverse items-end z-50 md:hidden">
            {/* Action buttons (only shown when expanded) */}
            {isExpanded && (
                <div className="mb-3 flex flex-col items-end space-y-3 transition-all duration-300 ease-in-out">
                    {fabActions.map((action) => (
                        <button
                            key={action.id}
                            onClick={() => {
                                action.action();
                                setIsExpanded(false);
                            }}
                            className="flex items-center bg-gray-800 text-white p-2 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all touch-manipulation"
                            aria-label={action.label}
                        >
                            <span className="bg-gray-700 rounded-full p-2 mr-2">{action.icon}</span>
                            <span className="pr-3 text-sm">{action.label}</span>
                        </button>
                    ))}
                </div>
            )}
            
            {/* Main FAB button */}
            <button
                onClick={toggleExpand}
                className={`p-4 rounded-full shadow-lg ${isExpanded ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 touch-manipulation`}
                aria-label={isExpanded ? "Close menu" : "Open quick actions menu"}
                aria-expanded={isExpanded}
            >
                {isExpanded ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
    );
};

export default MobileFAB; 