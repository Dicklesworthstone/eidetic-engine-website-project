'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import dagre from 'dagre';
import { Database, GitBranch, Link2, Server, Tag } from 'lucide-react';

/*──────────────── schema ────────────────*/
const tables = [
    'workflows', 'actions', 'artifacts',
    'thought_chains', 'thoughts', 'reflections',
    'memories', 'embeddings', 'memory_links', 'cognitive_states', 'memory_operations',
    'tags', 'workflow_tags', 'action_tags', 'artifact_tags',
    'dependencies',
] as const;

const fk: Array<[string, string]> = [
    ['actions', 'workflows'], ['actions', 'actions'],
    ['artifacts', 'workflows'], ['artifacts', 'actions'],
    ['thought_chains', 'workflows'], ['thought_chains', 'actions'],
    ['embeddings', 'memories'],
    ['memories', 'workflows'], ['memories', 'embeddings'],
    ['memories', 'actions'], ['memories', 'artifacts'],
    ['thoughts', 'thought_chains'], ['thoughts', 'thoughts'],
    ['thoughts', 'actions'], ['thoughts', 'artifacts'], ['thoughts', 'memories'],
    ['memory_links', 'memories'], ['memory_links', 'memories'],
    ['cognitive_states', 'workflows'],
    ['reflections', 'workflows'],
    ['memory_operations', 'workflows'], ['memory_operations', 'memories'], ['memory_operations', 'actions'],
    ['workflow_tags', 'workflows'], ['workflow_tags', 'tags'],
    ['action_tags', 'actions'], ['action_tags', 'tags'],
    ['artifact_tags', 'artifacts'], ['artifact_tags', 'tags'],
    ['dependencies', 'actions'], ['dependencies', 'actions'],
];

/*──────── colour by domain ────────*/
const domain = (t: string) =>
    /^mem|emb|memory_links|cognitive_states|memory_operations/.test(t) ? 'Memory' :
        /^workflows$/.test(t) ? 'Workflow' :
            /^(actions|dependencies)$/.test(t) ? 'Action' :
                /^artifacts$/.test(t) ? 'Artifact' :
                    /^(thought_|reflections)/.test(t) ? 'Thought' :
                        'Tag';

// Enhanced color palette with richer gradients
const palette: Record<string, { primary: string, secondary: string, glow: string }> = {
    Memory: {
        primary: '#3b82f6',
        secondary: '#2563eb',
        glow: 'rgba(59, 130, 246, 0.6)'
    },
    Workflow: {
        primary: '#a855f7',
        secondary: '#7c3aed',
        glow: 'rgba(168, 85, 247, 0.6)'
    },
    Action: {
        primary: '#f97316',
        secondary: '#ea580c',
        glow: 'rgba(249, 115, 22, 0.6)'
    },
    Artifact: {
        primary: '#ec4899',
        secondary: '#db2777',
        glow: 'rgba(236, 72, 153, 0.6)'
    },
    Thought: {
        primary: '#22c55e',
        secondary: '#16a34a',
        glow: 'rgba(34, 197, 94, 0.6)'
    },
    Tag: {
        primary: '#eab308',
        secondary: '#ca8a04',
        glow: 'rgba(234, 179, 8, 0.6)'
    },
};

// New descriptions for table domains
const domainDescriptions: Record<string, string> = {
    Memory: 'Core memory storage and vector embeddings',
    Workflow: 'High-level process containers',
    Action: 'Executable operations and dependencies',
    Artifact: 'Created outputs and resources',
    Thought: 'Reasoning processes and reflections',
    Tag: 'Classification and taxonomy system'
};

