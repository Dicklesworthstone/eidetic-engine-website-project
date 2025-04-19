// src/AgentLoopFlow.tsx
import React, { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import {
    Database, Package, Brain, GitBranch, Zap,
    Target, RefreshCw, AlertTriangle, MessageCircle,
} from 'lucide-react';

/* ───── static tables ─────────────────────────────────────────── */
type NodeDef = {
    id: string;
    Icon: React.FC<{ size: number; color: string }>;
    lbl: string;
    x: number;
    y: number;
    grad: string;
    description: string;
};

const NODES: NodeDef[] = [
    { id: 'memory', Icon: Database, lbl: 'Memory', x: 5, y: 22, grad: 'url(#g-blue)', description: 'Stores and retrieves relevant information' },
    { id: 'context', Icon: Package, lbl: 'Context', x: 25, y: 22, grad: 'url(#g-purple)', description: 'Processes and structures information for reasoning' },
    { id: 'llm', Icon: Brain, lbl: 'LLM', x: 45, y: 22, grad: 'url(#g-indigo)', description: 'Language model for decision making and understanding' },
    { id: 'decision', Icon: GitBranch, lbl: 'Decision', x: 65, y: 22, grad: 'url(#g-pink)', description: 'Evaluates options and determines next steps' },
    { id: 'action', Icon: Zap, lbl: 'Action', x: 85, y: 22, grad: 'url(#g-rose)', description: 'Executes determined actions in the environment' },
    { id: 'goal', Icon: Target, lbl: 'Goal Stack', x: 20, y: 70, grad: 'url(#g-cyan)', description: 'Maintains and prioritizes agent objectives' },
    { id: 'meta', Icon: RefreshCw, lbl: 'Meta‑Cog', x: 50, y: 78, grad: 'url(#g-green)', description: 'Self-reflection and strategic adjustments' },
    { id: 'error', Icon: AlertTriangle, lbl: 'Error System', x: 80, y: 70, grad: 'url(#g-red)', description: 'Detects and handles failures and exceptions' },
    { id: 'feedback', Icon: MessageCircle, lbl: 'Feedback', x: 83, y: 45, grad: 'url(#g-amber)', description: 'Processes external inputs and responses' },
];

type EdgeDef = {
    from: string;
    to: string;
    colour: string;
    id: string;
    type: 'primary' | 'feedback' | 'error';
    description: string;
};

const EDGES: EdgeDef[] = [
    { from: 'memory', to: 'context', colour: '#60a5fa', id: 'p1', type: 'primary', description: 'Retrieves relevant data for processing' },
    { from: 'context', to: 'llm', colour: '#8b5cf6', id: 'p2', type: 'primary', description: 'Provides structured context for reasoning' },
    { from: 'llm', to: 'decision', colour: '#a855f7', id: 'p3', type: 'primary', description: 'Generates reasoning for decision making' },
    { from: 'decision', to: 'action', colour: '#ec4899', id: 'p4', type: 'primary', description: 'Translates decisions into executable actions' },
    { from: 'action', to: 'feedback', colour: '#fbbf24', id: 'f1', type: 'feedback', description: 'Captures results of actions taken' },
    { from: 'feedback', to: 'meta', colour: '#34d399', id: 'f2', type: 'feedback', description: 'Provides inputs for self-reflection' },
    { from: 'meta', to: 'memory', colour: '#34d399', id: 'f3', type: 'feedback', description: 'Updates memory based on reflections' },
    { from: 'action', to: 'error', colour: '#f43f5e', id: 'e1', type: 'error', description: 'Detects failures during action execution' },
    { from: 'error', to: 'goal', colour: '#22d3ee', id: 'e2', type: 'error', description: 'Adjusts goals based on encountered errors' },
    { from: 'goal', to: 'memory', colour: '#22d3ee', id: 'e3', type: 'error', description: 'Updates memory with revised objectives' },
];

/* ───── helpers ──────────────────────────────────────────────── */
const pos = (id: string) => {
    const n = NODES.find(n => n.id === id)!;
    return [n.x, n.y] as const;
};

/* ───── component ────────────────────────────────────────────── */
export default function AgentLoopFlow() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [activeEdges, setActiveEdges] = useState<string[]>([]);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState({ title: '', desc: '', x: 0, y: 0 });
    const [highlightedPath, setHighlightedPath] = useState<string[]>([]);

    // Find connected edges for a node
    const getConnectedEdges = (nodeId: string) => {
        return EDGES.filter(e => e.from === nodeId || e.to === nodeId).map(e => e.id);
    };

    // Handle node hover
    const handleNodeHover = (node: NodeDef, entering: boolean) => {
        if (entering) {
            setActiveNode(node.id);
            const connectedEdges = getConnectedEdges(node.id);
            setActiveEdges(connectedEdges);

            // Find and highlight full paths
            highlightFullPath(node.id);

            setTooltipContent({
                title: node.lbl,
                desc: node.description,
                x: node.x,
                y: node.y - 12
            });
            setShowTooltip(true);
        } else {
            setActiveNode(null);
            setActiveEdges([]);
            setHighlightedPath([]);
            setShowTooltip(false);
        }
    };

    // Highlight full path when clicking a node
    const handleNodeClick = (nodeId: string) => {
        highlightFullPath(nodeId);

        // Trigger a special animation effect on the path
        if (svgRef.current) {
            const riders = svgRef.current.querySelectorAll<SVGCircleElement>(
                highlightedPath.map(id => `#r-${id}`).join(',')
            );

            riders.forEach(rider => {
                const currentR = rider.getAttribute('r');
                if (!currentR) return;

                const startR = parseFloat(currentR);
                if (!Number.isFinite(startR)) return;

                animate(rider, {
                    opacity: [0.5, 1, 0.5],
                    duration: 800,
                    easing: 'easeOutElastic(1,0.5)',
                    update: ({ progress }) => {
                        // Calculate radius based on progress - expand and contract
                        const phase = progress <= 0.5 ? progress * 2 : (1 - progress) * 2;
                        const newR = startR + phase * 1.5; // Max increase of 1.5 units
                        rider.setAttribute('r', String(newR));
                    }
                });
            });
        }
    };

    // Find all nodes and edges in a path
    const highlightFullPath = (startNodeId: string) => {
        // Validate input
        if (!startNodeId || typeof startNodeId !== 'string') {
            console.warn('Invalid node ID provided to highlightFullPath');
            setHighlightedPath([]);
            return;
        }

        const visited = new Set<string>();
        const path: string[] = [];

        // Find forward path
        const dfs = (nodeId: string) => {
            if (!nodeId || visited.has(nodeId)) return;
            visited.add(nodeId);

            // Find outgoing edges, safely handling potential errors
            const outgoingEdges = EDGES.filter(e => e.from === nodeId);
            if (outgoingEdges.length === 0) return; // No outgoing edges

            outgoingEdges.forEach(edge => {
                path.push(edge.id);
                // Sanity check to prevent infinite recursion
                if (edge.to && edge.to !== nodeId && !visited.has(edge.to)) {
                    dfs(edge.to);
                }
            });
        };

        try {
            dfs(startNodeId);
            // Limit path length to prevent performance issues with very complex paths
            const limitedPath = path.slice(0, 10);
            setHighlightedPath(limitedPath);
        } catch (err) {
            console.warn('Error in path highlighting:', err);
            setHighlightedPath([]);
        }
    };

    // Handle edge hover
    const handleEdgeHover = (edge: EdgeDef, entering: boolean) => {
        if (entering) {
            setActiveEdges([edge.id]);
            setTooltipContent({
                title: `${NODES.find(n => n.id === edge.from)?.lbl} → ${NODES.find(n => n.id === edge.to)?.lbl}`,
                desc: edge.description,
                x: (pos(edge.from)[0] + pos(edge.to)[0]) / 2,
                y: (pos(edge.from)[1] + pos(edge.to)[1]) / 2 - 10
            });
            setShowTooltip(true);
        } else {
            setActiveEdges([]);
            setShowTooltip(false);
        }
    };

    // Handle edge click to emphasize data flow
    const handleEdgeClick = (edge: EdgeDef) => {
        if (svgRef.current) {
            const path = svgRef.current.querySelector<SVGPathElement>(`#${edge.id}`);
            const rider = svgRef.current.querySelector<SVGCircleElement>(`#r-${edge.id}`);

            if (!path || !rider) return;

            try {
                // Get path length safely
                const len = path.getTotalLength();
                if (!Number.isFinite(len) || len <= 0) return;

                // Create fewer particles (3 instead of 5) for better performance
                for (let i = 0; i < 3; i++) {
                    const particle = rider.cloneNode(true) as SVGCircleElement;
                    particle.id = `temp-rider-${i}`;
                    particle.setAttribute('opacity', '1');
                    particle.setAttribute('r', '0.6'); // Slightly smaller
                    path.parentNode?.appendChild(particle);

                    // Position particle initially to avoid jumps
                    const initialPct = i * 0.15;
                    const initialDist = Math.min(initialPct * len, len - 0.1);
                    try {
                        const initialPt = path.getPointAtLength(initialDist);
                        particle.setAttribute('transform', `translate(${initialPt.x},${initialPt.y})`);
                    } catch (err) {
                        // If initial positioning fails, clean up and skip this particle
                        particle.remove();
                        continue;
                    }

                    // Animate particle along the path
                    const duration = 1000 + i * 100;
                    animate(particle, {
                        opacity: [1, 0.8, 0],
                        duration: duration,
                        easing: 'easeOutQuad',

                        update: ({ currentTime }) => {
                            if (!path.isConnected || !particle.isConnected) return;

                            try {
                                const pct = (currentTime % duration) / duration;
                                const adjustedPct = i * 0.15 + pct * 0.85; // Stagger starting positions

                                // Stay within valid path length range
                                const dist = Math.min(adjustedPct * len, len - 0.1);

                                if (!Number.isFinite(dist)) return;

                                const pt = path.getPointAtLength(dist);
                                particle.setAttribute('transform', `translate(${pt.x},${pt.y})`);
                            } catch (err) {
                                // Silently handle errors
                            }
                        },

                        complete: () => {
                            if (particle.isConnected) {
                                particle.remove();
                            }
                        }
                    });
                }

                // Highlight the path
                const currentWidth = parseFloat(path.getAttribute('stroke-width') || '1');
                const currentOpacity = parseFloat(path.getAttribute('stroke-opacity') || '0.7');

                animate(path, {
                    strokeWidth: [currentWidth, currentWidth * 1.3, currentWidth], // Reduced emphasis
                    strokeOpacity: [currentOpacity, 1, currentOpacity],
                    duration: 1200,
                    easing: 'easeOutElastic(1,0.5)',
                });
            } catch (err) {
                console.warn('Error in edge click animation:', err);
            }
        }
    };

    // Main animation setup effect
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // Clean up any unwanted elements that might appear in the upper left
        // This could be a glitch from a previous render or animation
        const cleanup = () => {
            try {
                // Remove any stray elements with no specific id
                const strayElements = svg.querySelectorAll('[id=""]');
                strayElements.forEach(el => {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                });

                // Check for any elements positioned in the upper left corner
                const upperLeftElements = Array.from(svg.querySelectorAll('*')).filter(el => {
                    // Skip elements that we know should be there
                    if (el.tagName === 'defs' || el.tagName === 'rect' || el.classList.contains('grid')) {
                        return false;
                    }

                    // Check if element has transform attribute with small x,y values
                    if (el.hasAttribute('transform')) {
                        const transform = el.getAttribute('transform');
                        if (transform && transform.includes('translate')) {
                            const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
                            if (match) {
                                const x = parseFloat(match[1]);
                                const y = parseFloat(match[2]);
                                // If element is in upper left corner and not part of core grid
                                if (x < 10 && y < 10 && !el.classList.contains('grid')) {
                                    return true;
                                }
                            }
                        }
                    }

                    return false;
                });

                // Remove these elements
                upperLeftElements.forEach(el => {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                });
            } catch (err) {
                console.warn('Error during cleanup:', err);
            }
        };

        /* dash‑offset prep */
        Array.from(svg.querySelectorAll<SVGPathElement>('path.edge'))
            .forEach(p => {
                const len = p.getTotalLength();
                p.style.strokeDasharray = `${len}`;
                p.style.strokeDashoffset = `${len}`;
            });

        /* node zero‑state */
        Array.from(svg.querySelectorAll<SVGGElement>('g.node')).forEach(n => {
            n.style.transformOrigin = 'center';
            n.style.transform = 'scale(0)';
            n.style.opacity = '0';
        });

        /* rider zero‑state */
        Array.from(svg.querySelectorAll<SVGCircleElement>('circle.rider'))
            .forEach(r => r.style.opacity = '0');

        /* ── timeline ── */
        const tl = createTimeline({
            autoplay: true
            // Note: easing not supported in TimelineParams
        });

        // Run the cleanup after initial render
        cleanup();

        // Also run it again after a short delay to catch any elements created during animation setup
        const cleanupTimer = setTimeout(cleanup, 1000);

        // Add ambient particles in background
        tl.add('path.ambient-particle', {
            opacity: [0, 0.3, 0],
            translateX: (el, i) => [Math.random() * 100, Math.random() * 100],
            translateY: (el, i) => [Math.random() * 100, Math.random() * 100],
            duration: () => 3000 + Math.random() * 4000,
            delay: stagger(200),
            loop: true,
        }, 0);

        // Add light background glow first with improved easing
        tl.add('path.glow', {
            opacity: [0, 0.3],
            duration: 1000,
            easing: 'easeInOutSine',
            delay: stagger(150),
        }, 0);

        // Staggered node appearance with more dynamic easing
        tl.add('g.node', {
            scale: [0, 1],
            opacity: [0, 1],
            easing: 'easeOutElastic(1,.5)',
            duration: 1500,
            delay: stagger(120),
        }, '-=600');

        // Edge animation with smoother appearance
        tl.add('path.edge', {
            strokeDashoffset: el => [(el as SVGPathElement).getTotalLength(), 0],
            easing: 'easeInOutQuart',
            duration: 1600,
            delay: stagger(150),
        }, '-=1000');

        // Add section label animations
        tl.add('.section-labels text', {
            opacity: [0, 1],
            translateY: [5, 0],
            duration: 800,
            delay: stagger(200),
            easing: 'easeOutQuad',
        }, '-=800');

        // Add nice flashing/pulsing effect to node icons with more subtle transition
        animate('.node-icon', {
            opacity: [0.7, 1],
            scale: [1, 1.15, 1],
            easing: 'easeInOutSine',
            duration: 3000,
            delay: stagger(400),
            loop: true,
        });

        /* pulses with more organic feel */
        animate('.pulse', {
            scale: [1, 1.4],
            opacity: [0.6, 0],
            easing: 'easeOutQuad',
            duration: 2500,
            delay: stagger(500),
            loop: true,
        });

        /* riders with varying speeds and smoothness */
        EDGES.forEach((e, idx) => {
            const path = svg.querySelector<SVGPathElement>(`#${e.id}`);
            const rider = svg.querySelector<SVGCircleElement>(`#r-${e.id}`);

            // Skip if elements don't exist
            if (!path || !rider) {
                console.warn(`Path #${e.id} or rider #r-${e.id} not found`);
                return;
            }

            // Different speeds for different edge types
            const duration = e.type === 'primary' ? 2200 :
                e.type === 'feedback' ? 2600 : 3000;

            // Add slight randomness to make it feel more organic
            const finalDuration = duration + Math.random() * 300;

            // Instead of using r in animation, we'll update the attribute directly
            const baseR = e.type === 'primary' ? 0.7 : 0.5;
            rider.setAttribute('r', String(baseR));

            let len;
            try {
                len = path.getTotalLength();
                // Validate length
                if (!Number.isFinite(len) || len <= 0) {
                    console.warn(`Invalid path length for #${e.id}: ${len}`);
                    return;
                }
            } catch (err) {
                console.warn(`Error getting path length for #${e.id}`);
                return;
            }

            animate(rider, {
                opacity: [0, 0.9, 0.9, 0],
                duration: finalDuration,
                easing: 'easeInOutSine',
                delay: 1600 + idx * 250,
                loop: true,

                update: ({ currentTime, duration }) => {
                    if (!path.isConnected || !rider.isConnected) return; // Check if elements still exist

                    try {
                        // Recalculate length in update function to handle potential changes
                        const currentLen = path.getTotalLength();
                        if (!Number.isFinite(currentLen) || currentLen <= 0) return;

                        const pct = (currentTime % duration) / duration;

                        // Add slight easing to the particle movement 
                        // This makes particles follow the edge path naturally
                        const easedPct = 0.5 - 0.5 * Math.cos(pct * Math.PI * 2);

                        // Ensure we stay within valid path length range (avoid edge cases)
                        const dist = Math.min(easedPct * currentLen, currentLen - 0.1);

                        if (!Number.isFinite(dist)) return;

                        const pt = path.getPointAtLength(dist);
                        rider.setAttribute('transform', `translate(${pt.x},${pt.y})`);

                        // Use attribute instead of animation for r
                        const pulseR = baseR + Math.sin(pct * Math.PI * 2) * 0.1;
                        rider.setAttribute('r', String(pulseR));
                    } catch (err) {
                        // Silently handle errors to prevent console spam
                    }
                },
            });
        });

        // Wait a moment before adding ambient particles to ensure paths are ready
        setTimeout(() => {
            // Add particles that follow edges instead of random ambient particles
            if (!svg || !svg.isConnected) return; // Check if SVG still exists in DOM

            // Create particles along each edge
            EDGES.forEach((edge, edgeIndex) => {
                const path = svg.querySelector<SVGPathElement>(`#${edge.id}`);
                if (!path) return;

                let len;
                try {
                    len = path.getTotalLength();
                    // Ensure the length is valid
                    if (!Number.isFinite(len) || len <= 0) return;
                } catch (e) {
                    console.warn(`Could not get length for path #${edge.id}`, e);
                    return;
                }

                // Add 1-2 particles per edge (reduced count for performance)
                const particleCount = edgeIndex % 3 === 0 ? 2 : 1;

                for (let i = 0; i < particleCount; i++) {
                    // Create particle
                    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    particle.setAttribute('class', 'ambient-particle');
                    particle.setAttribute('r', String(0.2 + Math.random() * 0.2)); // Smaller particles
                    particle.setAttribute('fill', edge.colour);
                    particle.setAttribute('opacity', '0');
                    svg.appendChild(particle);

                    // Calculate a random starting position
                    const startPct = Math.random();
                    let startPoint;
                    try {
                        startPoint = path.getPointAtLength(Math.min(startPct * len, len - 0.1));
                    } catch (e) {
                        console.warn(`Could not calculate point on path #${edge.id}`, e);
                        continue;
                    }

                    // Position the particle initially to avoid jumps
                    particle.setAttribute('transform', `translate(${startPoint.x}, ${startPoint.y})`);

                    // Animate particles along the path
                    animate(particle, {
                        opacity: [0, 0.2, 0], // Much more subtle
                        duration: 5000 + Math.random() * 3000,
                        delay: 2000 + Math.random() * 3000 + edgeIndex * 200,
                        easing: 'easeInOutSine',
                        loop: true,

                        update: ({ currentTime, duration }) => {
                            if (!path.isConnected) return; // Skip if path no longer exists

                            try {
                                const pct = (currentTime % duration) / duration;

                                // Move along the path with slight variation
                                const pathPct = (startPct + pct) % 1;
                                // Ensure we stay within valid path length
                                const pathDistance = Math.min(pathPct * len, len - 0.1);

                                if (!Number.isFinite(pathDistance)) return;

                                const point = path.getPointAtLength(pathDistance);

                                // Add slight variation to not be exactly on the path
                                const offsetX = (Math.sin(pct * Math.PI * 4) * 0.5);
                                const offsetY = (Math.cos(pct * Math.PI * 6) * 0.5);

                                particle.setAttribute('transform',
                                    `translate(${point.x + offsetX}, ${point.y + offsetY})`
                                );
                            } catch (e) {
                                // Silently handle errors to prevent console spam
                                // If we can't calculate position, just keep particle where it is
                            }
                        }
                    });
                }
            });
        }, 1000); // Delay adding particles until paths are fully initialized

        // Safer way to add subtle pulse to the entire diagram
        try {
            // Only animate if the SVG is still in the document
            if (svg.isConnected) {
                animate(svg, {
                    scale: [1, 1.005, 1], // Reduced scale to be more subtle
                    duration: 8000,
                    easing: 'easeInOutSine',
                    loop: true,
                });
            }
        } catch (err) {
            console.warn('Error setting up SVG pulse animation:', err);
        }

        return () => {
            // Clean up animations if component unmounts
        };
    }, []);

    return (
        <div className="relative w-full h-120 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-2 md:p-4 shadow-xl overflow-hidden">
            {/* Enhanced background with subtle gradient - Increased height to 120 */}
            <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-grid-white-100/[0.06] bg-[size:20px_20px]"></div>
            </div>

            {/* Animated particles in background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-full flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: `${8 + Math.random() * 20}px`,
                                height: `${8 + Math.random() * 20}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0.05 + Math.random() * 0.1,
                                animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
                                animationDelay: `${-Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Title with subtle glow */}
            <div className="absolute top-2 left-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 font-semibold text-xl" style={{
                textShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}>
                Agent Cognitive Loop
            </div>

            {/* Reset viewBox to original with proper padding */}
            <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
                {/* Enhanced gradients */}
                <defs>
                    {/* Filter for ambient glow */}
                    <filter id="ambient-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* More sophisticated gradients with better color transitions */}
                    {[
                        ['g-blue', '#60a5fa', '#3b82f6', '#2563eb'],
                        ['g-purple', '#a78bfa', '#8b5cf6', '#7c3aed'],
                        ['g-indigo', '#818cf8', '#6366f1', '#4f46e5'],
                        ['g-pink', '#f472b6', '#ec4899', '#db2777'],
                        ['g-rose', '#fb7185', '#f43f5e', '#e11d48'],
                        ['g-cyan', '#22d3ee', '#06b6d4', '#0891b2'],
                        ['g-green', '#34d399', '#10b981', '#059669'],
                        ['g-red', '#f87171', '#ef4444', '#b91c1c'],
                        ['g-amber', '#fbbf24', '#f59e0b', '#d97706'],
                    ].map(([id, c1, c2, c3]) => (
                        <linearGradient id={id} key={id} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={c1} stopOpacity=".9" />
                            <stop offset="50%" stopColor={c2} stopOpacity=".95" />
                            <stop offset="100%" stopColor={c3} stopOpacity="1" />
                        </linearGradient>
                    ))}

                    {/* Add radial gradient for background glow effect */}
                    <radialGradient id="center-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    {/* Soft glow for the edges */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Additional stronger glow for highlighted elements */}
                    <filter id="strong-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Arrow markers with proper positioning to appear between nodes */}
                    {['primary', 'feedback', 'error'].map(type => (
                        <marker
                            key={`arrow-${type}`}
                            id={`arrow-${type}`}
                            viewBox="0 0 10 10"
                            refX="5"
                            refY="5"
                            markerWidth="1.5"
                            markerHeight="1.5"
                            orient="auto"
                        >
                            <path
                                d="M0 0 L10 5 L0 10 z"
                                fill={type === 'primary' ? 'white' :
                                    type === 'feedback' ? '#34d399' : '#f87171'}
                                fillOpacity="1"
                                stroke={type === 'primary' ? 'white' :
                                    type === 'feedback' ? '#34d399' : '#f87171'}
                                strokeWidth="1"
                            />
                        </marker>
                    ))}
                </defs>

                {/* Restore padding but make it more mobile-friendly */}
                <g transform="translate(10, 15) scale(0.85)">
                    {/* Center radial glow */}
                    <circle
                        cx="50"
                        cy="50"
                        r="50"
                        fill="url(#center-glow)"
                        style={{
                            animation: 'pulse 8s ease-in-out infinite'
                        }}
                    />

                    {/* Light grid background */}
                    <rect width="100" height="100" fill="none" stroke="#ffffff10" strokeWidth="0.15" />
                    <g className="grid">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <line
                                key={`gridx-${i}`}
                                x1="0"
                                y1={i * 10}
                                x2="100"
                                y2={i * 10}
                                stroke="#ffffff08"
                                strokeWidth="0.1"
                            />
                        ))}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <line
                                key={`gridy-${i}`}
                                x1={i * 10}
                                y1="0"
                                x2={i * 10}
                                y2="100"
                                stroke="#ffffff08"
                                strokeWidth="0.1"
                            />
                        ))}
                    </g>

                    {/* Label sections of the diagram */}
                    <g className="section-labels">
                        <text x="45" y="13" textAnchor="middle" fontSize="3" fill="#94a3b8" fontWeight="600">
                            Primary Processing Loop
                        </text>
                        <text x="50" y="89" textAnchor="middle" fontSize="3" fill="#94a3b8" fontWeight="600">
                            Reflection Systems
                        </text>
                    </g>

                    {/* Move Task Input node a bit to the right to prevent overlap */}
                    <g className="node" transform="translate(22, 18)">
                        <rect
                            x="-7"
                            y="-4.5"
                            width="14"
                            height="9"
                            rx="2"
                            fill="url(#g-blue)"
                            stroke="white"
                            strokeWidth="0.3"
                            filter="url(#glow)"
                        />
                        <foreignObject x="-3.5" y="-3.5" width="7" height="7">
                            <div className="node-icon w-full h-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                        </foreignObject>
                        <text
                            x="0"
                            y="8"
                            textAnchor="middle"
                            fontSize="2.6"
                            fill="white"
                            fontWeight="600"
                            style={{
                                textShadow: '0px 1px 2px rgba(0,0,0,0.5)'
                            }}
                        >
                            Task Input
                        </text>
                    </g>

                    {/* Edges - with enhanced glows, improved curved paths, and interactivity */}
                    {EDGES.map(e => {
                        const [x1, y1] = pos(e.from);
                        const [x2, y2] = pos(e.to);

                        // Better curve control points based on edge type
                        let controlX = (x1 + x2) / 2;
                        let controlY = e.type === 'primary' ?
                            y1 :
                            e.type === 'feedback' ?
                                Math.min(y1, y2) - 15 :
                                Math.max(y1, y2) + 15;

                        // Path definition - create shorter paths to leave space for arrows
                        let d;

                        // Special adjustments for specific edges to improve curve and arrow placement
                        if (e.id === 'f1') {
                            controlY = y1 - 15;
                            // Calculate path with additional space for arrow
                            const midX = (x1 + x2) / 2;
                            const midY = (controlY + y2) / 2;
                            d = `M${x1} ${y1} Q ${controlX} ${controlY} ${midX} ${midY}`;
                        } else if (e.id === 'f3') {
                            controlY = y1 - 18;
                            const midX = (x1 + x2) / 2;
                            const midY = (controlY + y2) / 2;
                            d = `M${x1} ${y1} Q ${controlX} ${controlY} ${midX} ${midY}`;
                        } else if (e.id === 'e1') {
                            controlY = y1 + 15;
                            const midX = (x1 + x2) / 2;
                            const midY = (controlY + y2) / 2;
                            d = `M${x1} ${y1} Q ${controlX} ${controlY} ${midX} ${midY}`;
                        } else if (e.id === 'e3') {
                            controlY = y1 + 15;
                            const midX = (x1 + x2) / 2;
                            const midY = (controlY + y2) / 2;
                            d = `M${x1} ${y1} Q ${controlX} ${controlY} ${midX} ${midY}`;
                        } else if (e.type === 'primary') {
                            // For primary edges, use straight lines but make them shorter
                            // Calculate the distance between the nodes
                            const dx = x2 - x1;
                            const dy = y2 - y1;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            // Get the unit vector
                            const ux = dx / distance;
                            const uy = dy / distance;

                            // Calculate start and end points with padding for both the node and arrow
                            const startX = x1 + ux * 8; // Start a bit away from the first node
                            const startY = y1 + uy * 0; // Keep Y position to maintain horizontal alignment

                            const endX = x2 - ux * 8; // End a bit before the second node
                            const endY = y2 - uy * 0; // Keep Y position

                            d = `M${startX} ${startY} L ${endX} ${endY}`;
                        } else {
                            // Default path with adjusted endpoint for arrow visibility
                            const midX = (x1 + x2) / 2;
                            const midY = (controlY + y2) / 2;
                            d = `M${x1} ${y1} Q ${controlX} ${controlY} ${midX} ${midY}`;
                        }

                        // Different styling for different edge types
                        const strokeWidth = e.type === 'primary' ? '2' :
                            e.type === 'feedback' ? '1.5' : '1.5';

                        const markerEnd = `url(#arrow-${e.type})`;

                        const isActive = activeEdges.includes(e.id);
                        const isHighlighted = highlightedPath.includes(e.id);

                        return (
                            <g key={e.id}>
                                {/* Soft glow under the edge */}
                                <path
                                    className="glow"
                                    d={d}
                                    stroke={e.colour}
                                    strokeWidth={Number(strokeWidth) + 3}
                                    strokeOpacity={isHighlighted ? "0.4" : "0.2"}
                                    fill="none"
                                    filter={isHighlighted ? "url(#strong-glow)" : "url(#glow)"}
                                />

                                {/* The edge itself */}
                                <path
                                    id={e.id}
                                    d={d}
                                    className={`edge ${e.type} ${isActive ? 'active' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                                    stroke={e.colour}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeOpacity={isActive || isHighlighted ? '1' : '0.7'}
                                    fill="none"
                                    markerEnd={markerEnd}
                                    style={{
                                        transition: 'stroke-opacity 0.3s, stroke-width 0.3s',
                                        strokeWidth: isActive || isHighlighted ? Number(strokeWidth) + 0.8 : strokeWidth,
                                        filter: isActive || isHighlighted ? 'url(#glow)' : 'none'
                                    }}
                                    onMouseEnter={() => handleEdgeHover(e, true)}
                                    onMouseLeave={() => handleEdgeHover(e, false)}
                                    onClick={() => handleEdgeClick(e)}
                                />

                                {/* The riding particle - larger and more visible */}
                                <circle
                                    id={`r-${e.id}`}
                                    className={`rider ${e.type} ${isHighlighted ? 'highlighted' : ''}`}
                                    r={e.type === 'primary' ? '0.9' : '0.7'}
                                    fill={e.colour}
                                    opacity="0"
                                    filter={e.type === 'primary' || isHighlighted ? 'url(#glow)' : 'none'}
                                /* r is not a valid CSS style property for React SVG components, use attribute instead */
                                />
                            </g>
                        );
                    })}

                    {/* Nodes - with enhanced hover effects and interactivity */}
                    {NODES.map(n => {
                        const isActive = activeNode === n.id;

                        return (
                            <g
                                key={n.id}
                                className="node"
                                onMouseEnter={() => handleNodeHover(n, true)}
                                onMouseLeave={() => handleNodeHover(n, false)}
                                onClick={() => handleNodeClick(n.id)}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'filter 0.3s'
                                }}
                            >
                                {/* Enhanced pulse with better opacity settings */}
                                <circle
                                    className="pulse"
                                    cx={n.x}
                                    cy={n.y}
                                    r="7"
                                    fill={n.grad}
                                    opacity={isActive ? '0.6' : '0.3'}
                                    style={{
                                        transformOrigin: 'center',
                                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'transform 0.3s, opacity 0.3s',
                                        filter: isActive ? 'url(#strong-glow)' : 'none'
                                    }}
                                />

                                {/* More sophisticated node shape with enhanced shadow and highlight effect */}
                                <rect
                                    x={n.x - 7}
                                    y={n.y - 4.5}
                                    width="14"
                                    height="9"
                                    rx="2.5"
                                    fill={n.grad}
                                    stroke={isActive ? 'white' : 'rgba(255,255,255,0.4)'}
                                    strokeWidth={isActive ? '0.5' : '0.2'}
                                    filter={isActive ? 'url(#strong-glow)' : 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))'}
                                    style={{
                                        transition: 'all 0.3s',
                                    }}
                                />

                                {/* Icon with enhanced animation */}
                                <foreignObject x={n.x - 3.5} y={n.y - 3.5} width="7" height="7">
                                    <div
                                        className="node-icon w-full h-full flex items-center justify-center"
                                        style={{
                                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                            transition: 'transform 0.3s',
                                            filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'none'
                                        }}
                                    >
                                        <n.Icon size={16} color="white" />
                                    </div>
                                </foreignObject>

                                {/* Enhanced text with better font, shadow and highlight effect */}
                                <text
                                    x={n.x}
                                    y={n.y + 8}
                                    textAnchor="middle"
                                    fontSize="2.6"
                                    fill={isActive ? 'white' : '#e5e7eb'}
                                    fontWeight={isActive ? '700' : '600'}
                                    style={{
                                        textShadow: isActive ?
                                            '0px 0px 5px rgba(255,255,255,0.5), 0px 1px 2px rgba(0,0,0,0.8)' :
                                            '0px 1px 2px rgba(0,0,0,0.5)',
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    {n.lbl}
                                </text>
                            </g>
                        );
                    })}

                    {/* Enhanced tooltip with smooth appearance and better styling */}
                    {showTooltip && activeNode === null && (
                        <g
                            className="tooltip"
                            transform={`translate(${tooltipContent.x}, ${tooltipContent.y})`}
                            style={{
                                animation: 'fadeIn 0.2s ease-out'
                            }}
                        >
                            <rect
                                x="-20"
                                y="-14"
                                width="40"
                                height="12"
                                rx="3"
                                fill="rgba(17, 24, 39, 0.95)"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="0.2"
                                filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
                            />
                            <text
                                y="-9"
                                textAnchor="middle"
                                fontSize="2.4"
                                fontWeight="700"
                                fill="white"
                                style={{
                                    textShadow: '0px 1px 2px rgba(0,0,0,0.5)'
                                }}
                            >
                                {tooltipContent.title}
                            </text>
                            <text
                                y="-4.5"
                                textAnchor="middle"
                                fontSize="2"
                                fill="#94a3b8"
                            >
                                {tooltipContent.desc}
                            </text>
                        </g>
                    )}

                    {/* Interactive Legend */}
                    <g className="legend" transform="translate(5, 94)">
                        <rect x="0" y="-4.5" width="90" height="9" rx="2" fill="rgba(17, 24, 39, 0.8)" />

                        {/* Primary path */}
                        <line x1="2" y1="0" x2="8" y2="0" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="5" cy="0" r="0.8" fill="#a855f7" />
                        <text x="10" y="0.8" fontSize="2.2" fill="#e5e7eb" fontWeight="500">Primary Process</text>

                        {/* Feedback path */}
                        <line x1="27" y1="0" x2="33" y2="0" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="30" cy="0" r="0.8" fill="#34d399" />
                        <text x="35" y="0.8" fontSize="2.2" fill="#e5e7eb" fontWeight="500">Feedback Loop</text>

                        {/* Error path */}
                        <line x1="52" y1="0" x2="58" y2="0" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="55" cy="0" r="0.8" fill="#f43f5e" />
                        <text x="60" y="0.8" fontSize="2.2" fill="#e5e7eb" fontWeight="500">Error Handling</text>
                    </g>
                </g>
            </svg>

            {/* Add CSS keyframes for animations */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(15px, 15px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
        `}
            </style>
        </div>
    );
}