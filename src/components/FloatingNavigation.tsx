import React, { useEffect, useRef, useState } from 'react';

interface NavItem {
    id: string;
    name: string;
    icon?: React.ReactNode;
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
    const [touchedDot, setTouchedDot] = useState<string | null>(null);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const swipeThreshold = 20; // Further reduced threshold for more responsive swipes
    const [showSwipeAnimation, setShowSwipeAnimation] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartXRef.current = e.touches[0].clientX;
            touchStartYRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 1) return; // Ignore multi-touch
            
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            const diffX = touchStartXRef.current - touchEndX;
            const diffY = touchStartYRef.current - touchEndY;
            
            // Check if horizontal swipe (more horizontal than vertical movement)
            if (Math.abs(diffX) > Math.abs(diffY) * 1.2 && Math.abs(diffX) > swipeThreshold) {
                e.preventDefault(); // Prevent scrolling during swipe
                
                // Find current index
                const currentIndex = navItems.findIndex(item => item.id === activeSection);
                
                // Swipe left (next section)
                if (diffX > 0 && currentIndex < navItems.length - 1) {
                    scrollToSection(navItems[currentIndex + 1].id);
                    provideHapticFeedback();
                    animateSwipe('left');
                    // Reset to prevent duplicate swipes
                    touchStartXRef.current = touchEndX;
                }
                // Swipe right (previous section)
                else if (diffX < 0 && currentIndex > 0) {
                    scrollToSection(navItems[currentIndex - 1].id);
                    provideHapticFeedback();
                    animateSwipe('right');
                    // Reset to prevent duplicate swipes
                    touchStartXRef.current = touchEndX;
                }
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        // Use passive: false to allow preventDefault()
        container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            if (container) {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [activeSection, navItems, scrollToSection]);

    const provideHapticFeedback = () => {
        if (navigator.vibrate) {
            navigator.vibrate(30); // Short vibration for better feedback
        }
    };

    const animateSwipe = (direction: 'left' | 'right') => {
        setSwipeDirection(direction);
        setShowSwipeAnimation(true);
        setTimeout(() => {
            setShowSwipeAnimation(false);
            setSwipeDirection(null);
        }, 600);
    };

    return (
        <div 
            ref={containerRef}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 flex flex-col items-center gap-5 sm:hidden touch-manipulation"
            style={{ 
                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.35))',
            }}
        >
            <div className="bg-gray-800/80 rounded-full py-5 px-5">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const isTouched = touchedDot === item.id;
                    
                    return (
                        <div 
                            key={item.id}
                            className="relative mb-7 last:mb-0"
                        >
                            <button
                                onClick={() => {
                                    scrollToSection(item.id);
                                    provideHapticFeedback();
                                }}
                                onTouchStart={() => {
                                    setTouchedDot(item.id);
                                    provideHapticFeedback();
                                }}
                                onTouchEnd={() => setTouchedDot(null)}
                                className="w-16 h-16 flex items-center justify-center touch-manipulation relative"
                                style={{
                                    transition: 'all 0.2s ease',
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                aria-label={`Scroll to ${item.name} section`}
                            >
                                <div 
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: isActive 
                                            ? 'rgba(59, 130, 246, 0.95)' 
                                            : isTouched
                                                ? 'rgba(96, 165, 250, 0.7)'
                                                : 'rgba(75, 85, 99, 0.5)',
                                        transition: 'all 0.2s ease',
                                        transform: isActive ? 'scale(1.3)' : isTouched ? 'scale(1.2)' : 'scale(1)',
                                        boxShadow: isActive 
                                            ? '0 0 12px rgba(59, 130, 246, 0.8)' 
                                            : isTouched 
                                                ? '0 0 10px rgba(96, 165, 250, 0.6)'
                                                : 'none'
                                    }}
                                />
                                
                                {/* Shown on active or touched items */}
                                {(isActive || isTouched) && (
                                    <div 
                                        className="absolute right-16 whitespace-nowrap bg-gray-800/95 text-gray-200 px-4 py-2 rounded text-sm font-medium"
                                        style={{ 
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                            opacity: 1,
                                            transform: 'translateX(0)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
            
            {/* Swipe indicator with animation */}
            <div 
                className={`text-sm text-gray-100 mt-2 px-4 py-2.5 bg-gray-800/90 rounded-full transition-all duration-300 ${showSwipeAnimation ? 'scale-110 opacity-100' : 'opacity-90'}`}
                style={{
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                }}
            >
                <span className="opacity-95 flex items-center">
                    {swipeDirection === 'left' ? (
                        <span className="flex items-center">⟪ <span className="mx-1">swipe</span> ⟪</span>
                    ) : swipeDirection === 'right' ? (
                        <span className="flex items-center">⟫ <span className="mx-1">swipe</span> ⟫</span>
                    ) : (
                        <span className="flex items-center">⟪ <span className="mx-1">swipe</span> ⟫</span>
                    )}
                </span>
            </div>
        </div>
    );
};

export default FloatingNavigation; 