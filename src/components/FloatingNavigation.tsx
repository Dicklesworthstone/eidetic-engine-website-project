import React, { useEffect, useRef } from 'react';

interface NavItem {
    id: string;
    name: string;
}

interface FloatingNavigationProps {
    activeSection: string;
    navItems: NavItem[];
    scrollToSection: (sectionId: string) => void;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
    activeSection,
    navItems,
    scrollToSection
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    let touchStartX = 0;
    let touchStartY = 0;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 1) return; // Ignore multi-touch
            
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Check if horizontal swipe (more horizontal than vertical movement)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                e.preventDefault();
                
                // Find current index
                const currentIndex = navItems.findIndex(item => item.id === activeSection);
                
                // Swipe left (next section)
                if (diffX > 0 && currentIndex < navItems.length - 1) {
                    scrollToSection(navItems[currentIndex + 1].id);
                    if (navigator.vibrate) navigator.vibrate(50);
                }
                // Swipe right (previous section)
                else if (diffX < 0 && currentIndex > 0) {
                    scrollToSection(navItems[currentIndex - 1].id);
                    if (navigator.vibrate) navigator.vibrate(50);
                }
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [activeSection, navItems, scrollToSection]);

    return (
        <div 
            ref={containerRef}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden md:hidden"
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        scrollToSection(item.id);
                        if (navigator.vibrate) navigator.vibrate(30);
                    }}
                    className="w-3 h-3 rounded-full touch-manipulation"
                    style={{
                        backgroundColor: activeSection === item.id 
                            ? 'rgba(59, 130, 246, 0.9)' // blue-500 with opacity
                            : 'rgba(75, 85, 99, 0.5)', // gray-600 with opacity
                        transition: 'all 0.2s ease',
                        transform: activeSection === item.id ? 'scale(1.3)' : 'scale(1)'
                    }}
                    aria-label={`Scroll to ${item.name} section`}
                    title={item.name}
                />
            ))}
        </div>
    );
};

export default FloatingNavigation; 