/*──────── dagre → echarts data ────────*/
function buildGraph() {
    // Create a new graph with increased spacing
    const g = new (dagre as any).graphlib.Graph()
        .setGraph({
            rankdir: 'LR', // Left-to-right layout
            nodesep: 260,  // Increased from 220
            ranksep: 240,  // Increased from 200
            marginx: 100,  // Increased from 80
            marginy: 100,  // Increased from 70
            acyclicer: 'greedy',
            ranker: 'network-simplex'
        })
        .setDefaultEdgeLabel(() => ({}));

    const W = 170, H = 45;

    tables.forEach(id => g.setNode(id, { width: W, height: H }));
    fk.forEach(([s, t]) => g.setEdge(s, t));
    dagre.layout(g);

    // Improved positions with better distribution and hierarchy
    const manualPositions: Record<string, { x: number, y: number }> = {
        // Memory domain (blue) - left side, more vertical spread
        'memory_links': { x: 180, y: 180 },
        'memories': { x: 180, y: 280 },
        'embeddings': { x: 180, y: 380 },
        'memory_operations': { x: 180, y: 480 },
        'cognitive_states': { x: 180, y: 580 },

        // Thought domain (green) - middle-left, more vertical spread
        'thought_chains': { x: 460, y: 180 },
        'thoughts': { x: 460, y: 280 },
        'reflections': { x: 460, y: 380 },
        
        // Workflow domain (purple) - middle
        'workflows': { x: 690, y: 220 },

        // Action domain (orange) - middle-right
        'actions': { x: 940, y: 180 },
        'dependencies': { x: 940, y: 280 },
        
        // Artifact domain (pink) - far right
        'artifacts': { x: 1200, y: 220 },
        
        // Tag domain (yellow) - spread horizontally at bottom to prevent overlaps
        'tags': { x: 690, y: 480 },
        'workflow_tags': { x: 460, y: 580 },
        'action_tags': { x: 690, y: 580 },
        'artifact_tags': { x: 940, y: 580 }
    };

    const nodes = tables.map(id => {
        // Use the manual position if available, otherwise use the dagre layout
        const { x: dagreX, y: dagreY } = g.node(id);

        // Use the manual positions directly
        const x = manualPositions[id].x;
        const y = manualPositions[id].y;

        const domainCategory = domain(id);
        const colors = palette[domainCategory];
        
        // Determine node importance/size based on its role in the schema
        // Make primary tables significantly larger for visual hierarchy
        let size = [W, H] as [number, number];
        if (['workflows', 'actions', 'artifacts', 'memories'].includes(id)) {
            size = [W * 1.25, H * 1.25]; // 25% larger for key tables (increased from 15%)
        } else if (['tags', 'thought_chains', 'embeddings'].includes(id)) {
            size = [W * 1.12, H * 1.12]; // 12% larger for secondary tables (increased from 5%)
        }

        return {
            id,
            name: id,
            x, y,
            symbol: 'roundRect',
            symbolSize: size,
            domainCategory,
            itemStyle: {
                color: 'rgba(15, 21, 36, 0.95)',
                borderColor: colors.primary,
                borderWidth: 2,
                shadowBlur: 20,
                shadowColor: colors.glow,
                borderRadius: 18,
            },
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                color: '#f8fafc',
                fontSize: ['workflows', 'actions', 'artifacts', 'memories'].includes(id) ? 15 : 14,
                fontWeight: 'bold',
                fontFamily: 'Inter, system-ui, sans-serif',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
            },
        };
    });

    const edges = fk.map(([s, t]) => {
        const sourceDomain = domain(s);
        const targetDomain = domain(t);
        const isSameDomain = sourceDomain === targetDomain;

        // Calculate a custom curveness value based on node positions
        const sourcePos = manualPositions[s];
        const targetPos = manualPositions[t];
        
        // Determine if the connection is crossing domains
        const isDomainCrossing = sourceDomain !== targetDomain;
        
        // Adjust curveness based on horizontal and vertical distance
        const dx = Math.abs(sourcePos.x - targetPos.x);
        const dy = Math.abs(sourcePos.y - targetPos.y);
        
        // Higher curveness for longer horizontal distances or domain crossing
        // Lower curveness for more vertical connections
        let curveness = 0.2;
        if (dx > 400) curveness = 0.4;
        else if (dx > 200) curveness = 0.3;
        
        // Increase curveness for domain crossing connections
        if (isDomainCrossing) curveness += 0.1;
        
        return {
            source: s,
            target: t,
            sourceDomain,
            targetDomain,
            lineStyle: {
                color: isSameDomain
                    ? palette[sourceDomain].primary
                    : 'gradient',
                width: 1.5,
                opacity: isDomainCrossing ? 0.5 : 0.7, // Lower opacity for cross-domain connections
                curveness: curveness,
                shadowBlur: isDomainCrossing ? 4 : 6,
                shadowColor: isSameDomain ? palette[sourceDomain].glow : 'rgba(148, 163, 184, 0.3)',
                type: isDomainCrossing ? [5, 10] : 'solid'
            },
            symbol: ['none', 'arrow'],
            symbolSize: 8,
        };
    });

    return { nodes, edges };
}

