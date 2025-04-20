import { useEffect, RefObject } from 'react';
import React from 'react';
import useHapticFeedback from './useHapticFeedback';

/**
 * Custom hook to handle sidebar swipe detection on mobile
 * 
 * @param {Object} params - Parameters for the hook
 * @param {React.RefObject<HTMLElement>} params.mainContentRef - Reference to the main content element
 * @param {boolean} params.showNavigation - Current sidebar visibility state
 * @param {Function} params.setShowNavigation - Function to update sidebar visibility
 * @param {boolean} params.isMobile - Whether the current view is mobile
 * @param {string} params.activeSection - Current active section ID
 * @param {Array} params.navItems - Navigation items array
 * @param {Function} params.scrollToSection - Function to scroll to a section
 */
const useSidebarSwipe = ({
  mainContentRef,
  showNavigation,
  setShowNavigation,
  isMobile,
  activeSection,
  navItems,
  scrollToSection
}: {
  mainContentRef: RefObject<HTMLElement | HTMLDivElement | null>;
  showNavigation: boolean;
  setShowNavigation: (show: boolean) => void;
  isMobile: boolean;
  activeSection: string;
  navItems: Array<{id: string; name: string; icon?: React.ReactNode}>;
  scrollToSection: (sectionId: string) => void;
}) => {
  const { navigationFeedback, selectionFeedback } = useHapticFeedback();
  
  // Setup swipe detection for section navigation on main content
  useEffect(() => {
    const content = mainContentRef.current;
    if (!content || !isMobile) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    const swipeThreshold = 30; // Pixels from left edge to trigger sidebar open
    const minSwipeDistance = 30; // Minimum horizontal distance for swipe - REDUCED from 50
    
    const handleTouchStart = (e: TouchEvent) => {
      // Only care about the first touch point
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // Ignore multi-touch
      
      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // --- Swipe to Open Sidebar --- 
      // Check if swipe starts near the left edge, moves right, and sidebar is closed
      if (touchStartX < swipeThreshold && diffX < -minSwipeDistance && Math.abs(diffX) > Math.abs(diffY) * 1.5 && !showNavigation) {
        console.log(`[Swipe Open] touchStartX: ${touchStartX}, diffX: ${diffX}`); // Debugging log
        console.log('[Swipe Open] Opening sidebar...'); // Debugging log
        setShowNavigation(true);
        navigationFeedback(); // Haptic feedback for navigation action
        // Reset start coordinates to prevent immediate re-trigger or other swipes
        touchStartX = -1; 
        touchStartY = -1;
        return; // Don't process section swipes if we opened the sidebar
      }
      
      // --- Existing Section Navigation Swipe --- 
      // Only handle horizontal swipes that are more horizontal than vertical
      // and don't conflict with the sidebar open gesture (e.g., don't trigger if started near edge)
      if (touchStartX >= swipeThreshold && Math.abs(diffX) > Math.abs(diffY) * 2 && Math.abs(diffX) > 100) {
        // Prevent default scrolling only if it's a section swipe
        e.preventDefault();
        
        // Find current index
        const sectionIds = navItems.map(item => item.id);
        const currentIndex = sectionIds.indexOf(activeSection);
        
        // Swipe left (next section)
        if (diffX > 0 && currentIndex < sectionIds.length - 1) {
          scrollToSection(sectionIds[currentIndex + 1]);
          selectionFeedback(); // More distinct feedback for section navigation
        }
        // Swipe right (previous section)
        else if (diffX < 0 && currentIndex > 0) {
          scrollToSection(sectionIds[currentIndex - 1]);
          console.log(`[Section Swipe] Swipe Right. Active: ${activeSection}`); // Debugging log
          selectionFeedback(); // More distinct feedback for section navigation
        }
        // Reset start coordinates after a successful section swipe
        touchStartX = -1;
        touchStartY = -1;
      }
    };
    
    // Attach event listeners with correct event types
    content.addEventListener('touchstart', handleTouchStart as EventListener, { passive: true });
    content.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });
    
    return () => {
      content.removeEventListener('touchstart', handleTouchStart as EventListener);
      content.removeEventListener('touchmove', handleTouchMove as EventListener);
    };
    // Add showNavigation and haptic functions to dependencies
  }, [
    isMobile, 
    activeSection, 
    navItems, 
    scrollToSection, 
    showNavigation, 
    setShowNavigation, 
    mainContentRef,
    navigationFeedback,
    selectionFeedback
  ]);
};

export default useSidebarSwipe; 