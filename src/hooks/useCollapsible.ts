import { useState, useCallback } from 'react';
import { useMediaQuery } from './useMediaQuery';

interface UseCollapsibleProps {
  defaultExpanded?: boolean;
  mobileOnly?: boolean;
}

interface UseCollapsibleReturn {
  isExpanded: boolean;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
  shouldRender: boolean;
}

/**
 * Hook to handle collapsible sections with mobile-specific behavior
 * @param options - Configuration options
 * @param options.defaultExpanded - Whether the section is expanded by default (default: false)
 * @param options.mobileOnly - Whether the collapsible behavior applies only on mobile (default: true)
 * @returns Object with state and methods to control the collapsible section
 */
export function useCollapsible({
  defaultExpanded = false,
  mobileOnly = true,
}: UseCollapsibleProps = {}): UseCollapsibleReturn {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);
  
  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // If mobileOnly is true, always render on desktop; otherwise use the isExpanded state
  const shouldRender = mobileOnly ? (!isMobile || isExpanded) : isExpanded;
  
  return {
    isExpanded,
    toggle,
    expand,
    collapse,
    shouldRender,
  };
} 