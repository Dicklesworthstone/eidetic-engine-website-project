import React, { useState, useEffect, useRef } from 'react';
import { Aperture, Brain, Cpu, Database, GitBranch, GitMerge, Layers, MessageCircle, Server, UserPlus, Zap, Clock, FileText, RefreshCw, GitCommit, Eye, Award, Bookmark, BarChart2, Map, Code, X, Target, CheckCircle, AlertTriangle, Telescope } from 'lucide-react';
import MemoryGraph from './MemoryGraph';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNavToggle from './components/MobileNavToggle';
import FloatingNavigation from './components/FloatingNavigation';
import Footer from './components/Footer';
import './styles/scrollbars.css';

// Main App Component
const EideticEngineWebsite = () => {
  const [activeSection, setActiveSection] = useState('abstract');
  // Default navigation state: hidden on mobile, shown on desktop
  const [showNavigation, setShowNavigation] = useState(window.innerWidth >= 768);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Define navigation items
  const navItems = [
    // Added Architecture Visual to nav
    { id: 'architecture-visual', name: 'Architecture', icon: <Eye className="w-4 h-4" /> },
    { id: 'abstract', name: 'Abstract', icon: <FileText className="w-4 h-4" /> },
    { id: 'introduction', name: 'Introduction', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'related-work', name: 'Related Work', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'ums', name: 'Unified Memory System', icon: <Database className="w-4 h-4" /> },
    { id: 'aml', name: 'Agent Master Loop', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'mcp-client', name: 'Ultimate MCP Client', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'llm-gateway', name: 'Ultimate MCP Server', icon: <Server className="w-4 h-4" /> },
    { id: 'evaluation', name: 'Evaluation & Cases', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'discussion', name: 'Discussion', icon: <GitCommit className="w-4 h-4" /> },
    { id: 'conclusion', name: 'Conclusion', icon: <Award className="w-4 h-4" /> },
    { id: 'future-work', name: 'Future Work', icon: <Zap className="w-4 h-4" /> },
    { id: 'addendum', name: 'Addendum', icon: <Bookmark className="w-4 h-4" /> },
  ];
  
  // Define technical doc links
  const docLinks = [
    {
      href: "/ums-technical-analysis",
      title: "UMS Technical Analysis",
      description: "Unified Memory System Deep Dive",
      icon: <Database className="w-5 h-5 text-blue-300" />,
      bgColorClass: "from-blue-900/50 to-blue-800/30 hover:from-blue-800/60 hover:to-blue-700/40",
      textColorClass: "text-blue-300"
    },
    {
      href: "/aml-technical-analysis",
      title: "AML Technical Analysis",
      description: "Agent Master Loop Architecture",
      icon: <RefreshCw className="w-5 h-5 text-purple-300" />,
      bgColorClass: "from-purple-900/50 to-purple-800/30 hover:from-purple-800/60 hover:to-purple-700/40",
      textColorClass: "text-purple-300"
    }
  ];
  
  // Effect to handle initial navigation state based on window size and resize events
  useEffect(() => {
    const handleResize = () => {
      // Show nav if window is medium size or larger, hide otherwise unless explicitly shown
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth >= 768) {
        setShowNavigation(true); // Always show on desktop unless user hides it manually via header button
      }
    };
    // Set initial state correctly
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Removed showNavigation dependency to avoid loop, relies on manual toggles

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // Prevent division by zero if totalScroll is 0
      const currentProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      setScrollProgress(currentProgress);

      // Update active section based on scroll position
      const sections = ['abstract', 'introduction', 'related-work', 'ums', 'aml', 'mcp-client', 'llm-gateway', 'evaluation', 'discussion', 'conclusion', 'future-work', 'addendum', 'architecture-visual'];
      let currentSection = 'abstract'; // Default
      const scrollOffset = window.innerHeight * 0.4; // Trigger point higher up the screen

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= window.scrollY + scrollOffset) {
          currentSection = sectionId;
        } else {
          // If we've scrolled past the first section that meets the criteria, break
          // This makes the section active when its top part enters the trigger zone
          break;
        }
      }
      // Special case for top of page
      if (window.scrollY < 200) {
        currentSection = 'abstract'; // Or consider a 'hero' section if needed
      }
      // Special case for architecture visual (if it's higher up)
      const archVisualEl = document.getElementById('architecture-visual');
      const abstractEl = document.getElementById('abstract');
      if (archVisualEl && abstractEl && archVisualEl.offsetTop <= window.scrollY + scrollOffset && archVisualEl.offsetTop > abstractEl.offsetTop) {
        // Check if it's above the abstract section's trigger point but still visible
        if (abstractEl && window.scrollY + scrollOffset < abstractEl.offsetTop) {
          currentSection = 'architecture-visual';
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Adjust offset based on header height
      const headerHeight = 60; // Approximate height of the fixed header, adjust if needed
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px spacing

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // Close navigation on mobile after clicking a link
      if (window.innerWidth < 768) {
        setShowNavigation(false);
      }
    }
  };

  // Setup swipe detection for section navigation on main content
  useEffect(() => {
    const content = mainContentRef.current;
    if (!content || !isMobile) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    const swipeThreshold = 30; // Pixels from left edge to trigger sidebar open
    const minSwipeDistance = 50; // Minimum horizontal distance for swipe
    
    const handleTouchStart = (e) => {
      // Only care about the first touch point
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) return; // Ignore multi-touch
      
      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // --- Swipe to Open Sidebar --- 
      // Check if swipe starts near the left edge, moves right, and sidebar is closed
      if (touchStartX < swipeThreshold && diffX < -minSwipeDistance && Math.abs(diffX) > Math.abs(diffY) * 1.5 && !showNavigation) {
        setShowNavigation(true);
        if (navigator.vibrate) navigator.vibrate(30); // Haptic feedback
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
          if (navigator.vibrate) navigator.vibrate(50);
        }
        // Swipe right (previous section)
        else if (diffX < 0 && currentIndex > 0) {
          scrollToSection(sectionIds[currentIndex - 1]);
          if (navigator.vibrate) navigator.vibrate(50);
        }
        // Reset start coordinates after a successful section swipe
        touchStartX = -1;
        touchStartY = -1;
      }
    };
    
    // Attach event listeners (use capture phase for touchstart to potentially intercept early)
    content.addEventListener('touchstart', handleTouchStart, { passive: true }); // Can be passive if we don't preventDefault here
    content.addEventListener('touchmove', handleTouchMove, { passive: false }); // Needs to be active to preventDefault for section swipes
    
    return () => {
      content.removeEventListener('touchstart', handleTouchStart);
      content.removeEventListener('touchmove', handleTouchMove);
    };
    // Add showNavigation to dependencies as the open swipe logic depends on it
  }, [isMobile, activeSection, navItems, scrollToSection, showNavigation, setShowNavigation]);

  // Helper for code styling
  const CodeTag = ({ children }) => (
    <code className="mx-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-700/80 rounded text-blue-200 text-[11px] md:text-xs">{children}</code>
  );

  return (
    // Added overflow-x-hidden to body/html equivalent if needed, but tailwind handles it mostly
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 font-sans relative overflow-x-hidden">
      {/* Header Component */}
      <Header 
        showNavigation={showNavigation} 
        setShowNavigation={setShowNavigation} 
        scrollProgress={scrollProgress} 
      />

      {/* Main Content Wrapper */}
      <div className="flex pt-16"> {/* Ensure pt matches header height */}
        {/* Sidebar Component */}
        <Sidebar 
          showNavigation={showNavigation} 
          setShowNavigation={setShowNavigation} 
          activeSection={activeSection} 
          navItems={navItems}
          docLinks={docLinks}
          scrollToSection={scrollToSection}
        />

        {/* Mobile Sidebar Overlay - only visible when sidebar is open on mobile */}
        {showNavigation && isMobile && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setShowNavigation(false)}
          ></div>
        )}

        {/* Mobile Navigation Toggle */}
        <MobileNavToggle 
          showNavigation={showNavigation} 
          setShowNavigation={setShowNavigation} 
        />

        {/* Floating Navigation Dots (mobile only) */}
        {isMobile && (
          <FloatingNavigation 
            activeSection={activeSection}
            navItems={navItems}
            scrollToSection={scrollToSection}
          />
        )}

        {/* Main content */}
        {/* Adjusted margin logic to be simpler: only apply margin on md+ when nav is shown */}
        <main 
          ref={mainContentRef}
          className="flex-1 transition-all duration-300 ease-in-out ml-0 md:ml-64 overflow-x-hidden"
        >
          {/* Added container-fluid equivalent for padding, adjust max-width inside sections */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Hero Section */}
            {/* Adjusted padding/margins for mobile */}
            <section className="py-16 md:py-24 mb-12 md:mb-16">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Adjusted icon size */}
                    <Brain className="w-14 md:w-24 h-14 md:h-24 text-blue-500" />
                    {/* Adjusted pulse dots */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 md:w-6 md:h-6 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 md:w-6 md:h-6 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                  </div>
                </div>

                {/* Adjusted text sizes */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    EideticEngine
                  </span>
                </h1>
                {/* Updated subtitle */}
                <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8">
                  Adaptive LLM Agent Orchestration with Multi‑Level Memory <br className="hidden md:inline" /> and Performance‑Driven Meta‑Cognition
                </p>
                <p className="text-sm md:text-base text-gray-400 italic">By Jeffrey Emanuel, April 2025</p>

                {/* Adjusted button padding/text size */}
                <div className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={() => window.open('https://mozilla.github.io/pdf.js/web/viewer.html?file=https://raw.githubusercontent.com/Dicklesworthstone/ultimate_mcp_client/main/eidetic_engine_paper.pdf', '_blank')}
                    className="px-5 py-2.5 md:px-6 md:py-3 w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium flex items-center justify-center text-sm md:text-base"
                  >
                    <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Read Paper
                  </button>
                  <button
                    onClick={() => scrollToSection('architecture-visual')}
                    className="px-5 py-2.5 md:px-6 md:py-3 w-full sm:w-auto rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white font-medium flex items-center justify-center text-sm md:text-base"
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    View Architecture
                  </button>
                </div>
              </div>
            </section>

            {/* Architecture Visual */}
            {/* Adjusted padding/margins, added scroll-mt */}
            <section id="architecture-visual" className="mb-12 md:mb-20 py-8 md:py-12 bg-gray-800 bg-opacity-30 rounded-xl mx-0 md:mx-auto scroll-mt-20">
              {/* Adjusted max-width */}
              <div className="max-w-6xl mx-auto px-3 md:px-6 lg:px-8">
                {/* Adjusted text size/margin */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  EideticEngine Architecture Overview
                </h2>

                {/* Stack cards vertically on mobile, row on desktop */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 justify-center items-center lg:items-stretch mb-10 md:mb-12">
                  {/* Card 1: UMS */}
                  {/* Adjusted padding */}
                  <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 flex-1 w-full lg:max-w-md">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-blue-900 bg-opacity-40 rounded-full">
                        {/* Consistent icon size */}
                        <Database className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    {/* Adjusted text size */}
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-blue-300 text-center">Unified Memory System (UMS)</h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 text-center sm:text-left">A persistent, multi-layered cognitive substrate with distinct memory types:</p>
                    <ul className="space-y-2 mb-6 text-sm sm:text-base">
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Clock className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-blue-300">WORKING:</strong> Active attention focus</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-blue-300">EPISODIC:</strong> Experience records</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Brain className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-blue-300">SEMANTIC:</strong> General knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Code className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-blue-300">PROCEDURAL:</strong> Skills & procedures</span>
                      </li>
                    </ul>
                    <div className="bg-gray-900 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-gray-400"><a href="https://github.com/Dicklesworthstone/ultimate_mcp_server/blob/main/ultimate_mcp_server/tools/cognitive_and_agent_memory.py" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">Implemented</a> with optimized SQLite, featuring hybrid search, explicit typing, metadata, and associative linking.</p>
                    </div>
                  </div>

                  {/* Card 2: AML */}
                  {/* Adjusted padding */}
                  <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 flex-1 w-full lg:max-w-md">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-purple-900 bg-opacity-40 rounded-full">
                        <RefreshCw className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-purple-300 text-center">Agent Master Loop (AML)</h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 text-center sm:text-left">An adaptive control loop orchestrating perception-cognition-action:</p>
                    <ul className="space-y-2 mb-6 text-sm sm:text-base">
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <GitBranch className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-purple-300">Structured Planning:</strong> Dependency-aware steps</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Target className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-purple-300">Hierarchical Goals:</strong> Goal Stack management</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Layers className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-purple-300">Context Assembly:</strong> Multi-faceted retrieval</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <GitCommit className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-purple-300">Meta-Cognition:</strong> Reflection, consolidation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Aperture className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><strong className="font-medium text-purple-300">Adaptive Control:</strong> Mental Momentum</span>
                      </li>
                    </ul>
                    <div className="bg-gray-900 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-gray-400">Directs LLM reasoning (Claude 3.7 Sonnet), manages dependencies, recovers from errors, and orchestrates self-improvement. Find implementation <a href="https://github.com/Dicklesworthstone/ultimate_mcp_client/blob/main/agent_master_loop.py" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-300">here</a>.</p>
                    </div>
                  </div>
                </div>

                {/* Connection Row - Hide line on mobile */}
                <div className="relative mt-12 md:mt-16 mb-8">
                  {/* Line only on desktop */}
                  <div className="hidden md:block absolute w-3/4 h-1 bg-gradient-to-r from-blue-600 to-purple-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>

                  {/* Stack vertically on mobile, row with larger gap on desktop */}
                  <div className="flex flex-col items-center gap-8 md:flex-row md:items-center justify-center md:gap-32 relative z-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 md:p-4 bg-blue-900 bg-opacity-40 rounded-full mb-2 md:mb-4">
                        <Cpu className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                      </div>
                      <p className="font-bold text-sm md:text-base text-blue-300">LLM Core (Claude 3.7)</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 md:p-4 bg-purple-900 bg-opacity-40 rounded-full mb-2 md:mb-4">
                        <Server className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
                      </div>
                      <p className="font-bold text-sm md:text-base text-purple-300">Tool Ecosystem</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 md:p-4 bg-blue-900 bg-opacity-40 rounded-full mb-2 md:mb-4">
                        <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                      </div>
                      <p className="font-bold text-sm md:text-base text-blue-300">MCP Client</p>
                    </div>
                  </div>
                </div>

                {/* Meta-Cognitive Cycle Box */}
                {/* Adjusted padding, max-width */}
                <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700 max-w-3xl mx-auto mt-8 md:mt-12">
                  <h3 className="text-base md:text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Key Innovation: Performance-Driven Meta-Cognition
                  </h3>
                  {/* Slightly smaller visualization on mobile */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-[280px] h-36 sm:max-w-xs md:max-w-md md:h-32 relative my-4"> {/* Adjusted height/width */}
                      {/* Meta-cognitive cycle visualization */}
                      <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-dashed border-blue-500 top-0 left-1/2 transform -translate-x-1/2 animate-spin" style={{ animationDuration: '20s' }}></div>
                      <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border-2 md:border-4 border-purple-500 top-4 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full p-2 md:p-3">
                        <Brain className="w-6 h-6 md:w-10 md:h-10 text-white" />
                      </div>

                      {/* Labels with slightly adjusted positions & consistent size */}
                      <div className="absolute top-1 left-1/2 -translate-x-[120%] sm:-translate-x-[100%] md:left-1/4 md:-translate-x-4 bg-gray-900/80 px-1.5 py-0.5 rounded text-[10px] md:text-xs text-blue-300 whitespace-nowrap">Reflection</div>
                      <div className="absolute bottom-1 left-1/2 -translate-x-[130%] sm:-translate-x-[110%] md:left-1/4 md:-translate-x-4 bg-gray-900/80 px-1.5 py-0.5 rounded text-[10px] md:text-xs text-purple-300 whitespace-nowrap">Consolidation</div>
                      <div className="absolute top-1 left-1/2 translate-x-[20%] sm:translate-x-[0%] md:right-1/4 md:translate-x-4 md:left-auto bg-gray-900/80 px-1.5 py-0.5 rounded text-[10px] md:text-xs text-blue-300 whitespace-nowrap">Promotion</div>
                      <div className="absolute bottom-1 left-1/2 translate-x-[30%] sm:translate-x-[10%] md:right-1/4 md:translate-x-4 md:left-auto bg-gray-900/80 px-1.5 py-0.5 rounded text-[10px] md:text-xs text-purple-300 whitespace-nowrap">Adaptation</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-center mt-2 md:mt-8 text-xs sm:text-sm md:text-base leading-relaxed">
                    The agent actively improves its cognitive operation through reflection, knowledge consolidation,
                    memory promotion, and adaptive threshold adjustment (Mental Momentum) based on performance metrics.
                  </p>
                </div>
              </div>
            </section>

            {/* Abstract Section */}
            {/* Consistent use of responsive margins and scroll-mt */}
            <section id="abstract" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                  Abstract
                </h2>
                {/* Using prose for responsive typography */}
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6 text-gray-300">
                  <p>
                    Large Language Models (LLMs) form the reasoning core of increasingly sophisticated autonomous agents.
                    However, unlocking their full potential for complex, long‑horizon tasks requires architectures that
                    transcend reactive loops and shallow memory.
                  </p>

                  <p>
                    We present <strong className="text-blue-300 font-semibold">EideticEngine</strong>, a novel cognitive architecture designed to
                    imbue LLM agents with robust memory, structured planning, hierarchical goal management, and adaptive self‑management capabilities
                    inspired by cognitive science.
                  </p>

                  <p>
                    EideticEngine integrates two key components:
                  </p>

                  {/* Use standard list styling from prose */}
                  <ol className="list-decimal space-y-3 pl-5">
                    <li>
                      <strong className="text-blue-300 font-semibold">Unified Memory System (UMS)</strong>: a persistent, multi‑level
                      cognitive workspace implemented on an asynchronous SQLite backend, featuring distinct memory types
                      (<CodeTag>WORKING</CodeTag>, <CodeTag>EPISODIC</CodeTag>, <CodeTag>SEMANTIC</CodeTag>, <CodeTag>PROCEDURAL</CodeTag>), rich metadata, explicit typed
                      linking, hybrid search, and integrated workflow tracking.
                    </li>

                    <li>
                      <strong className="text-purple-300 font-semibold">Agent Master Loop (AML)</strong>: an adaptive orchestrator that
                      directs an LLM (specifically <em className="italic">Claude 3.7 Sonnet</em>) using the UMS. The AML enforces dependency‑aware plans, supports hierarchical task decomposition via a Goal Stack, and orchestrates agent‑driven meta‑cognition for reflection, consolidation, and self‑regulation.
                    </li>
                  </ol>

                  <p>
                    Empirical analysis demonstrates that EideticEngine enables agents to navigate analytical and creative tasks with greater autonomy, robustness, and learning capacity than existing frameworks.
                  </p>
                </div>
              </div>
            </section>

            {/* Introduction Section */}
            <section id="introduction" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  1. Introduction: Towards Cognitive Autonomy in LLM Agents
                </h2>
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6 text-gray-300">
                  <p>
                    The remarkable generative and reasoning abilities of Large Language Models (LLMs) have catalyzed the
                    development of autonomous agents aimed at complex problem-solving. Yet, the transition from impressive
                    demonstrations to <em className="italic">robust</em>, <em className="italic">reliable</em> agents capable of sustained, adaptive operation across diverse,
                    long-horizon tasks remains a formidable challenge.
                  </p>

                  <p>Current agent frameworks often grapple with fundamental limitations:</p>

                  <ul className="space-y-3 list-none pl-0"> {/* Removed default list styling */}
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-900/70 flex items-center justify-center">
                          <span className="text-blue-300 text-xs font-bold">1</span>
                        </div>
                      </div>
                      <span><strong className="text-blue-300 font-semibold">Memory Persistence & Structure:</strong> Reliance on ephemeral prompt
                        context or simplistic memory buffers hinders long-term learning, recall of structured knowledge, and
                        understanding of temporal or causal relationships.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-900/70 flex items-center justify-center">
                          <span className="text-blue-300 text-xs font-bold">2</span>
                        </div>
                      </div>
                      <span><strong className="text-blue-300 font-semibold">Planning & Execution:</strong> Ad-hoc or reactive planning struggles
                        with complex sequences, interdependencies, and resource management. Lack of explicit dependency tracking
                        leads to brittleness and execution failures.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-900/70 flex items-center justify-center">
                          <span className="text-blue-300 text-xs font-bold">3</span>
                        </div>
                      </div>
                      <span><strong className="text-blue-300 font-semibold">Adaptation & Learning:</strong> Few agents reflect on past actions or
                        synthesize experiences into durable knowledge. Our AML integrates explicit meta-cognitive tools
                        and performance-driven adaptation.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-900/70 flex items-center justify-center">
                          <span className="text-blue-300 text-xs font-bold">4</span>
                        </div>
                      </div>
                      <span><strong className="text-blue-300 font-semibold">Hierarchical Task Management:</strong> Managing nested goals without
                        losing focus is challenging. A dedicated Goal Stack in EideticEngine provides disciplined decomposition.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-900/70 flex items-center justify-center">
                          <span className="text-blue-300 text-xs font-bold">5</span>
                        </div>
                      </div>
                      <span><strong className="text-blue-300 font-semibold">Cognitive Coherence:</strong> Agents often lack a unified internal
                        state representation that integrates perception, memory, reasoning, planning, and action within a
                        consistent framework.</span>
                    </li>
                  </ul>

                  <p>
                    To address these critical gaps, we introduce <strong className="text-blue-300 font-semibold">EideticEngine</strong>, a comprehensive cognitive architecture designed explicitly for orchestrating advanced LLM agents. EideticEngine
                    is not merely an LLM wrapper or a collection of tools; it is an integrated system built upon two deeply
                    interconnected components.
                  </p>

                  <p>
                    EideticEngine's core hypothesis is that by tightly integrating a structured, cognitive-inspired memory system
                    with an adaptive, meta-cognitively capable control loop, we can create LLM agents that exhibit
                    significantly greater autonomy, robustness, learning capability, and effectiveness on complex, real-world
                    tasks.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Work Section */}
            <section id="related-work" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  2. Related Work: Building on and Departing From Existing Paradigms
                </h2>
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6 text-gray-300">
                  <p>EideticEngine differentiates itself from several established lines of research:</p>

                  {/* Use prose styling for spacing */}
                  <div className="space-y-6 md:space-y-8">
                    {/* Adjusted padding/text size */}
                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700/50">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-300">Standard LLM Agent Frameworks</h3>
                      <p className="text-sm md:text-base text-gray-300">
                        While providing valuable abstractions for tool use and basic memory, these frameworks typically lack a deeply integrated,
                        multi-level cognitive memory model with explicit linking and dynamic evolution; structured planning with
                        robust dependency checking; agent-driven meta-cognitive tools; and adaptive control mechanisms.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                        Examples: LangChain, LlamaIndex
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700/50">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-300">Early Autonomous Agents</h3>
                      <p className="text-sm md:text-base text-gray-300">
                        These pioneering efforts demonstrated the potential of LLM loops but suffered from unreliable planning,
                        simplistic memory, lack of error recovery, and significant coherence issues over longer runs. EideticEngine
                        addresses these directly with structured UMS, planning, dependency checks, and meta-cognition.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                        Examples: AutoGPT, BabyAGI
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700/50">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-300">Memory-Augmented LLMs</h3>
                      <p className="text-sm md:text-base text-gray-300">
                        These focus on enhancing LLM capabilities by providing access to external or specialized memory during
                        generation. EideticEngine complements this by providing a persistent, structured internal memory system that
                        tracks the agent's own experiences, thoughts, actions, and synthesized knowledge.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                        Examples: MemGPT, RAG systems
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700/50">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-300">LLM Planning & Reasoning Techniques</h3>
                      <p className="text-sm md:text-base text-gray-300">
                        These enhance the LLM's internal reasoning process, often within a single prompt or short interaction
                        sequence. EideticEngine operates at a higher architectural level, orchestrating these reasoning steps within
                        a persistent framework.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                        Examples: ReAct, Chain-of-Thought, Tree-of-Thoughts
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700/50">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-300">Classical Cognitive Architectures</h3>
                      <p className="text-sm md:text-base text-gray-300">
                        These offer rich, theoretically grounded models of cognition, often based on symbolic rule systems or
                        specialized memory structures. EideticEngine adopts key principles from cognitive architectures but implements
                        them within a practical, LLM-native framework.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                        Examples: SOAR, ACT-R, OpenCog
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700/50">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-300">Meta‑Reasoning and Reflection Research</h3>
                      <p className="text-sm md:text-base text-gray-300">
                        Few practical systems incorporate explicit, agent‑driven reflection tied to performance metrics. EideticEngine operationalizes this through dedicated UMS tools triggered by the AML. Significantly, the frequency is adaptive, creating a dynamic feedback loop for self‑regulation.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                        Examples: Reflexion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* UMS Section */}
            <section id="ums" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  3. The Unified Memory System (UMS): A Cognitive Substrate for Agents
                </h2>

                <div className="bg-blue-900/20 rounded-xl p-4 md:p-6 border border-blue-800 shadow-lg mb-6 md:mb-8">
                  <div className="flex items-center mb-3 md:mb-4">
                    <Database className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2 md:mr-3 flex-shrink-0" />
                    <h3 className="text-base md:text-xl font-bold text-blue-300">Memory System Overview</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300">
                    The foundation of the EideticEngine architecture is the Unified Memory System (UMS), a persistent and structured
                    cognitive workspace designed to move beyond the limitations of simple memory buffers or isolated vector
                    stores. It serves not just as a repository of information, but as an active substrate for the agent's
                    learning, reasoning, and operational history.
                  </p>
                </div>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6 text-gray-300">
                  <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-blue-300">3.1. Multi-Level Cognitive Memory Hierarchy</h3>

                  <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 mb-6 md:mb-8 border border-gray-700/50">
                    {/* Grid adjusts columns for mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="border border-blue-800/50 rounded-lg p-3 md:p-4 bg-blue-900/20">
                        <h4 className="font-semibold text-blue-300 mb-1 md:mb-2 text-sm md:text-base flex items-center">
                          <Clock className="w-4 h-4 mr-2" />Working Memory
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300">Explicitly managed outside the main memories table, capacity-constrained and dynamically optimized to maintain a focused attentional set.</p>
                      </div>

                      <div className="border border-blue-800/50 rounded-lg p-3 md:p-4 bg-blue-900/20">
                        <h4 className="font-semibold text-blue-300 mb-1 md:mb-2 text-sm md:text-base flex items-center">
                          <FileText className="w-4 h-4 mr-2" />Episodic Memory
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300">Directly captures agent experiences, records associated with specific actions, thoughts, or artifacts, often with shorter default TTL values.</p>
                      </div>

                      <div className="border border-blue-800/50 rounded-lg p-3 md:p-4 bg-blue-900/20">
                        <h4 className="font-semibold text-blue-300 mb-1 md:mb-2 text-sm md:text-base flex items-center">
                          <Brain className="w-4 h-4 mr-2" />Semantic Memory
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300">Represents generalized knowledge, facts, insights, summaries, or stable profiles, often resulting from consolidation or promotion processes.</p>
                      </div>

                      <div className="border border-blue-800/50 rounded-lg p-3 md:p-4 bg-blue-900/20">
                        <h4 className="font-semibold text-blue-300 mb-1 md:mb-2 text-sm md:text-base flex items-center">
                          <Code className="w-4 h-4 mr-2" />Procedural Memory
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300">Encodes learned skills or multi-step procedures, primarily populated via promotion from highly accessed, high-confidence semantic memories.</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-blue-300">3.2. Rich Metadata and Cognitive Attributes</h3>

                  <p className="text-sm md:text-base">
                    Each memory entry carries crucial metadata enabling cognitive processing:
                  </p>

                  <ul className="space-y-2 md:space-y-3 text-sm md:text-base list-disc pl-5">
                    <li>
                      <strong className="text-blue-300 font-semibold">Importance & Confidence:</strong> Explicit fields allow the agent to assign
                      subjective value and certainty to information, critical for prioritization and belief revision.
                    </li>
                    <li>
                      <strong className="text-blue-300 font-semibold">Temporal Dynamics:</strong> Timestamps combined with access counts and
                      TTL enable relevance calculations and automatic expiration, giving the memory system temporal dynamics.
                    </li>
                    <li>
                      <strong className="text-blue-300 font-semibold">Provenance & Context:</strong> Foreign keys directly link memories to
                      their operational origins, providing rich contextual grounding.
                    </li>
                    <li>
                      <strong className="text-blue-300 font-semibold">Flexible Categorization:</strong> Besides memory levels and types,
                      memories have a JSON tags field, allowing for multi-dimensional categorization and retrieval.
                    </li>
                  </ul>

                  <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 mt-6 md:mt-8 text-blue-300">3.3. Structured Associative Memory Graph</h3>

                  {/* START CRITICAL MEMORY GRAPH SECTION - Handle with care! */}
                  {/* Outer container for scrolling on mobile */}
                  <div className="bg-gray-800/80 rounded-xl p-4 md:p-8 mb-8 mx-auto max-w-full border border-gray-700/50">
                    <div className="flex flex-col items-center">
                      {/* Wrapper for horizontal scrolling if needed on small screens */}
                      {/* Updated to use code-scrollbar class */}
                      <div className="w-full overflow-x-auto pb-4 code-scrollbar rounded-lg">
                        {/* Inner container: Keeps desktop dimensions but allows mobile scroll */}
                        {/* Added min-width to prevent collapse on very small screens */}
                        <div className="relative w-full min-w-[340px] sm:min-w-[400px] md:w-96 h-64 md:h-96 bg-gray-900 rounded-2xl p-4 md:p-8 shadow-xl mx-auto">

                          <MemoryGraph />

                        </div>
                      </div>

                      {/* Description box - Adjusted padding/text size */}
                      <div className="bg-gray-900 p-4 md:p-6 rounded-xl w-full space-y-3 md:space-y-4 border border-gray-700/80 mt-6">
                        <h3 className="text-base md:text-lg font-bold text-center text-blue-400 mb-1 md:mb-2">
                          Memory Graph Structure
                        </h3>
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed text-center">
                          The UMS constructs a strongly-typed knowledge graph through the
                          <CodeTag>memory_links</CodeTag>
                          table, supporting multiple relationship types:
                        </p>
                        {/* Responsive grid for tags */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2 mt-2 md:mt-4">
                          {['RELATED', 'CAUSAL', 'SUPPORTS', 'CONTRADICTS', 'HIERARCHICAL', 'SEQUENTIAL', 'REFERENCES'].map((type) => (
                            <span key={type}
                              className={`px-2 md:px-3 py-1 bg-gray-800/80 rounded-full text-[10px] md:text-xs text-center text-cyan-300 whitespace-nowrap`}>
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END CRITICAL MEMORY GRAPH SECTION */}


                  <h3 className="text-lg md:text-2xl font-bold mb-4 mt-6 md:mt-8 text-blue-300">3.4-3.7. Advanced UMS Features</h3>

                  {/* Responsive grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                    <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="font-semibold text-blue-300 mb-2 text-sm md:text-base">Deep Workflow Integration</h4>
                      <p className="text-xs md:text-sm text-gray-300">Actions, thoughts, and artifacts are automatically linked to corresponding memories, providing comprehensive traceability.</p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="font-semibold text-blue-300 mb-2 text-sm md:text-base">Hybrid & Configurable Retrieval</h4>
                      <p className="text-xs md:text-sm text-gray-300">Multiple, complementary search mechanisms: semantic, keyword & attribute, hybrid, and relational, optimized for different information needs.</p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="font-semibold text-blue-300 mb-2 text-sm md:text-base">Knowledge Evolution</h4>
                      <p className="text-xs md:text-sm text-gray-300">Active processes for consolidation, promotion, and reflection integration refine and structure knowledge over time.</p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="font-semibold text-blue-300 mb-2 text-sm md:text-base">Robust Implementation</h4>
                      <p className="text-xs md:text-sm text-gray-300">Asynchronous design, optimized SQL, structured data handling, and comprehensive auditing ensure reliability and performance.</p>
                    </div>
                  </div>
                  
                  {/* Technical Details Link for UMS */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-700/30 my-8 shadow-lg transform transition-all hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="bg-blue-900/50 p-3 rounded-full mr-4 flex-shrink-0">
                          <FileText className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-blue-300">Technical Deep Dive</h4>
                          <p className="text-sm text-gray-300 mt-1">Explore the complete technical specification of the UMS system</p>
                        </div>
                      </div>
                      <div>
                        <a 
                          href="/ums-technical-analysis" 
                          className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          <span className="font-medium">View Technical Details</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AML Section */}
            <section id="aml" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  4. The Agent Master Loop (AML): Adaptive Orchestration and Meta-Cognition
                </h2>

                <div className="bg-purple-900/20 rounded-xl p-4 md:p-6 border border-purple-800 shadow-lg mb-8">
                  <div className="flex items-center mb-3 md:mb-4">
                    <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mr-2 md:mr-3 flex-shrink-0" />
                    <h3 className="text-base md:text-xl font-bold text-purple-300">Loop Overview</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300">
                    While the UMS provides the cognitive substrate, the Agent Master Loop (AML) acts as the central executive,
                    orchestrating the agent's perception-cognition-action cycle to achieve complex goals. It transcends simple
                    reactive loops by implementing structured planning, sophisticated context management, robust error handling,
                    and, critically, adaptive meta-cognitive control, leveraging the UMS and an LLM reasoning core (<CodeTag>claude-3-7-sonnet</CodeTag>).
                  </p>
                </div>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <h3 className="text-lg md:text-2xl font-bold mb-4 text-purple-300">4.1. Structured, Dependency-Aware Planning</h3>

                  <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 mb-8 border border-gray-700/50">
                    <div className="flex items-start mb-4">
                      <div className="p-2 bg-purple-900/40 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                        <GitBranch className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-300 mb-1 md:mb-2 text-sm md:text-base">Plan Management</h4>
                        <p className="text-xs md:text-sm text-gray-300">
                          The AML manages an explicit, dynamic plan within its state, represented as a list of <CodeTag>PlanStep</CodeTag> objects
                          with status tracking, tool assignments, and crucially, dependency management.
                        </p>
                      </div>
                    </div>

                    {/* Ensure pre block scrolls on mobile */}
                    <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-[10px] md:text-xs font-mono text-gray-300 mb-4 overflow-x-auto code-scrollbar">
                      <pre className="whitespace-pre">{`PlanStep(
  description="Analyze market sentiment from recent reports",
  status="planned",
  assigned_tool="corpus_search",
  tool_args={"query": "market sentiment reports Q2 2025"},
  depends_on=["action_12345", "action_67890"],
  result_summary=None
)`}</pre>
                    </div>

                    <p className="text-xs md:text-sm text-gray-300">
                      Before executing any PlanStep, the AML verifies that all listed prerequisites have been successfully
                      completed. If dependencies are unmet, execution is blocked and the agent is forced to reconsider
                      the plan. This mechanism prevents cascading failures common in agents without dependency management.
                    </p>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold mb-4 text-purple-300">4.2. Hierarchical Goal Stack Management</h3>

                  <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 mb-6 border border-gray-700/50">
                    <div className="flex items-start mb-4">
                      <div className="p-2 bg-purple-900/40 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-300 mb-1 md:mb-2 text-sm md:text-base">Goal Management</h4>
                        <p className="text-xs md:text-sm text-gray-300">
                          EideticEngine explicitly manages hierarchical goals for complex objective decomposition. The agent can push sub-goals onto a stack, work on them until completion, and then return to parent goals.
                        </p>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-300">
                      <CodeTag>AgentState</CodeTag> maintains a <CodeTag>goal_stack</CodeTag> and <CodeTag>current_goal_id</CodeTag>. The LLM can push sub-goals via <CodeTag>push_sub_goal</CodeTag> and signal completion via <CodeTag>mark_goal_status</CodeTag>. This allows complex task decomposition while maintaining focus.
                    </p>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold mb-4 text-purple-300">4.3. Multi-Faceted Context Assembly</h3>

                  <p className="text-sm md:text-base">
                    The AML recognizes that effective LLM reasoning requires rich context beyond simple chat history.
                    The <CodeTag>_gather_context</CodeTag> function actively probes the UMS to construct a comprehensive snapshot:
                  </p>

                  <ul className="space-y-2 list-none pl-0 text-sm md:text-base">
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Operational State:</span> Current loop count, error details, workflow ID
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Target className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Goal Context:</span> Current goal details and goal stack summary
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Working Memory:</span> Current attentional focus
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Proactive Goal-Relevant Memory:</span> Task-related information
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Procedural Knowledge:</span> How-to information
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Core History Summary:</span> Recent actions, important memories
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-1 flex-shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>
                        <span className="font-medium text-purple-300">Meta-Cognitive Feedback:</span> Last reflection insights
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-lg md:text-2xl font-bold mb-4 mt-8 text-purple-300">4.4. Adaptive Meta-Cognitive Control</h3>

                  <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 mb-8 border border-gray-700/50">
                    <p className="text-sm md:text-base text-gray-300 mb-4">
                      This is perhaps the most innovative aspect of the AML. It doesn't just execute tasks; it monitors and
                      regulates its own cognitive processes:
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-purple-300 mb-3 text-sm md:text-base">The Meta-Cognitive Cycle</h4>
                      {/* Simpler layout for mobile if needed, but current should adapt */}
                      <div className="relative py-6 overflow-x-auto code-scrollbar">
                        <div className="absolute left-0 w-full h-0.5 bg-gray-700 top-1/2 transform -translate-y-1/2"></div>

                        {/* Meta-cognitive steps */}
                        {/* Use min-w to prevent extreme squishing on mobile */}
                        <div className="flex justify-between relative min-w-[320px]">
                          <div className="flex flex-col items-center px-1">
                            <div className="relative mb-2">
                              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-700 transform -translate-y-1/2 z-0"></div>
                              <div className="relative w-3 h-3 bg-purple-500 rounded-full z-10"></div>
                            </div>
                            <div className="w-20 sm:w-24 text-center">
                              <span className="text-[10px] md:text-xs font-medium text-purple-300 leading-tight">Reflection</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center px-1">
                            <div className="relative mb-2">
                              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-700 transform -translate-y-1/2 z-0"></div>
                              <div className="relative w-3 h-3 bg-purple-500 rounded-full z-10"></div>
                            </div>
                            <div className="w-20 sm:w-24 text-center">
                              <span className="text-[10px] md:text-xs font-medium text-purple-300 leading-tight">Consolidation</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center px-1">
                            <div className="relative mb-2">
                              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-700 transform -translate-y-1/2 z-0"></div>
                              <div className="relative w-3 h-3 bg-purple-500 rounded-full z-10"></div>
                            </div>
                            <div className="w-20 sm:w-24 text-center">
                              <span className="text-[10px] md:text-xs font-medium text-purple-300 leading-tight">Memory Opt.</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center px-1">
                            <div className="relative mb-2">
                              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-700 transform -translate-y-1/2 z-0"></div>
                              <div className="relative w-3 h-3 bg-purple-500 rounded-full z-10"></div>
                            </div>
                            <div className="w-20 sm:w-24 text-center">
                              <span className="text-[10px] md:text-xs font-medium text-purple-300 leading-tight">Mental Momentum</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500/70 pl-3 md:pl-4">
                        <h5 className="font-medium text-purple-300 text-sm md:text-base">Triggering Meta-Cognition</h5>
                        <p className="text-xs md:text-sm text-gray-300">
                          The AML checks various conditions: action counts vs. dynamic thresholds, state flags, and periodic intervals.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500/70 pl-3 md:pl-4">
                        <h5 className="font-medium text-purple-300 text-sm md:text-base">Meta-Cognitive Tools</h5>
                        <p className="text-xs md:text-sm text-gray-300">
                          The agent can generate reflections, consolidate memories, optimize working memory, update focus, and promote memories.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500/70 pl-3 md:pl-4">
                        <h5 className="font-medium text-purple-300 text-sm md:text-base">Mental Momentum</h5>
                        <p className="text-xs md:text-sm text-gray-300">
                          The system dynamically adjusts the frequency of reflection based on runtime statistics. When progress is smooth (low failure rate), the threshold for reflection increases, allowing the agent to maintain "flow" without interruption.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold mb-4 text-purple-300">4.5. Additional AML Features</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                    <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="font-semibold text-purple-300 mb-2 text-sm md:text-base">Robust Execution & Error Handling</h4>
                      <p className="text-xs md:text-sm text-gray-300">Comprehensive tool server discovery, automatic action recording, dependency tracking, error classification, and background task management.</p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="font-semibold text-purple-300 mb-2 text-sm md:text-base">Thought Chain Management</h4>
                      <p className="text-xs md:text-sm text-gray-300">Tracks and manages multiple reasoning threads, allowing the agent to switch context and organize complex reasoning paths.</p>
                    </div>
                  </div>
                  
                  {/* Technical Details Link for AML */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-700/30 my-8 shadow-lg transform transition-all hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="bg-purple-900/50 p-3 rounded-full mr-4 flex-shrink-0">
                          <FileText className="w-6 h-6 text-purple-300" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-purple-300">Technical Deep Dive</h4>
                          <p className="text-sm text-gray-300 mt-1">Explore the complete technical specification of the AML system</p>
                        </div>
                      </div>
                      <div>
                        <a 
                          href="/aml-technical-analysis" 
                          className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors shadow-md"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          <span className="font-medium">View Technical Details</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MCP Client Section */}
            <section id="mcp-client" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  5. The Ultimate MCP Client: Facilitating Cognitive Orchestration
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <p>
                    The EideticEngine architecture, while powerful conceptually, relies on a robust communication and interaction
                    layer to bridge the Agent Master Loop (AML) with the Unified Memory System (UMS) and other potential
                    external tools. The <a href="https://github.com/Dicklesworthstone/ultimate_mcp_client" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline"><strong className="font-semibold">Ultimate MCP Client</strong></a> provides this critical "glue,"
                    offering a feature-rich environment specifically designed to support the complex needs of advanced
                    cognitive agents like EideticEngine.
                  </p>

                  <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 my-8 border border-gray-700/50">
                    <h3 className="text-base md:text-xl font-bold mb-4 text-center text-blue-300">Key MCP Client Features</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="flex items-start">
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <Server className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-xs md:text-sm mb-1">Unified Access</h4>
                          <p className="text-[11px] md:text-xs text-gray-300 leading-snug">Discovers, connects, and manages multiple MCP servers through a single interface</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-xs md:text-sm mb-1">Robust Communication</h4>
                          <p className="text-[11px] md:text-xs text-gray-300 leading-snug">Asynchronous architecture, specialized handling, retry logic, circuit breaking</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-xs md:text-sm mb-1">Conversation Management</h4>
                          <p className="text-[11px] md:text-xs text-gray-300 leading-snug">Branching structure, forking, context optimization</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <Database className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-xs md:text-sm mb-1">Tool Result Caching</h4>
                          <p className="text-[11px] md:text-xs text-gray-300 leading-snug">In-memory and disk-based caching with configurable TTLs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <BarChart2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-xs md:text-sm mb-1">Observability</h4>
                          <p className="text-[11px] md:text-xs text-gray-300 leading-snug">OpenTelemetry integration, detailed monitoring, performance metrics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <Layers className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-xs md:text-sm mb-1">Interactive Interfaces</h4>
                          <p className="text-[11px] md:text-xs text-gray-300 leading-snug">CLI, Web UI, and API endpoints for diverse interaction patterns</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>
                    The client abstracts the complexity of distributed tools through a unified interface, routing requests to
                    the appropriate servers. Its robust error handling, caching, and observability features significantly
                    enhance the stability and performance of the EideticEngine agent during operation.
                  </p>
                </div>
              </div>
            </section>

            {/* Ultimate MCP Server Section */}
            <section id="ultimate-mcp-server" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  6. The Ultimate MCP Gateway Server: An Ecosystem of Tools for Cognitive Agents
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <p>
                    The EideticEngine architecture relies not only on its internal logic (AML) and its cognitive substrate (UMS) but also
                    on a rich ecosystem of external capabilities accessible via the Model Context Protocol (MCP). The <a href="https://github.com/Dicklesworthstone/ultimate_mcp_server" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline"><strong className="font-semibold">Ultimate MCP Server</strong></a>
                    hosts the UMS tools alongside a powerful suite of complementary tools, significantly expanding the agent's operational repertoire.
                  </p>

                  <div className="bg-gray-800/80 rounded-xl p-4 md:p-6 my-8 border border-gray-700/50">
                    <h3 className="text-base md:text-xl font-bold mb-6 text-center text-purple-300">Tool Ecosystem</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {/* Card 1 */}
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700/80">
                        <div className="flex justify-center mb-3">
                          <div className="p-2 bg-purple-900/40 rounded-full">
                            <Cpu className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                          </div>
                        </div>
                        <h4 className="text-center font-medium text-purple-300 mb-2 text-sm md:text-base">Core Capabilities</h4>
                        <ul className="text-[11px] md:text-xs text-gray-300 space-y-1 text-center sm:text-left list-disc list-inside sm:list-none sm:pl-0">
                          <li>Multi-Provider LLM Access</li>
                          <li>Embedding Services</li>
                          <li>Vector Database Services</li>
                          <li>Caching Infrastructure</li>
                          <li>Prompt Management</li>
                        </ul>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700/80">
                        <div className="flex justify-center mb-3">
                          <div className="p-2 bg-purple-900/40 rounded-full">
                            <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                          </div>
                        </div>
                        <h4 className="text-center font-medium text-purple-300 mb-2 text-sm md:text-base">Document & Data Tools</h4>
                        <ul className="text-[11px] md:text-xs text-gray-300 space-y-1 text-center sm:text-left list-disc list-inside sm:list-none sm:pl-0">
                          <li>Advanced Extraction Tools</li>
                          <li>Document Processing</li>
                          <li>Secure Filesystem Access</li>
                          <li>Local Text Processing</li>
                          <li>RAG & Knowledge Base Tools</li>
                        </ul>
                      </div>

                      {/* Card 3 */}
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700/80 sm:col-span-2 lg:col-span-1">
                        <div className="flex justify-center mb-3">
                          <div className="p-2 bg-purple-900/40 rounded-full">
                            <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                          </div>
                        </div>
                        <h4 className="text-center font-medium text-purple-300 mb-2 text-sm md:text-base">Advanced Capabilities</h4>
                        <ul className="text-[11px] md:text-xs text-gray-300 space-y-1 text-center sm:text-left list-disc list-inside sm:list-none sm:pl-0">
                          <li>Web Browser Automation</li>
                          <li>Optimization & Meta Tools</li>
                          <li>Tournament Evaluation</li>
                          <li>Model Comparison</li>
                          <li>Workflow Orchestration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p>
                    It's crucial to understand that the UMS is implemented as a collection of tools within the broader Ultimate
                    MCP Server. The AML, via the Ultimate MCP Client, interacts with the UMS not through direct database calls,
                    but by invoking specific <CodeTag>unified_memory:*</CodeTag> tools registered on the Gateway server. This modular design offers
                    several advantages:
                  </p>

                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-purple-300 font-semibold">Decoupling:</strong> The agent's core logic is decoupled from the specific implementation details of the memory system.</li>
                    <li><strong className="text-purple-300 font-semibold">Extensibility:</strong> New memory features can be added without requiring changes to the AML itself.</li>
                    <li><strong className="text-purple-300 font-semibold">Standardized Interaction:</strong> All interactions occur through the unified MCP interface.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Evaluation Section */}
            <section id="evaluation" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  7. Evaluation & Case Studies: Demonstrating Cognitive Capabilities
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <p>
                    We evaluated EideticEngine's architecture through detailed simulations of two distinct, complex tasks, tracing
                    the agent's internal state and UMS interactions.
                  </p>

                  {/* Responsive grid for case studies */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 my-8">
                    <div className="bg-gray-800/80 rounded-xl p-4 md:p-6 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-4 text-blue-300">Case Study 1: Financial Market Analysis</h3>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <GitBranch className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Structure:</span> Created separate thought chains for distinct analysis streams
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Goal Management:</span> Used Goal Stack for sub-tasks
                          </p>
                        </div>

                        {/* Continuation of the Evaluation section - Case Study 1 */}
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Layers className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Plan & Depend:</span> Generated multi-step plans with explicit dependencies
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Database className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Remember & Retrieve:</span> Stored key facts, searched corpus, retrieved for synthesis
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <GitMerge className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Link:</span> Explicitly connected related concepts and leveraged auto-linking
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <RefreshCw className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Reflect & Adapt:</span> Applied Mental Momentum to adjust reflection frequency during smooth progress
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Brain className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Synthesize:</span> Generated high-level insights connecting disparate facts
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/80 rounded-xl p-4 md:p-6 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-4 text-purple-300">Case Study 2: Creative Concept Development</h3>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <MessageCircle className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Ideate & Structure:</span> Brainstormed concepts, selected one, checked novelty
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Target className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Hierarchical Goals:</span> Managed sub-tasks with Goal Stack mechanism
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <FileText className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Develop & Persist:</span> Created character profiles and story arcs in semantic memory
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Layers className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Iterate & Track:</span> Generated script scenes with incremental artifact updates
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Database className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Utilize Context:</span> Retrieved profiles when generating subsequent scenes
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900/30 rounded-full mr-2 mt-1 flex-shrink-0">
                            <Award className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-xs md:text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Finalize:</span> Retrieved draft, performed final formatting, saved output
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>
                    Across both studies, the EideticEngine architecture facilitated successful completion of complex, multi-phase tasks.
                    The UMS provided the necessary persistence and structure, while the AML successfully orchestrated the LLM,
                    managed dependencies, recovered from simulated errors, and utilized meta-cognitive tools. The Mental Momentum
                    feature demonstrated self-regulation of cognitive overhead, reducing unnecessary reflection during periods of
                    smooth progress.
                  </p>
                </div>
              </div>
            </section>

            {/* Discussion Section */}
            <section id="discussion" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  8. Discussion: Implications of the EideticEngine Architecture
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <p>
                    EideticEngine demonstrates a path towards more capable and autonomous LLM agents by integrating principles from
                    cognitive science with robust software engineering. Key implications include:
                  </p>

                  <div className="bg-gray-800/80 rounded-lg p-4 md:p-6 my-8 border border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-900/40 mr-3 flex-shrink-0">
                          <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-lg font-bold text-blue-300 mb-1">Beyond Reactive Agents</h3>
                          <p className="text-xs md:text-sm text-gray-300">
                            EideticEngine moves agents from simple stimulus-response loops towards goal-directed, reflective, and adaptive
                            behavior based on persistent internal state.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-purple-900/40 mr-3 flex-shrink-0">
                          <GitBranch className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-lg font-bold text-purple-300 mb-1">Scalability for Complex Tasks</h3>
                          <p className="text-xs md:text-sm text-gray-300">
                            Structured planning, dependency management, and modular thought chains enable tackling problems that
                            overwhelm simpler architectures due to context limitations or lack of coherence.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-900/40 mr-3 flex-shrink-0">
                          <RefreshCw className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-lg font-bold text-blue-300 mb-1">Emergent Learning & Adaptation</h3>
                          <p className="text-xs md:text-sm text-gray-300">
                            The combination of reflection, consolidation, memory promotion, and Mental Momentum allows the
                            agent to refine its knowledge base and operational strategy over time based on its experience.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-purple-900/40 mr-3 flex-shrink-0">
                          <Eye className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-lg font-bold text-purple-300 mb-1">Introspection and Explainability</h3>
                          <p className="text-xs md:text-sm text-gray-300">
                            The detailed logging in the UMS and visualization tools provide unprecedented insight into the agent's
                            "reasoning" process, aiding debugging and analysis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold mb-4 text-red-300">Limitations</h3>

                  <p>
                    EideticEngine still relies heavily on the quality of the core LLM's reasoning, planning, and tool-use abilities.
                    The overhead of UMS interaction could be significant for highly real-time tasks (though optimizations mitigate
                    this). The heuristics for memory promotion and Mental Momentum are currently rule-based and could be
                    further refined through learning approaches in future work.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion Section */}
            <section id="conclusion" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  9. Conclusion: A Cognitive Leap for Agent Architectures
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <p>
                    We introduced EideticEngine, an adaptive cognitive architecture enabling LLM agents to manage complex tasks through
                    the tight integration of a Unified Memory System (UMS) and an Agent Master Loop (AML). By incorporating
                    multi-level memory, structured planning with dependency checking, hierarchical goal management via a Goal Stack,
                    agent-driven meta-cognition, and adaptive self-regulation of cognitive processes (including Mental Momentum),
                    EideticEngine demonstrates a significant advance over existing agent paradigms.
                  </p>

                  <p>
                    Our simulations highlight its ability to support sustained, goal-directed, and introspective behavior on
                    challenging analytical and creative tasks. EideticEngine offers a robust and extensible blueprint for the next
                    generation of autonomous AI systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Future Work Section */}
            <section id="future-work" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  10. Future Work
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  {/* Responsive grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-gray-800/80 p-4 md:p-5 rounded-xl border border-gray-700/50">
                      <div className="flex items-center mb-2 md:mb-3">
                        <BarChart2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
                        <h3 className="text-sm md:text-lg font-bold text-blue-300">Quantitative Benchmarking</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Rigorous evaluation against state-of-the-art baselines on complex, multi-step agent benchmarks.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-4 md:p-5 rounded-xl border border-gray-700/50">
                      <div className="flex items-center mb-2 md:mb-3">
                        <Brain className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
                        <h3 className="text-sm md:text-lg font-bold text-blue-300">Advanced Adaptation & Learning</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Exploring reinforcement learning to optimize thresholds, meta-cognitive strategy selection, and procedural skill derivation.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-4 md:p-5 rounded-xl border border-gray-700/50">
                      <div className="flex items-center mb-2 md:mb-3">
                        <UserPlus className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
                        <h3 className="text-sm md:text-lg font-bold text-blue-300">Multi-Agent Systems</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Extending EideticEngine to support collaborative tasks with shared UMS spaces and coordinated planning protocols.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-4 md:p-5 rounded-xl border border-gray-700/50">
                      <div className="flex items-center mb-2 md:mb-3">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
                        <h3 className="text-sm md:text-lg font-bold text-blue-300">Real-Time Interaction</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Investigating architectural adaptations for tighter perception-action loops in dynamic environments.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-4 md:p-5 rounded-xl border border-gray-700/50">
                      <div className="flex items-center mb-2 md:mb-3">
                        <GitMerge className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
                        <h3 className="text-sm md:text-lg font-bold text-blue-300">Theoretical Grounding</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Further formalizing the EideticEngine loop and memory dynamics in relation to established cognitive science models.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-4 md:p-5 rounded-xl border border-gray-700/50">
                      <div className="flex items-center mb-2 md:mb-3">
                        <Aperture className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
                        <h3 className="text-sm md:text-lg font-bold text-blue-300">Hybrid Reasoning</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Integrating symbolic planners or knowledge graph reasoning engines that can interact with the UMS and the LLM via the AML.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Addendum Section */}
            <section id="addendum" className="mb-12 md:mb-16 scroll-mt-20 md:scroll-mt-24 px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Addendum: Additional Technical Insights
                </h2>

                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                  <p>
                    This addendum provides additional technical insights and practical implementation details that complement
                    the main paper by focusing on aspects not previously covered in depth.
                  </p>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-5 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-blue-300">1. Low-Level Implementation Considerations</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        While the main paper details the architectural design, these additional implementation considerations are
                        crucial for real-world deployment: transaction management, memory compression strategies, embedding caching,
                        retry logic patterns, and memory garbage collection.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-5 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-blue-300">2. Operational Statistics and Telemetry</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        The EideticEngine implementation includes comprehensive telemetry options: performance metrics, memory usage patterns,
                        tool usage heat maps, reflection effectiveness measures, and detailed token consumption tracking.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-5 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-blue-300">3. Mental Momentum Implementation</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        The Mental Momentum feature biases the reflection threshold upward during periods of smooth operational progress, reducing
                        unnecessary cognitive overhead. When the error rate or failure metrics rise, the momentum bias decreases, allowing
                        for more frequent reflections and meta-cognitive operations.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-5 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-blue-300">4. Advanced Meta-Cognitive Mechanisms</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        Beyond basic reflection and consolidation: self-directed learning, context switching costs modeling,
                        emotional simulation for creative tasks, counterfactual exploration, and memory confidence calibration.
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-5 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-blue-300">5. Goal Stack Implementation Details</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        The hierarchical Goal Stack enables disciplined task decomposition while maintaining focus. Parent goals are paused while
                        sub-goals are active, and resume when sub-goals complete. This matches human executive function patterns and prevents
                        the common agent failure mode of "goal forgetting" or "goal dilution."
                      </p>
                    </div>

                    <div className="bg-gray-800/80 rounded-lg p-4 md:p-5 border border-gray-700/50">
                      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-blue-300">6. Implementation Architecture Variants</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        EideticEngine's architecture allows for specialized variants: distributed UMS for high-throughput, multimodal
                        extension for non-text modalities, resource-constrained variant for edge devices, multi-agent configuration,
                        and human-in-the-loop orchestration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EideticEngineWebsite;