/*──────────────── component ────────────────*/
export default function DatabaseSchemaDiagram() {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [relatedEdges, setRelatedEdges] = useState<Array<[string, string]>>([]);
    const chartRef = useRef<ReactECharts>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    // Add debounce timer ref to reduce flickering
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const { nodes, edges } = useMemo(buildGraph, []);

    // Effect to create animated particles in the background
    useEffect(() => {
        if (!containerRef.current) return;

        // Create ambient particles
        const container = containerRef.current;
        const particlesCount = Math.min(Math.floor(container.clientWidth / 100), 15);

        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-white/10 pointer-events-none';

            // Random size between 4px and 12px
            const size = 4 + Math.random() * 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random opacity
            particle.style.opacity = `${0.05 + Math.random() * 0.1}`;

            // Animation with random duration and delay
            particle.style.animation = `float ${15 + Math.random() * 15}s ease-in-out infinite`;
            particle.style.animationDelay = `${-Math.random() * 10}s`;

            container.appendChild(particle);
        }

        return () => {
            // Clean up particles
            const particles = container.querySelectorAll('.bg-white\\/10');
            particles.forEach(p => p.remove());
        };
    }, []);

    // Calculate relationships for the selected node
    useEffect(() => {
        if (!selectedNode) {
            setRelatedEdges([]);
            return;
        }

        const related = edges.filter(edge =>
            edge.source === selectedNode || edge.target === selectedNode
        ).map(edge => [edge.source, edge.target] as [string, string]);

        setRelatedEdges(related);
    }, [selectedNode, edges]);

    // Play animation effect when node is clicked
    useEffect(() => {
        if (!selectedNode || !chartRef.current) return;

        setIsAnimating(true);

        const timer = setTimeout(() => {
            setIsAnimating(false);
            
            // After animation completes, ensure the selected node is centered
            if (chartRef.current) {
                const echartsInstance = chartRef.current.getEchartsInstance();
                
                // Find the selected node to center it
                const selectedNodeData = nodes.find(node => node.id === selectedNode);
                if (selectedNodeData) {
                    echartsInstance.dispatchAction({
                        type: 'graphRoam',
                        zoom: 1.1,
                        center: [selectedNodeData.x, selectedNodeData.y]
                    });
                }
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [selectedNode, nodes]);

    const handleNodeClick = (nodeId: string) => {
        setSelectedNode(prev => prev === nodeId ? null : nodeId);
    };

    const handleNodeHover = (nodeId: string | null) => {
        // Clear any existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set a debounce timer to prevent rapid state changes (flickering)
        debounceTimerRef.current = setTimeout(() => {
            setHoveredNode(nodeId);
        }, 50);
    };

    const option = {
        backgroundColor: 'transparent',
        graphic: [
            {
                type: 'group',
                draggable: false,
                top: 'center',
                left: 'center',
                width: '100%',
                height: '100%',
                children: [
                    {
                        type: 'rect',
                        left: 0,
                        top: 0,
                        shape: { width: '100%', height: '100%' },
                        style: {
                            fill: 'transparent',
                            stroke: 'rgba(148, 163, 184, 0.05)', // Reduced visibility of background grid
                            strokeWidth: 1,
                            lineWidth: 1,
                        }
                    }
                ]
            }
        ],
        tooltip: {
            show: true,
            formatter: (params: any) => {
                if (params.dataType === 'node') {
                    const domainType = params.data.domainCategory;
                    let colorClass = '';

                    switch (domainType) {
                        case 'Memory': colorClass = '#3b82f6'; break;
                        case 'Workflow': colorClass = '#a855f7'; break;
                        case 'Action': colorClass = '#f97316'; break;
                        case 'Artifact': colorClass = '#ec4899'; break;
                        case 'Thought': colorClass = '#22c55e'; break;
                        case 'Tag': colorClass = '#eab308'; break;
                        default: colorClass = '#3b82f6';
                    }

                    return [
                        '<div class="tooltip-container">',
                        `<div class="tooltip-title"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${colorClass};margin-right:6px;"></span>${params.name}</div>`,
                        `<div class="tooltip-content">${domainDescriptions[domainType]}</div>`,
                        '</div>'
                    ].join('');
                }
                return '';
            },
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: 'rgba(148, 163, 184, 0.2)',
            borderWidth: 1,
            textStyle: {
                color: '#f1f5f9',
                fontSize: 12,
            },
            extraCssText: 'border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); padding: 10px; z-index: 9999;',
            enterable: true,
            confine: true,
            hideDelay: 100,
        },
        legend: {
            show: true,
            top: 25,  // Higher up
            left: 'center',
            orient: 'horizontal',
            itemGap: 20, // Reduced from 30
            itemWidth: 20, // Reduced from 28
            itemHeight: 12, // Reduced from 16
            borderRadius: 6, // Reduced from 8
            padding: [6, 15, 6, 15], // Reduced padding
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            borderWidth: 1,
            borderColor: 'rgba(148, 163, 184, 0.2)',
            textStyle: {
                color: '#f8fafc',
                fontSize: 12, // Reduced from 14
                fontFamily: 'Inter, system-ui, sans-serif',
            },
            data: Object.keys(domainDescriptions).map(domain => ({
                name: domain,
                icon: 'roundRect',
                itemStyle: {
                    color: palette[domain].primary,
                    borderRadius: 4,
                    shadowBlur: 6,
                    shadowColor: palette[domain].glow,
                }
            }))
        },
        series: [{
            type: 'graph',
            layout: 'none',
            data: nodes,
            edges,
            roam: true,
            zoom: 0.4,      // Further reduced zoom to use more of the canvas
            center: [690, 390],  // Centered in available space
            nodeScaleRatio: 0.5,
            focusNodeAdjacency: true,
            draggable: false,
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                fontSize: 14,
                color: '#f8fafc',
                fontWeight: 'bold',
                fontFamily: 'Inter, system-ui, sans-serif',
            },
            edgeLabel: {
                show: false,
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: 8,
            lineStyle: {
                width: 1.5,
                opacity: 0.6,
                curveness: 0.5, // Increased from 0.4 to reduce edge crossings
            },
            categories: Object.keys(palette).map(domain => ({
                name: domain,
                itemStyle: {
                    borderColor: palette[domain].primary,
                    color: 'rgba(15, 23, 42, 0.9)',
                }
            })),
            blur: {
                itemStyle: { opacity: selectedNode ? 0.15 : 0.8 },
                lineStyle: { opacity: selectedNode ? 0.06 : 0.4 },
            },
            animation: true,
            animationDuration: 400,  // Faster animation to reduce flickering
            animationEasingUpdate: 'cubicOut', // Changed from elasticOut to reduce bounce
            animationThreshold: 50,  // Higher threshold to avoid animating small changes
            hoverAnimation: false,   // Disable hover animation that can cause flickering
            selectedMode: 'single',
            select: {
                disabled: false,
                itemStyle: {
                    shadowBlur: 25,
                    borderWidth: 3,
                    borderColor: (params: any) => {
                        const domain = params.data.domainCategory;
                        return palette[domain].primary;
                    },
                    color: 'rgba(17, 24, 39, 0.95)',
                },
                label: {
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 14,
                    textShadow: '0 0 3px rgba(0, 0, 0, 0.5)',
                }
            },
            emphasis: {
                focus: 'adjacency',
                scale: false,
                blurScope: 'global',
                itemStyle: {
                    borderWidth: 3,
                    shadowBlur: 25,
                    shadowColor: (params: any) => {
                        const domain = params.data.domainCategory;
                        return palette[domain].glow;
                    },
                },
                lineStyle: {
                    width: 3, // Increased from 2.5
                    color: (params: any) => {
                        // Get source and target domains
                        const sourceDomain = params.data.sourceDomain;
                        const targetDomain = params.data.targetDomain;
                        
                        // If same domain, use domain color, otherwise use white
                        return sourceDomain === targetDomain ? 
                            palette[sourceDomain].primary : '#f1f5f9';
                    },
                    opacity: 0.9, // Increased from 0.8
                    shadowBlur: 15, // Increased from 12
                    shadowColor: 'rgba(255, 255, 255, 0.4)', // Brighter shadow
                    type: 'solid', // Always solid for emphasized edges
                },
            },
        }],
        // Enhanced visual mapping for edges
        visualMap: {
            show: false,
            dimension: 2, // apply to the third dimension (which contains custom data)
            seriesIndex: 0,
            inRange: {
                color: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#eab308'],
            }
        },
    };

    // Event handlers for the ECharts instance
    const onEvents = {
        'click': (params: any) => {
            if (params.dataType === 'node') {
                handleNodeClick(params.data.id);
            }
        },
        'mouseover': (params: any) => {
            if (params.dataType === 'node') {
                handleNodeHover(params.data.id);
            }
        },
        'mouseout': () => {
            // Use debounce for mouseout too
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
                handleNodeHover(null);
            }, 50);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/50 shadow-2xl overflow-hidden"
            style={{ minHeight: '750px' }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-grid-white/5 bg-[size:20px_20px]"></div>
            </div>

            {/* Visual cues for better navigation */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-[180px] h-[600px] w-[1px] bg-blue-500/15 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-[460px] h-[600px] w-[1px] bg-green-500/15 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-[690px] h-[600px] w-[1px] bg-purple-500/15 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-[940px] h-[600px] w-[1px] bg-orange-500/15 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-[1200px] h-[600px] w-[1px] bg-pink-500/15 transform -translate-y-1/2"></div>
                
                {/* Domain group labels */}
                <div className="absolute top-[130px] left-[180px] text-blue-400/90 text-sm font-semibold transform -translate-x-1/2">Memory</div>
                <div className="absolute top-[130px] left-[460px] text-green-400/90 text-sm font-semibold transform -translate-x-1/2">Thought</div>
                <div className="absolute top-[130px] left-[690px] text-purple-400/90 text-sm font-semibold transform -translate-x-1/2">Workflow</div>
                <div className="absolute top-[130px] left-[940px] text-orange-400/90 text-sm font-semibold transform -translate-x-1/2">Action</div>
                <div className="absolute top-[130px] left-[1200px] text-pink-400/90 text-sm font-semibold transform -translate-x-1/2">Artifact</div>
            </div>

            {/* Ambient particles - Reduced opacity to decrease visual competition */}
            
            {/* Title */}
            <div className="absolute top-0 left-0 p-4 z-20">
                <h2 className="text-xl font-bold text-blue-300 flex items-center">
                    <Server className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Database Schema Diagram</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1 max-w-md">
                    Interactive visualization of the Unified Memory System database schema with relational links
                </p>
            </div>

            {/* Chart */}
            <ReactECharts
                ref={chartRef}
                option={option}
                onEvents={onEvents}
                style={{
                    width: '100%',
                    height: '100%', 
                    minHeight: '750px',
                    paddingTop: '70px',  // Reduced to use more vertical space
                    paddingBottom: '80px',
                    transition: 'all 0.3s ease-out',
                    filter: isAnimating ? 'brightness(1.1)' : 'none',
                }}
                notMerge={true}
                lazyUpdate={false}
                className={`${isAnimating ? 'animate-pulse' : ''}`}
            />

            {/* Move stats panel back to bottom and center */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <div className="bg-slate-900/80 backdrop-blur-sm py-3 px-6 rounded-xl border border-slate-800/60 z-10 shadow-lg">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center">
                            <Database className="w-5 h-5 text-blue-400 mr-2" />
                            <span className="text-sm text-slate-200 whitespace-nowrap">{tables.length} Tables</span>
                        </div>
                        <div className="flex items-center">
                            <Link2 className="w-5 h-5 text-purple-400 mr-2" />
                            <span className="text-sm text-slate-200 whitespace-nowrap">{edges.length} Relationships</span>
                        </div>
                        <div className="flex items-center">
                            <GitBranch className="w-5 h-5 text-green-400 mr-2" />
                            <span className="text-sm text-slate-200 whitespace-nowrap">{Object.keys(domainDescriptions).length} Domains</span>
                        </div>
                        <div className="flex items-center">
                            <Tag className="w-5 h-5 text-yellow-400 mr-2" />
                            <span className="text-sm text-slate-200 whitespace-nowrap">Memory System Schema</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Node Info Panel - Enhanced with more information */}
            {selectedNode && (
                <div className="absolute bottom-24 right-5 bg-slate-900/90 backdrop-blur-sm p-5 rounded-lg border border-slate-700/50 z-10 shadow-xl max-w-sm transform transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-white text-lg flex items-center">
                            {(() => {
                                const nodeDomain = domain(selectedNode);
                                let backgroundColor = '#3b82f6'; // Default blue for Memory

                                switch (nodeDomain) {
                                    case 'Workflow': backgroundColor = '#a855f7'; break;
                                    case 'Action': backgroundColor = '#f97316'; break;
                                    case 'Artifact': backgroundColor = '#ec4899'; break;
                                    case 'Thought': backgroundColor = '#22c55e'; break;
                                    case 'Tag': backgroundColor = '#eab308'; break;
                                }

                                return (
                                    <>
                                        <div
                                            style={{
                                                width: '14px',
                                                height: '14px',
                                                borderRadius: '50%',
                                                backgroundColor,
                                                marginRight: '10px'
                                            }}
                                        />
                                        {selectedNode}
                                    </>
                                );
                            })()}
                        </h3>
                        <span className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-medium">
                            {domain(selectedNode)}
                        </span>
                    </div>

                    <div className="text-sm text-slate-300 mb-4">
                        {domainDescriptions[domain(selectedNode)]}
                    </div>

                    {relatedEdges.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-semibold text-slate-200 mb-2">Relationships:</h4>
                            <div className="max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                <ul className="space-y-2">
                                    {relatedEdges.map(([source, target], idx) => {
                                        // Determine the relationship type
                                        const isParent = source === selectedNode;
                                        const relationLabel = isParent ? "References →" : "← Referenced by";
                                        const relatedNode = isParent ? target : source;
                                        const relatedDomain = domain(relatedNode);
                                        
                                        // Get appropriate color for the related domain
                                        let dotColor = '#3b82f6'; // Default blue
                                        switch (relatedDomain) {
                                            case 'Workflow': dotColor = '#a855f7'; break;
                                            case 'Action': dotColor = '#f97316'; break;
                                            case 'Artifact': dotColor = '#ec4899'; break;
                                            case 'Thought': dotColor = '#22c55e'; break;
                                            case 'Tag': dotColor = '#eab308'; break;
                                        }
                                        
                                        return (
                                            <li key={idx} className="text-sm flex items-center justify-between px-1 py-1 hover:bg-slate-800/30 rounded">
                                                <span className="flex items-center">
                                                    <span 
                                                        className="inline-block w-3 h-3 rounded-full mr-2"
                                                        style={{ backgroundColor: dotColor }}
                                                    ></span>
                                                    <span className="text-slate-300">{relatedNode}</span>
                                                </span>
                                                <span className="text-slate-500 text-xs">{relationLabel}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-4 pt-2 border-t border-slate-800/70 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Click anywhere to deselect</span>
                        <span className="text-xs text-slate-400">Table ID: <span className="text-slate-300 font-mono">{selectedNode}</span></span>
                    </div>
                </div>
            )}

            {/* Add CSS for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 10px;
        }
        
        /* Add this to reduce flickering */
        .echarts-tooltip {
          transition: transform 0.1s ease-out, opacity 0.2s ease-out !important;
          pointer-events: none !important;
          z-index: 9999 !important;
          max-width: 280px !important;
        }
        
        /* Tooltip styles */
        .tooltip-container {
          font-family: 'Inter', sans-serif;
          padding: 3px;
        }
        .tooltip-title {
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        .tooltip-content {
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.4;
        }
        
        /* Reduced opacity for ambient particles */
        .bg-white\\/10 {
          opacity: 0.05 !important;
        }
      `}} />
        </div>
    );
}