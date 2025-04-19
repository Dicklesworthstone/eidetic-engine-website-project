import React, { useEffect, useRef, useState, useMemo } from 'react';
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
type SectionStaticProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
};

type SectionLayoutProps = {
  x: number; // Center X
  y: number; // Center Y
  width: number;
  height: number;
  vertical?: boolean;
};

type Section = SectionStaticProps & SectionLayoutProps & { id: string };

// Static properties of sections
const sectionStaticProps: Record<string, SectionStaticProps> = {
  perception: { title: "Perception", description: "Processes input data and environmental observations", icon: Eye, gradient: "url(#grad-perception)" },
  reasoning: { title: "Reasoning", description: "Analytical decision-making and inference processes", icon: Brain, gradient: "url(#grad-reasoning)" },
  action: { title: "Action Generation", description: "Creates and executes responses and interventions", icon: Zap, gradient: "url(#grad-action)" },
  memory: { title: "Unified Memory System", description: "Integrated knowledge storage and retrieval system", icon: Database, gradient: "url(#grad-memory)" },
  working: { title: "Working Memory", description: "Temporarily active information context", icon: Clock, gradient: "url(#grad-working)" },
  episodic: { title: "Episodic Memory", description: "Experiences and chronological events", icon: FileText, gradient: "url(#grad-episodic)" },
  semantic: { title: "Semantic Memory", description: "Factual knowledge and concepts", icon: Book, gradient: "url(#grad-semantic)" },
  procedural: { title: "Procedural Memory", description: "Skills and action sequences", icon: Share2, gradient: "url(#grad-procedural)" },
  operations: { title: "Memory Operations", description: "Core retrieval and storage functions", icon: Server, gradient: "url(#grad-operations)" },
  associative: { title: "Associative Memory Network", description: "Linked concepts and relationship mapping", icon: Network, gradient: "url(#grad-associative)" },
  thoughts: { title: "Thought Chains & Reasoning", description: "Sequential reasoning patterns and inference", icon: GitBranch, gradient: "url(#grad-thoughts)" },
  workflow: { title: "Workflow & Action Tracking", description: "Goal progress and execution monitoring", icon: CheckSquare, gradient: "url(#grad-workflow)" },
  cognitive: { title: "Cognitive State Management", description: "Mental context and attention allocation", icon: Activity, gradient: "url(#grad-cognitive)" },
  knowledge: { title: "Structured Knowledge Storage", description: "Organized information hierarchies", icon: HardDrive, gradient: "url(#grad-knowledge)" },
  metacognition: { title: "Metacognition", description: "Self-reflection and strategic optimization", icon: Brain, gradient: "url(#grad-metacognition)" },
};

// Canonical layout definition
const layoutDefinition = {
  rows: [
    { id: 'top', sections: ['perception', 'reasoning', 'action'] },
    { id: 'memory', sections: ['memory'] },
    { id: 'working', sections: ['working'] },
    { id: 'types', sections: ['episodic', 'semantic', 'procedural'] },
  ],
  stack: {
    main: ['operations', 'associative', 'thoughts', 'workflow', 'cognitive', 'knowledge'],
    side: ['metacognition'],
    metacognitionWidthRatio: 0.15, // Proportion of total width for the side column
  }
};

