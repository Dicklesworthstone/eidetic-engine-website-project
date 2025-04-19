import React, { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, stagger } from 'animejs';

const MemoryGraph = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect device type and handle resizing
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const updateDimensions = () => {
            checkMobile();
        };

        // Initial check
        updateDimensions();

        // Add resize listener
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        try {
            if (svgRef.current) {
                // First set initial properties for animation elements
                const arcs = Array.from(svgRef.current.querySelectorAll('.arc'));
                arcs.forEach(arc => {
                    if (arc instanceof SVGPathElement && arc.getTotalLength) {
                        const length = arc.getTotalLength();
                        arc.style.strokeDasharray = `${length}`;
                        arc.style.strokeDashoffset = `${length}`;
                    }
                });

                const labels = Array.from(svgRef.current.querySelectorAll('.label-text'));
                labels.forEach(label => {
                    if (label instanceof SVGElement) {
                        label.style.opacity = '0';
                        label.style.transform = 'translateY(10px)';
                    }
                });

                const nodes = Array.from(svgRef.current.querySelectorAll('.node'));
                nodes.forEach(node => {
                    if (node instanceof SVGElement) {
                        node.style.transform = 'scale(0)';
                        node.style.opacity = '0';
                        node.style.transformOrigin = 'center';
                    }
                });

                const dataFlows = Array.from(svgRef.current.querySelectorAll('.data-flow'));
                dataFlows.forEach(flow => {
                    if (flow instanceof SVGElement) {
                        flow.style.opacity = '0';
                    }
                });

                // Create main animation timeline
                const mainTimeline = createTimeline({
                    autoplay: true,
                });

                // 1. Animate central node appearing first with a more dramatic effect
                mainTimeline.add('.central-node', {
                    scale: [0, 1],
                    opacity: [0, 1],
                    easing: 'easeOutElastic(1, 0.4)',
                    duration: 1500,
                });

                // 2. Animate surrounding nodes with staggered delay
                mainTimeline.add('.satellite-node', {
                    scale: [0, 1],
                    opacity: [0, 1],
                    easing: 'easeOutElastic(1, 0.4)',
                    duration: 1200,
                    delay: stagger(150),
                }, '-=800');

                // 3. Animate node text
                mainTimeline.add('.node-text', {
                    opacity: [0, 1],
                    scale: [0.5, 1],
                    easing: 'easeOutQuad',
                    duration: 800,
                    delay: stagger(100),
                }, '-=800');

                // 4. Animate connection paths
                mainTimeline.add('.arc', {
                    strokeDashoffset: [function (el) {
                        if (el instanceof SVGPathElement && el.getTotalLength) {
                            return el.getTotalLength();
                        }
                        return 0;
                    }, 0],
                    easing: 'easeInOutQuad',
                    duration: 1500,
                    delay: stagger(150),
                }, '-=400');

                // 5. Animate label backgrounds
                mainTimeline.add('.label-bg', {
                    opacity: [0, 0.85],
                    scale: [0.7, 1],
                    easing: 'easeOutQuad',
                    duration: 800,
                    delay: stagger(150),
                }, '-=1000');

                // 6. Animate relationship labels
                mainTimeline.add('.label-text', {
                    opacity: [0, 1],
                    translateY: [10, 0],
                    easing: 'easeOutQuad',
                    duration: 800,
                    delay: stagger(150),
                }, '-=600');

                // 7. Continuous animated pulses for nodes
                animate({
                    targets: '.node-pulse',
                    scale: [1, 1.6],
                    opacity: [0.5, 0],
                    easing: 'easeOutSine',
                    duration: 2000,
                    delay: stagger(400),
                    loop: true,
                    endDelay: 0
                }, {});

                // 8. Animated data flows with a more interesting path following
                const animateDataFlows = () => {
                    arcs.forEach((arc, index) => {
                        if (arc instanceof SVGPathElement && arc.getTotalLength) {
                            const pathId = arc.getAttribute('id');
                            if (!pathId) return;

                            const dataFlow = svgRef.current?.querySelector(`[data-path="#${pathId}"]`);
                            if (!dataFlow || !(dataFlow instanceof SVGElement)) return;

                            const pathLength = arc.getTotalLength();

                            animate({
                                targets: dataFlow,
                                opacity: [0, 0.9, 0.9, 0],
                                easing: 'easeInOutSine',
                                duration: 3000,
                                delay: index * 300,
                                loopBegin: () => {
                                    if (dataFlow instanceof SVGElement) {
                                        // Set starting position at the beginning of the path
                                        const startPoint = arc.getPointAtLength(0);
                                        dataFlow.setAttribute('cx', startPoint.x.toString());
                                        dataFlow.setAttribute('cy', startPoint.y.toString());
                                        dataFlow.style.opacity = '0';
                                    }
                                },
                                update: function (anim) {
                                    const progress = anim.progress / 100;

                                    // First 80% of animation - move along path
                                    if (progress <= 0.8) {
                                        const point = arc.getPointAtLength(progress * 1.25 * pathLength);
                                        if (dataFlow instanceof SVGElement) {
                                            dataFlow.setAttribute('cx', point.x.toString());
                                            dataFlow.setAttribute('cy', point.y.toString());
                                        }
                                    }
                                },
                                complete: function () {
                                    setTimeout(() => animateDataFlows(), 500);
                                }
                            }, {});
                        }
                    });
                };

                // Start data flow animations after the main timeline
                setTimeout(animateDataFlows, 2500);

                // 9. Add subtle continuous animation to the connections
                animate({
                    targets: '.arc',
                    strokeDashoffset: function (el) {
                        if (el instanceof SVGPathElement && el.getTotalLength) {
                            return [-el.getTotalLength() * 0.1, 0];
                        }
                        return [-10, 0];
                    },
                    strokeWidth: [3, 4, 3],
                    easing: 'linear',
                    duration: 8000,
                    delay: function (_el, i) {
                        return i * 1000;
                    },
                    direction: 'alternate',
                    loop: true
                }, {});

                // 10. Subtle rotation animation for the entire visualization
                if (!isMobile) {
                    animate({
                        targets: '.nodes-container',
                        rotate: [0, 0.5, 0, -0.5, 0],
                        easing: 'easeInOutSine',
                        duration: 20000,
                        loop: true
                    }, {});
                }
            }
        } catch (error) {
            console.error('Error with animation:', error);
        }
    }, [isMobile]);

    // Define more interesting path curves for connections
    const createPath = (startX, startY, endX, endY, curvature = 0) => {
        // Direct line if curvature is 0
        if (curvature === 0) {
            return `M${startX} ${startY} L${endX} ${endY}`;
        }

        // Calculate control points for curved path
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // Offset for control point
        const dx = endX - startX;
        const dy = endY - startY;
        const normalX = -dy;
        const normalY = dx;
        const length = Math.sqrt(normalX * normalX + normalY * normalY);

        const cpX = midX + (normalX / length) * curvature;
        const cpY = midY + (normalY / length) * curvature;

        return `M${startX} ${startY} Q${cpX} ${cpY} ${endX} ${endY}`;
    };

    // Central point coordinates
    const centerX = 200;
    const centerY = 200;

    // Node positions - adjusted for better layout with more space
    const eventX = 200;
    const eventY = 65; // Moved higher up for better spacing

    const insightX = 335; // Moved further right
    const insightY = 150;

    const actionX = 200;
    const actionY = 335; // Moved further down

    const profileX = 65; // Moved further left
    const profileY = 150;

    // Path definitions with improved connection points for better visibility
    const eventPath = createPath(centerX, centerY - 34, eventX, eventY + 24, 0);
    const insightPath = createPath(centerX + 34, centerY, insightX - 24, insightY, 60);
    const actionPath = createPath(centerX, centerY + 34, actionX, actionY - 24, 0);
    const profilePath = createPath(centerX - 34, centerY, profileX + 24, profileY, -60);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>

            <svg
                ref={svgRef}
                className="w-full h-full"
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Interactive memory graph visualization"
            >
                {/* Enhanced gradients for richer node appearance */}
                <defs>
                    <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="70%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </radialGradient>

                    <radialGradient id="eventGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="70%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#16a34a" />
                    </radialGradient>

                    <radialGradient id="insightGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#d8b4fe" />
                        <stop offset="70%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </radialGradient>

                    <radialGradient id="actionGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#fde68a" />
                        <stop offset="70%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#ca8a04" />
                    </radialGradient>

                    <radialGradient id="profileGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#fca5a5" />
                        <stop offset="70%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#dc2626" />
                    </radialGradient>

                    {/* Enhanced glow effect for connections */}
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Text shadow for better readability */}
                    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" floodOpacity="0.8" />
                    </filter>
                </defs>

                {/* Background elements for depth */}
                <g className="background-elements">
                    {/* Subtle grid lines */}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <line
                            key={`grid-h-${i}`}
                            x1="0"
                            y1={i * 40 + 20}
                            x2="400"
                            y2={i * 40 + 20}
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="1"
                        />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <line
                            key={`grid-v-${i}`}
                            x1={i * 40 + 20}
                            y1="0"
                            x2={i * 40 + 20}
                            y2="400"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="1"
                        />
                    ))}
                </g>

                {/* Pulse effects for nodes */}
                <g className="pulse-container">
                    <circle className="node-pulse" cx={centerX} cy={centerY} r="34" fill="url(#centralGlow)" opacity="0" />
                    <circle className="node-pulse" cx={eventX} cy={eventY} r="24" fill="url(#eventGlow)" opacity="0" />
                    <circle className="node-pulse" cx={insightX} cy={insightY} r="24" fill="url(#insightGlow)" opacity="0" />
                    <circle className="node-pulse" cx={actionX} cy={actionY} r="24" fill="url(#actionGlow)" opacity="0" />
                    <circle className="node-pulse" cx={profileX} cy={profileY} r="24" fill="url(#profileGlow)" opacity="0" />
                </g>

                {/* Connecting Arcs with improved paths and increased visibility */}
                <g className="connections-container">
                    <path
                        id="path-event"
                        className="arc"
                        d={eventPath}
                        stroke="rgba(77, 166, 255, 0.95)"
                        strokeWidth="7"
                        fill="none"
                        filter="url(#glow)"
                    />
                    <path
                        id="path-insight"
                        className="arc"
                        d={insightPath}
                        stroke="rgba(159, 122, 234, 0.95)"
                        strokeWidth="5"
                        fill="none"
                        filter="url(#glow)"
                    />
                    <path
                        id="path-action"
                        className="arc"
                        d={actionPath}
                        stroke="rgba(234, 179, 8, 0.95)"
                        strokeWidth="5"
                        fill="none"
                        filter="url(#glow)"
                    />
                    <path
                        id="path-profile"
                        className="arc"
                        d={profilePath}
                        stroke="rgba(239, 68, 68, 0.95)"
                        strokeWidth="5"
                        fill="none"
                        filter="url(#glow)"
                    />
                </g>

                {/* Data flow circles - animated to travel along the paths */}
                <g className="data-flows-container">
                    <circle
                        className="data-flow"
                        cx={centerX}
                        cy={centerY}
                        r="8"
                        fill="#4da6ff"
                        filter="url(#glow)"
                        data-path="#path-event"
                    />
                    <circle
                        className="data-flow"
                        cx={centerX}
                        cy={centerY}
                        r="8"
                        fill="#9f7aea"
                        filter="url(#glow)"
                        data-path="#path-insight"
                    />
                    <circle
                        className="data-flow"
                        cx={centerX}
                        cy={centerY}
                        r="8"
                        fill="#eab308"
                        filter="url(#glow)"
                        data-path="#path-action"
                    />
                    <circle
                        className="data-flow"
                        cx={centerX}
                        cy={centerY}
                        r="8"
                        fill="#ef4444"
                        filter="url(#glow)"
                        data-path="#path-profile"
                    />
                </g>

                {/* Nodes and labels with improved positioning and animation */}
                <g className="nodes-container">
                    {/* Central Node with enhanced appearance */}
                    <circle className="node central-node" cx={centerX} cy={centerY} r="34" fill="url(#centralGlow)" filter="url(#glow)" />
                    <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" className="node-text fill-white font-bold text-lg" filter="url(#textShadow)">Fact</text>

                    {/* Surrounding Nodes with enhanced styling */}
                    <circle className="node satellite-node" cx={eventX} cy={eventY} r="24" fill="url(#eventGlow)" filter="url(#glow)" />
                    <text x={eventX} y={eventY} textAnchor="middle" dominantBaseline="middle" className="node-text fill-white font-bold text-base" filter="url(#textShadow)">Event</text>

                    <circle className="node satellite-node" cx={insightX} cy={insightY} r="24" fill="url(#insightGlow)" filter="url(#glow)" />
                    <text x={insightX} y={insightY} textAnchor="middle" dominantBaseline="middle" className="node-text fill-white font-bold text-base" filter="url(#textShadow)">Insight</text>

                    <circle className="node satellite-node" cx={actionX} cy={actionY} r="24" fill="url(#actionGlow)" filter="url(#glow)" />
                    <text x={actionX} y={actionY} textAnchor="middle" dominantBaseline="middle" className="node-text fill-white font-bold text-base" filter="url(#textShadow)">Action</text>

                    <circle className="node satellite-node" cx={profileX} cy={profileY} r="24" fill="url(#profileGlow)" filter="url(#glow)" />
                    <text x={profileX} y={profileY} textAnchor="middle" dominantBaseline="middle" className="node-text fill-white font-bold text-base" filter="url(#textShadow)">Profile</text>
                </g>

                {/* Relationship Labels with improved placement to avoid obscuring connections */}
                <g className="labels-container">
                    {/* CAUSAL label */}
                    <rect x={eventX - 40} y={eventY - 60} width="80" height="24" rx="12" className="label-bg" fill="rgba(17, 24, 39, 0.85)" />
                    <text x={eventX} y={eventY - 48} textAnchor="middle" dominantBaseline="middle" className="label-text fill-blue-300 font-semibold text-sm" filter="url(#textShadow)">CAUSAL</text>

                    {/* SUPPORTS label */}
                    <rect x={insightX + 65} y={insightY - 5} width="90" height="24" rx="12" className="label-bg" fill="rgba(17, 24, 39, 0.85)" />
                    <text x={insightX + 30} y={insightY + 45} textAnchor="middle" dominantBaseline="middle" className="label-text fill-purple-300 font-semibold text-sm" filter="url(#textShadow)">SUPPORTS</text>

                    {/* SOURCE label*/}
                    <rect x={actionX - 40} y={actionY + 40} width="80" height="24" rx="12" className="label-bg" fill="rgba(17, 24, 39, 0.85)" />
                    <text x={actionX} y={actionY + 52} textAnchor="middle" dominantBaseline="middle" className="label-text fill-yellow-300 font-semibold text-sm" filter="url(#textShadow)">SOURCE</text>

                    {/* ABOUT label  */}
                    <rect x={profileX - 70} y={profileY + 28} width="70" height="24" rx="12" className="label-bg" fill="rgba(17, 24, 39, 0.85)" />
                    <text x={profileX - 35} y={profileY + 45} textAnchor="middle" dominantBaseline="middle" className="label-text fill-red-300 font-semibold text-sm" filter="url(#textShadow)">ABOUT</text>
                </g>
            </svg>
        </div>
    );
};

export default MemoryGraph;