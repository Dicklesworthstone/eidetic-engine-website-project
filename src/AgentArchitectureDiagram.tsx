import React, { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import {
  Brain,
  Eye,
  Zap,
  Database,
  Clock,
  FileText,
  GitBranch,
  CheckSquare,
  Activity,
  Server,
  Network,
  Book,
  Share2,
  HardDrive,
  LucideIcon
} from 'lucide-react';

// Define type for section properties
type Section = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  x: number;
  y: number;
  width: number;
  height?: number;
  vertical?: boolean;
};

const AgentArchitectureDiagram = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', desc: '', x: 0, y: 0 });

  // Define the architecture sections
  const sections: Record<string, Section> = {
    perception: {
      title: "Perception",
      description: "Processes input data and environmental observations",
      icon: Eye,
      gradient: "url(#grad-perception)",
      x: 25, 
      y: 20,
      width: 20
    },
    reasoning: {
      title: "Reasoning",
      description: "Analytical decision-making and inference processes",
      icon: Brain,
      gradient: "url(#grad-reasoning)",
      x: 50,
      y: 20,
      width: 20
    },
    action: {
      title: "Action Generation",
      description: "Creates and executes responses and interventions",
      icon: Zap,
      gradient: "url(#grad-action)",
      x: 75, 
      y: 20,
      width: 20
    },
    memory: {
      title: "Unified Memory System",
      description: "Integrated knowledge storage and retrieval system",
      icon: Database,
      gradient: "url(#grad-memory)",
      x: 50,
      y: 35,
      width: 60
    },
    working: {
      title: "Working Memory",
      description: "Temporarily active information context",
      icon: Clock,
      gradient: "url(#grad-working)",
      x: 40,
      y: 48,
      width: 40
    },
    episodic: {
      title: "Episodic Memory",
      description: "Experiences and chronological events",
      icon: FileText,
      gradient: "url(#grad-episodic)",
      x: 25,
      y: 58,
      width: 17
    },
    semantic: {
      title: "Semantic Memory",
      description: "Factual knowledge and concepts",
      icon: Book,
      gradient: "url(#grad-semantic)",
      x: 50,
      y: 58,
      width: 17
    },
    procedural: {
      title: "Procedural Memory",
      description: "Skills and action sequences",
      icon: Share2,
      gradient: "url(#grad-procedural)",
      x: 75,
      y: 58,
      width: 17
    },
    operations: {
      title: "Memory Operations",
      description: "Core retrieval and storage functions",
      icon: Server,
      gradient: "url(#grad-operations)",
      x: 40,
      y: 68,
      width: 40
    },
    associative: {
      title: "Associative Memory Network",
      description: "Linked concepts and relationship mapping",
      icon: Network,
      gradient: "url(#grad-associative)",
      x: 40,
      y: 76,
      width: 40
    },
    thoughts: {
      title: "Thought Chains & Reasoning",
      description: "Sequential reasoning patterns and inference",
      icon: GitBranch,
      gradient: "url(#grad-thoughts)",
      x: 40,
      y: 84,
      width: 40
    },
    workflow: {
      title: "Workflow & Action Tracking",
      description: "Goal progress and execution monitoring",
      icon: CheckSquare,
      gradient: "url(#grad-workflow)",
      x: 40,
      y: 92,
      width: 40
    },
    cognitive: {
      title: "Cognitive State Management",
      description: "Mental context and attention allocation",
      icon: Activity,
      gradient: "url(#grad-cognitive)",
      x: 40,
      y: 100,
      width: 40
    },
    knowledge: {
      title: "Structured Knowledge Storage",
      description: "Organized information hierarchies",
      icon: HardDrive,
      gradient: "url(#grad-knowledge)",
      x: 40,
      y: 108,
      width: 40
    },
    metacognition: {
      title: "Metacognition",
      description: "Self-reflection and strategic optimization",
      icon: Brain,
      gradient: "url(#grad-metacognition)",
      x: 85,
      y: 88,
      width: 6,
      height: 50,
      vertical: true
    }
  };

  const handleSectionHover = (sectionId: string, entering: boolean) => {
    if (entering) {
      setActiveSection(sectionId);
      const section = sections[sectionId];
      setTooltipContent({
        title: section.title,
        desc: section.description,
        x: section.x,
        y: section.vertical ? section.y - 4 : section.y - 4
      });
      setShowTooltip(true);
    } else {
      setActiveSection(null);
      setShowTooltip(false);
    }
  };
  
  // Animation setup
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Set initial properties for all sections
    Object.keys(sections).forEach((sectionId) => {
      const boxElement = svg.querySelector(`#${sectionId}-box`);
      const textElement = svg.querySelector(`#${sectionId}-text`);
      const iconElement = svg.querySelector(`#${sectionId}-icon`);
      
      if (boxElement instanceof SVGElement) {
        boxElement.style.opacity = '0';
        boxElement.style.transform = 'scale(0.9)';
      }
      
      if (textElement instanceof SVGElement) {
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(5px)';
      }
      
      if (iconElement instanceof SVGElement) {
        iconElement.style.opacity = '0';
        iconElement.style.transform = 'scale(0.8)';
      }
    });

    // Create animation timeline
    const timeline = createTimeline({
      autoplay: true,
    });

    // Main container box animation
    timeline.add('.architecture-container', {
      opacity: [0, 1],
      scale: [0.95, 1],
      easing: 'easeOutQuad',
      duration: 800,
    });

    // Top level sections animation (Perception, Reasoning, Action)
    timeline.add([
      '#perception-box', 
      '#reasoning-box', 
      '#action-box'
    ], {
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: 'easeOutElastic(1, 0.5)',
      duration: 1200,
      delay: stagger(150)
    }, '-=500');

    // Icons and text for top level
    timeline.add([
      '#perception-icon', 
      '#reasoning-icon', 
      '#action-icon'
    ], {
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutQuad',
      duration: 800,
      delay: stagger(100)
    }, '-=900');

    timeline.add([
      '#perception-text', 
      '#reasoning-text', 
      '#action-text'
    ], {
      opacity: [0, 1],
      translateY: [5, 0],
      easing: 'easeOutQuad',
      duration: 800,
      delay: stagger(100)
    }, '-=700');

    // Memory system animation
    timeline.add('#memory-box', {
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: 'easeOutQuad',
      duration: 1000,
    }, '-=500');

    timeline.add(['#memory-icon', '#memory-text'], {
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutQuad',
      duration: 800,
    }, '-=700');

    // Working memory section
    timeline.add('#working-box', {
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: 'easeOutQuad',
      duration: 800,
    }, '-=400');

    timeline.add(['#working-icon', '#working-text'], {
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutQuad',
      duration: 800,
    }, '-=600');

    // Memory types animation
    timeline.add([
      '#episodic-box', 
      '#semantic-box', 
      '#procedural-box'
    ], {
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: 'easeOutQuad',
      duration: 800,
      delay: stagger(150)
    }, '-=300');

    timeline.add([
      '#episodic-icon', 
      '#semantic-icon', 
      '#procedural-icon',
      '#episodic-text', 
      '#semantic-text', 
      '#procedural-text'
    ], {
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutQuad',
      duration: 600,
      delay: stagger(50)
    }, '-=600');

    // Metacognition section
    timeline.add('#metacognition-box', {
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: 'easeOutQuad',
      duration: 800,
    }, '-=600');

    timeline.add(['#metacognition-icon', '#metacognition-text'], {
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutQuad',
      duration: 600,
    }, '-=600');

    // Lower sections animation with staggered delay
    const lowerSections = [
      'operations', 'associative', 'thoughts', 
      'workflow', 'cognitive', 'knowledge'
    ];
    
    lowerSections.forEach((section, index) => {
      timeline.add(`#${section}-box`, {
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'easeOutQuad',
        duration: 600,
      }, `-=${Math.max(300, 600 - index * 50)}`);

      timeline.add([`#${section}-icon`, `#${section}-text`], {
        opacity: [0, 1],
        scale: [0.8, 1],
        easing: 'easeOutQuad',
        duration: 600,
      }, `-=${Math.max(400, 500 - index * 50)}`);
    });

    // Continuous animation for key elements
    animate({
      targets: '.pulse-effect',
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      easing: 'easeInOutSine',
      duration: 3000,
      loop: true
    }, {});

    // Data flow animation along paths
    animate({
      targets: '.data-particle',
      translateY: [0, 100],
      opacity: [0, 0.8, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      delay: function(el, i) { return i * 200 + Math.random() * 500; },
      loop: true
    }, {});

    return () => {
      // Cleanup animations if needed
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients for each section */}
          <linearGradient id="grad-perception" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-reasoning" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-action" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-memory" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-working" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-episodic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-semantic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-procedural" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-operations" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-associative" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-thoughts" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-workflow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-cognitive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-knowledge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="grad-metacognition" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9" />
          </linearGradient>
          
          {/* Filters for glow effects */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="active-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Ambient background grid */}
        <g className="grid-container opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.1"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="120"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.1"
            />
          ))}
        </g>
        
        {/* Data flow particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={`particle-${i}`}
            className="data-particle"
            cx={20 + Math.random() * 60}
            cy={0}
            r={0.3 + Math.random() * 0.3}
            fill="white"
            opacity="0"
          />
        ))}
        
        {/* Main diagram container */}
        <rect
          className="architecture-container"
          x="20"
          y="10"
          width="60"
          height="105"
          rx="2"
          fill="rgba(30, 41, 59, 0.5)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.3"
        />
        
        {/* Top text */}
        <text
          x="50"
          y="15"
          textAnchor="middle"
          fill="white"
          fontSize="2.5"
          fontWeight="bold"
        >
          Agent Architecture
        </text>
        
        {/* Horizontal separator below title */}
        <line
          x1="20"
          y1="17"
          x2="80"
          y2="17"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        
        {/* Generate each section based on the sections object */}
        {Object.entries(sections).map(([id, section]) => {
          const isVertical = section.vertical || false;
          const height = section.height || 6;
          const width = section.width || 20;
          const isActive = activeSection === id;
          
          // For sections with icons
          const IconComponent = section.icon;
          
          return (
            <g key={id}>
              {/* Box */}
              <rect
                id={`${id}-box`}
                x={section.x - width/2}
                y={section.y - height/2}
                width={width}
                height={height}
                rx="1"
                fill={section.gradient}
                stroke={isActive ? "white" : "rgba(255,255,255,0.3)"}
                strokeWidth={isActive ? "0.3" : "0.15"}
                opacity="0.9"
                filter={isActive ? "url(#active-glow)" : "url(#glow)"}
                className="transition-all duration-300"
                style={{
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={() => handleSectionHover(id, true)}
                onMouseLeave={() => handleSectionHover(id, false)}
              />
              
              {/* Icon - only for main sections */}
              {IconComponent && !isVertical && (
                <g
                  id={`${id}-icon`}
                  transform={`translate(${section.x - width/2 + 2.5}, ${section.y - 1})`}
                  className={`pulse-effect ${isActive ? 'opacity-100' : 'opacity-75'}`}
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                >
                  <foreignObject width="3" height="3" className="overflow-visible">
                    <div className="flex items-center justify-center w-full h-full">
                      <IconComponent size={10} color="white" />
                    </div>
                  </foreignObject>
                </g>
              )}
              
              {/* Text - position differently for vertical sections */}
              {isVertical ? (
                <text
                  id={`${id}-text`}
                  x={section.x}
                  y={section.y + height/3}
                  textAnchor="middle"
                  fill="white"
                  fontSize="1.8"
                  fontWeight={isActive ? "bold" : "normal"}
                  transform={`rotate(-90, ${section.x}, ${section.y})`}
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                >
                  {section.title}
                </text>
              ) : (
                <text
                  id={`${id}-text`}
                  x={section.x + (!isVertical ? 2 : 0)}
                  y={section.y + 0.7}
                  textAnchor="middle"
                  fill="white"
                  fontSize="1.8"
                  fontWeight={isActive ? "bold" : "normal"}
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                >
                  {section.title}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Vertical dividers between top sections */}
        <line
          x1="35"
          y1="17"
          x2="35"
          y2="23"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="65"
          y1="17"
          x2="65"
          y2="23"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        
        {/* Horizontal separators */}
        <line
          x1="20"
          y1="23"
          x2="80"
          y2="23"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="20"
          y1="29"
          x2="80"
          y2="29"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="20"
          y1="41"
          x2="80"
          y2="41"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="20"
          y1="55"
          x2="80"
          y2="55"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="20"
          y1="61"
          x2="80"
          y2="61"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="33.5"
          y1="55"
          x2="33.5"
          y2="61"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        <line
          x1="66.5"
          y1="55"
          x2="66.5"
          y2="61"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.2"
        />
        
        {/* Tooltip */}
        {showTooltip && (
          <g 
            className="tooltip" 
            transform={`translate(${tooltipContent.x}, ${tooltipContent.y - 6})`}
            style={{ pointerEvents: 'none' }}
          >
            <rect
              x="-15"
              y="-10"
              width="30"
              height="10"
              rx="1"
              fill="rgba(15, 23, 42, 0.95)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.2"
            />
            <text
              y="-6"
              textAnchor="middle"
              fontSize="2"
              fontWeight="bold"
              fill="white"
            >
              {tooltipContent.title}
            </text>
            <text
              y="-2"
              textAnchor="middle"
              fontSize="1.5"
              fill="rgba(255,255,255,0.7)"
            >
              {tooltipContent.desc}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default AgentArchitectureDiagram; 