const AgentArchitectureDiagram = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', desc: '', x: 0, y: 0 });

  // Define bounds outside useMemo so it's accessible in render
  const bounds = { x: 10, y: 10, width: 80 }; // Increased width, moved up and left

  // --- Layout Calculation ---
  const sections = useMemo(() => {
    const calculatedSections: Record<string, Section> = {};
    const gap = 1.0; // Increased gap between blocks
    const sideStackGap = 2.0; // Larger gap specifically for the side stack division
    const stackTopGap = 2.5; // Larger gap above the main stack

    // Define boundaries and row heights precisely
    const rowHeights = {
      top: 7, // Slightly increased heights for more space
      memory: 9,
      working: 9,
      types: 9,
      stack: 9, // Height of each block in the lower stack
    };
    const numStacked = layoutDefinition.stack.main.length;
    const metacognitionWidth = bounds.width * layoutDefinition.stack.metacognitionWidthRatio; // Metacognition width relative to new bounds width
    const mainStackWidth = bounds.width - metacognitionWidth - sideStackGap;

    // Calculate precise Y positions, including gaps
    let currentY = bounds.y;
    const yPos: Record<string, number> = {};
    layoutDefinition.rows.forEach(row => {
      const height = rowHeights[row.id as keyof typeof rowHeights];
      yPos[row.id] = currentY + height / 2;
      currentY += height + gap; // Add gap after each row
    });
    // Calculate stackStartY based on the bottom of the 'types' row plus the specific gap
    const typesRowBottomY = yPos['types'] + rowHeights['types'] / 2;
    const stackStartY = typesRowBottomY + stackTopGap;

    // Calculate stack Y positions with gaps
    const stackYPositions: number[] = [];
    let currentStackY = stackStartY;
    for (let i = 0; i < numStacked; i++) {
        const blockHeight = rowHeights.stack;
        stackYPositions.push(currentStackY + blockHeight / 2);
        currentStackY += blockHeight + gap;
    }
    // Calculate total height of the stack including gaps for Metacognition
    const stackTotalHeight = numStacked * rowHeights.stack + (numStacked - 1) * gap;

    // Process rows, adjusting width and x position for gaps
    layoutDefinition.rows.forEach(row => {
      const rowY = yPos[row.id];
      const rowHeight = rowHeights[row.id as keyof typeof rowHeights];
      const numSectionsInRow = row.sections.length;

      // Calculate width available for sections, removing gaps
      const totalRowGapWidth = Math.max(0, numSectionsInRow - 1) * gap;
      const availableWidth = bounds.width - totalRowGapWidth;
      const sectionWidth = availableWidth / numSectionsInRow;

      row.sections.forEach((sectionId, index) => {
        const staticProps = sectionStaticProps[sectionId];
        if (staticProps) {
          // Calculate x position considering gaps
          const sectionX = bounds.x + index * (sectionWidth + gap) + sectionWidth / 2;
          calculatedSections[sectionId] = {
            id: sectionId,
            ...staticProps,
            x: sectionX,
            y: rowY,
            width: sectionWidth,
            height: rowHeight,
          };
        }
      });
    });

    // Process main stack
    layoutDefinition.stack.main.forEach((sectionId, index) => {
      const staticProps = sectionStaticProps[sectionId];
      if (staticProps) {
        calculatedSections[sectionId] = {
          id: sectionId,
          ...staticProps,
          x: bounds.x + mainStackWidth / 2,
          y: stackYPositions[index],
          width: mainStackWidth,
          height: rowHeights.stack,
        };
      }
    });

    // Process side stack (Metacognition)
    layoutDefinition.stack.side.forEach((sectionId) => {
       const staticProps = sectionStaticProps[sectionId];
       if (staticProps) {
         calculatedSections[sectionId] = {
           id: sectionId,
           ...staticProps,
           x: bounds.x + mainStackWidth + sideStackGap + metacognitionWidth / 2,
           y: stackStartY + stackTotalHeight / 2,
           width: metacognitionWidth,
           height: stackTotalHeight,
           vertical: true,
         };
       }
    });

    return calculatedSections;
  }, []); // Empty dependency array ensures this runs only once

  // --- End Layout Calculation ---

  const handleSectionHover = (sectionId: string, entering: boolean) => {
    if (entering) {
      setActiveSection(sectionId);
      const section = sections[sectionId];
      if (section) { // Add check if section exists
        // Tooltip position relative to the center of the section
        setTooltipContent({
          title: section.title,
          desc: section.description,
          x: section.x,
          y: section.y - section.height / 2 - 4 // Position above the block
        });
        setShowTooltip(true);
      }
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
      const iconGroup = svg.querySelector(`#${sectionId}-icon-group`); // Target the group

      if (boxElement instanceof SVGElement) {
        boxElement.style.opacity = '0';
        boxElement.style.transform = 'scale(0.9)';
      }

      if (textElement instanceof SVGElement) {
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(5px)';
      }

      if (iconGroup instanceof SVGElement) { // Animate the group
        iconGroup.style.opacity = '0';
        iconGroup.style.transform = 'scale(0.8)';
      }
    });

    // Create animation timeline
    const timeline = createTimeline({
      autoplay: true,
    });
    
    // Simplified animation - fade in boxes, then contents
    timeline.add('.section-box', {
        opacity: [0, 0.9],
        scale: [0.95, 1], // Slightly different scale
        easing: 'easeOutQuad',
        duration: 600,
        delay: stagger(40) // Slightly adjusted stagger
    });

    timeline.add('.section-text, .section-icon-group', {
        opacity: [0, 1],
        scale: [0.9, 1], // Match scale animation
        translateY: [3, 0], // Smaller translate
        easing: 'easeOutQuad',
        duration: 500,
        delay: stagger(25) // Slightly adjusted stagger
    }, '-=400'); // Overlap slightly more

    animate({
      targets: '.pulse-effect',
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      easing: 'easeInOutSine',
      duration: 3000,
      loop: true
    }, {});

    animate({
      targets: '.data-particle',
      translateY: [0, 120],
      opacity: [0, 0.8, 0],
      easing: 'easeInOutSine',
      duration: 4000,
      delay: function(el, i) { return i * 300 + Math.random() * 500; },
      loop: true
    }, {});

    return () => {
      // Cleanup animations if needed
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-2xl overflow-hidden">
      {/* Removed outer gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div> */}

      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 115" // Slightly increase height for gaps
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients remain the same */}
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
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.5" result="blur" /> {/* Further reduced glow */}
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="active-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" /> {/* Further reduced active glow */}
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient background grid - slightly more visible */}
        <g className="grid-container opacity-30"> {/* Increased opacity */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="rgba(255,255,255,0.4)" // Slightly more visible grid lines
              strokeWidth="0.05" // Thinner lines
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="120"
              stroke="rgba(255,255,255,0.4)" // Slightly more visible grid lines
              strokeWidth="0.05" // Thinner lines
            />
          ))}
        </g>

        {/* Data flow particles (optional) */}
        {/* ... particles code if needed ... */}

        {/* Removed main diagram container rect */}

        {/* Top text - Agent Architecture Title */}
        <text
          x={bounds.x + bounds.width / 2} // Use bounds for centering
          y={bounds.y - 4} // Position above the top blocks using bounds.y
          textAnchor="middle"
          fill="white"
          fontSize="3.5" // Slightly larger title
          fontWeight="bold"
        >
          Agent Architecture
        </text>

        {/* Generate each section based on the calculated sections object */}
        {Object.values(sections).map((section) => { // Iterate over values
          const id = section.id; // Get id from section object
          const isVertical = section.vertical || false;
          const isActive = activeSection === id;

          // Define base sizes and padding
          const baseIconSize = isVertical ? section.width * 0.45 : section.height * 0.45; // Slightly smaller base icon
          const padding = isVertical ? 1 : 2; // Padding between elements

          // Define font size scaling
          let horizontalFontSizeScale = 0.26; // Default horizontal font size
          const verticalFontSizeScale = 0.24; // Further reduced vertical font size

          // Apply smaller font size specifically for the 'types' row
          if (['episodic', 'semantic', 'procedural'].includes(id)) {
              horizontalFontSizeScale = 0.21; // Use even smaller scale for these
          }

          // Calculate font sizes used for width estimation
          const horizontalFontSize = section.height * horizontalFontSizeScale;

          const IconComponent = section.icon;

          // Calculate top-left corner from center and dimensions
          const rectX = section.x - section.width / 2;
          const rectY = section.y - section.height / 2;

          // --- Calculate positions for balanced centering (Horizontal only) ---
          let iconTransform = isVertical ? `translate(0, ${-section.height * 0.25})` : '';
          let textX = isVertical ? 0 : 0;
          let startOffset = 0; // Define startOffset in the outer scope

          if (!isVertical) {
            const avgCharWidthFactor = 0.6; // Estimate character width relative to font size
            const estimatedTextWidth = section.title.length * horizontalFontSize * avgCharWidthFactor;
            const combinedWidth = baseIconSize + padding + estimatedTextWidth;

            // Calculate internal positions to center the combined unit
            startOffset = -combinedWidth / 2; // Assign value inside the if block
            textX = startOffset + baseIconSize + padding; // Default text position

            // Use narrower padding specifically for the 'types' row blocks
            if (['episodic', 'semantic', 'procedural'].includes(id)) {
                textX = startOffset + baseIconSize + (padding * 0.5); // Use half padding
            }
          }
          // ------------------------------------------------------------------

          return (
            <g key={id}
              onMouseEnter={() => handleSectionHover(id, true)}
              onMouseLeave={() => handleSectionHover(id, false)}
            >
              {/* Box - Apply glow filter here */}
              <rect
                id={`${id}-box`}
                className="section-box" // Class for animation
                x={rectX}
                y={rectY}
                width={section.width}
                height={section.height}
                rx="1"
                fill={section.gradient}
                // Restore subtle stroke for definition
                stroke={isActive ? "white" : "rgba(255,255,255,0.15)"} // Slightly darker/more visible default stroke
                strokeWidth={isActive ? "0.3" : "0.15"} // Further increase stroke width
                opacity="0.9"
                filter={isActive ? "url(#active-glow)" : "url(#glow)"}
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Outer Group (Unit) - Centered on the block */}
              <g transform={`translate(${section.x}, ${section.y})`} className="icon-text-unit">
                {/* Icon */}
                {IconComponent && (
                  <g
                     id={`${id}-icon-group`}
                     className="section-icon-group" // Transform removed, position set on foreignObject
                  >
                    <foreignObject
                        width={baseIconSize}
                        height={baseIconSize}
                        // Position foreignObject explicitly using startOffset (horizontal)
                        // or higher top (vertical)
                        x={isVertical ? -baseIconSize/2 : startOffset}
                        y={isVertical ? (-section.height * 0.4 - baseIconSize/2) : -baseIconSize / 2} // Move vertical icon even higher
                        // x/y removed: Position is handled by parent group's transform
                        className="overflow-visible"
                      >
                      <div className="flex items-center justify-center w-full h-full">
                        <IconComponent
                            size={baseIconSize * 0.9} // Keep icon slightly smaller than its container
                            color="rgba(255, 255, 255, 0.85)"
                            strokeWidth={1.5} />
                      </div>
                    </foreignObject>
                  </g>
                )}

                {/* Text - Centered, vertical handling for Metacognition */}
                {/* Position text starting right after icon (horizontal) or centered (vertical) */}
                <text
                  id={`${id}-text`}
                  className="section-text" // Class for animation
                  x={textX}
                  y={isVertical ? (section.height * 0.05) : 0} // Lower vertical text slightly
                  textAnchor={isVertical ? "middle" : "start"}
                  dominantBaseline={isVertical ? "middle" : "central"} // Use 'central' for horizontal text
                  fill="rgba(255, 255, 255, 0.95)"
                  // Use scaling factors for font size
                  fontSize={isVertical ? section.width * verticalFontSizeScale : section.height * horizontalFontSizeScale}
                  fontWeight={isActive ? "600" : "500"}
                  style={{ textShadow: '0px 0px 3px rgba(0,0,0,0.6)', transition: 'all 0.3s ease' }} // Slightly softer shadow
                >
                  {/* Handle vertical text stacking for Metacognition */}
                  {isVertical 
                    ? section.title.split('').map((char, index, arr) => {
                        const fontSizePx = section.width * verticalFontSizeScale;
                        const lineSpacing = 1.2; // em units
                        // When dominantBaseline is middle, dy stacks from the center
                        const initialDy = `-${(arr.length - 1) * 0.5 * lineSpacing}em`;
                        const dy = index === 0 ? initialDy : `${lineSpacing}em`;

                        return (
                            <tspan
                                key={index}
                                x={0} // Keep centered horizontally
                                // Start near top, move down; adjust dy based on font size and line spacing
                                dy={dy}
                            >
                                {char}
                            </tspan>
                        );
                    })
                    : section.title // Render normally for horizontal text
                  }
                </text>
              </g>
            </g>
          );
        })}

        {/* Removed internal divider lines */}

        {/* Tooltip - Adjusted Y position calculation */}
        {showTooltip && (
          <g
            className="tooltip"
            transform={`translate(${tooltipContent.x}, ${tooltipContent.y})`}
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
              fill="rgba(255,255,255,0.8)"
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