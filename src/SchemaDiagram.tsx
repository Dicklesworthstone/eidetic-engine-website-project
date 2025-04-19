'use client';

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import { Database, GitBranch, Link2, Tag } from 'lucide-react';

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

/*──────── Build Graph Data (Force Layout) ────────*/
function buildGraph(nodesWithPositions?: any[]) {
    const W = 180, H = 50; // Increased node size to reduce overlap

    // Use provided positions if available, otherwise build initial structure for force layout
    const nodes = nodesWithPositions ? nodesWithPositions.map((node: any) => ({ ...node })) // Create copy if positions exist
        : tables.map(id => {
            const domainCategory = domain(id);
            const colors = palette[domainCategory];

            // Slightly adjust sizes based on role for visual hierarchy in force layout
            let size = [W, H] as [number, number];
            if (['workflows', 'actions', 'artifacts', 'memories'].includes(id)) {
                size = [W * 1.15, H * 1.15]; // Slightly larger for key tables
            } else if (['tags', 'thought_chains', 'embeddings'].includes(id)) {
                size = [W * 1.05, H * 1.05]; // Slightly larger for secondary tables
            }

            return {
                id,
                name: id,
                // x, y initially undefined for force layout
                symbol: 'roundRect',
                symbolSize: size,
                category: domainCategory, // Use category for grouping/styling if needed
                domainCategory, // Keep for tooltips etc.
                itemStyle: {
                    color: 'rgba(15, 21, 36, 0.95)',
                    borderColor: colors.primary,
                    borderWidth: 2,
                    shadowBlur: 15, // Slightly reduced blur
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
        const isDomainCrossing = sourceDomain !== targetDomain;

        return {
            source: s,
            target: t,
            sourceDomain, // Keep for styling/emphasis
            targetDomain, // Keep for styling/emphasis
            lineStyle: {
                color: isSameDomain
                    ? palette[sourceDomain].primary
                    : '#94a3b8',            // Neutral gray for cross-domain edges
                width: 1.5,
                opacity: isDomainCrossing ? 0.4 : 0.7,
                curveness: 0.12,           // Mild curveness to visually distinguish edges
                shadowBlur: 2,             // Minimal shadow
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                type: isDomainCrossing ? 'dashed' : 'solid' // Solid edges for same domain clarity
            },
            symbol: ['none', 'arrow'],
            symbolSize: 8,
        };
    });

    return { nodes, edges };
}

/*──────────────── component ────────────────*/
export default function DatabaseSchemaDiagram() {
    // Store the fixed node positions in localStorage to persist between renders
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [positionedNodes, setPositionedNodes] = useState<any[] | null>(null);
    const [relatedEdges, setRelatedEdges] = useState<Array<[string, string]>>([]);
    const chartRef = useRef<ReactECharts>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isLayoutFixed, setIsLayoutFixed] = useState(false);
    
    // Store whether layout is finished in a ref to avoid re-renders
    const layoutFinishedRef = useRef(false);

    // Initial graph build only once
    const initialGraph = useMemo(() => buildGraph(), []);

    // Try to load saved positions from localStorage on mount
    useEffect(() => {
        // Clear any existing saved positions to ensure a fresh start every time
        localStorage.removeItem('databaseSchemaNodePositions');
        setPositionedNodes(null);
        layoutFinishedRef.current = false;
    }, []);

    // Capture node positions after force layout and store in localStorage
    const capturePositions = useCallback(() => {
        const chartInstance = chartRef.current?.getEchartsInstance();
        if (!chartInstance) return;
        
        console.log('Capturing node positions...');
        
        try {
            const model = chartInstance['getModel']();
            const series = model.getSeriesByIndex(0);
            const nodeData = series.getData();
            
            const currentNodes = initialGraph.nodes.map((node: any, index: number) => {
                const layout = nodeData.getItemLayout(index);
                if (!layout) return node; // Skip if layout not available
                
                return {
                    ...node,
                    x: layout[0],
                    y: layout[1],
                    // Don't set fixed to true so force layout can still move nodes
                    // but initialize with these positions
                };
            });
            
            // Save nodes with positions to localStorage
            localStorage.setItem('databaseSchemaNodePositions', JSON.stringify(currentNodes));
            
            setPositionedNodes(currentNodes);
            layoutFinishedRef.current = true; // Mark that initial positioning is done
            
            console.log('Node positions captured and saved.');
        } catch (e) {
            console.error('Error capturing positions:', e);
        }
    }, [initialGraph.nodes]);

    // Effect to capture initial layout
    useEffect(() => {
        if (layoutFinishedRef.current || positionedNodes) return; // Skip if already initialized
        
        const chartInstance = chartRef.current?.getEchartsInstance();
        if (!chartInstance) return;
        
        console.log('Attaching force layout finished listener');
        
        const onFinished = () => {
            console.log('Force layout finished event fired');
            // Use setTimeout to ensure layout is truly complete
            setTimeout(() => {
                // Capture initial positions but keep force layout active
                capturePositions();
            }, 500);
        };
        
        chartInstance.on('finished', onFinished);
        
        // Also set a backup timer in case 'finished' event doesn't fire
        const backupTimer = setTimeout(() => {
            console.log('Backup timer fired to capture positions');
            if (!layoutFinishedRef.current) {
                capturePositions();
            }
        }, 5000);
        
        return () => {
            chartInstance.off('finished', onFinished);
            clearTimeout(backupTimer);
        };
    }, [capturePositions, positionedNodes]);

    // Calculate relationships for the selected node (memoized to avoid recalculation)
    useEffect(() => {
        if (!selectedNode) {
            setRelatedEdges([]);
            return;
        }

        const related = initialGraph.edges.filter(edge =>
            edge.source === selectedNode || edge.target === selectedNode
        ).map(edge => [edge.source, edge.target] as [string, string]);

        setRelatedEdges(related);
    }, [selectedNode, initialGraph.edges]);

    // Animation effect when node is clicked
    useEffect(() => {
        if (!selectedNode) return;

        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 800);

        return () => clearTimeout(timer);
    }, [selectedNode]);

    // Improve debounced node hover handling
    const handleNodeHover = useCallback((nodeId: string | null) => {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => setHoveredNode(nodeId), 100);
    }, []);

    // Node click handler
    const handleNodeClick = useCallback((nodeId: string) => {
        setSelectedNode(prev => prev === nodeId ? null : nodeId);
    }, []);

    // Reset button to clear saved layout
    const resetLayout = useCallback(() => {
        // Clear localStorage
        localStorage.removeItem('databaseSchemaNodePositions');
        // Reset state
        setPositionedNodes(null);
        layoutFinishedRef.current = false;
        
        // Force a re-render of the chart with fresh layout
        if (chartRef.current) {
            const instance = chartRef.current.getEchartsInstance();
            if (instance) {
                instance.clear();
                instance.setOption(option, true);
            }
        }
        
        console.log('Layout reset, will generate new force layout');
    }, []);  // Removed option from dependency array to avoid circular reference

    // Memoize chart options to prevent unnecessary updates
    const option = useMemo(() => ({
        backgroundColor: 'transparent',
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
            top: 15,
            left: 'center',
            orient: 'horizontal',
            itemGap: 20,
            itemWidth: 20,
            itemHeight: 12,
            borderRadius: 6,
            padding: [6, 15, 6, 15],
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            borderWidth: 1,
            borderColor: 'rgba(148, 163, 184, 0.2)',
            textStyle: {
                color: '#f8fafc',
                fontSize: 12,
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
            // Always use force layout, even with positioned nodes
            layout: 'force',
            // Use positioned nodes when available, otherwise use initial nodes
            data: positionedNodes || initialGraph.nodes,
            edges: initialGraph.edges,
            categories: Object.keys(palette).map(domain => ({
                name: domain,
                itemStyle: {
                    borderColor: palette[domain].primary,
                    color: 'rgba(15, 23, 42, 0.9)',
                }
            })),
            force: {
                repulsion: 2500,      // Dramatically increased repulsion to push nodes apart
                edgeLength: [350, 400], // Much longer edges for better spacing
                gravity: 0.005,       // Minimal gravity to prevent center clustering
                friction: 0.7,        // Lower friction to allow nodes to move more freely
                layoutAnimation: true,
                initLayout: positionedNodes ? false : true,
                damping: 0.5,         // Less damping to allow nodes to move more freely
            },
            roam: true,
            progressiveThreshold: 5,
            // Increased zoom level for a wider initial view
            zoom: 0.5,
            center: undefined,
            nodeScaleRatio: 0.6,
            focusNodeAdjacency: true,
            draggable: true,
            label: {
                show: true,
                position: 'inside',
                fontSize: 13,
                fontWeight: '600',
                color: '#ffffff',
                textShadowColor: 'rgba(0,0,0,0.8)',
                textShadowBlur: 3,
                formatter: '{b}',
                // Add label overlap avoidance
                overflow: 'truncate',  // Truncate text if needed
                avoidLabelOverlap: true, // Try to avoid label overlap
            },
            edgeLabel: {
                show: false,
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: 8,
            lineStyle: {
                width: 1.5,
                opacity: 0.6,
                curveness: 0.15,
            },
            blur: {
                itemStyle: { opacity: selectedNode ? 0.15 : 0.8 },
                lineStyle: { opacity: selectedNode ? 0.06 : 0.4 },
            },
            // Animation configuration - slower, smoother animations
            animation: true,
            animationDuration: 500,      // Increased from 300 for smoother transitions
            animationEasingUpdate: 'cubicInOut', // Changed from cubicOut for smoother transitions
            animationThreshold: 200,     // Higher threshold to avoid animating small changes
            animationDurationUpdate: 500, // Match the duration for consistency
            hoverAnimation: false,       // Disable hover animation for stability
            selectedMode: 'single',
            progressive: 0,
            select: {
                disabled: false,
                itemStyle: {
                    color: 'rgba(20, 30, 50, 0.9)',
                    borderWidth: 2,
                    borderRadius: 12,
                    borderColor: (params: any) => palette[params.data.domainCategory].primary,
                    shadowBlur: 10,
                    shadowColor: (params: any) => palette[params.data.domainCategory].glow,
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
                scale: 1.02,           // Reduced scale effect (was 1.05)
                blurScope: 'global',
                itemStyle: {
                    borderWidth: 2.5,  // Reduced from 3
                    shadowBlur: 18,    // Reduced from 25
                    shadowColor: (params: any) => {
                        const domain = params.data.domainCategory;
                        return palette[domain].glow;
                    },
                },
                lineStyle: {
                    width: 2.5,        // Reduced from 3
                    color: (params: any) => {
                        // Get source and target domains
                        const sourceDomain = params.data.sourceDomain;
                        const targetDomain = params.data.targetDomain;

                        // If same domain, use domain color, otherwise use white
                        return sourceDomain === targetDomain ?
                            palette[sourceDomain].primary : '#f1f5f9';
                    },
                    opacity: 0.8,      // Reduced from 0.9
                    shadowBlur: 10,    // Reduced from 15
                    shadowColor: 'rgba(255, 255, 255, 0.3)', // Reduced brightness
                    type: 'solid',     // Always solid for emphasized edges
                },
            },
        }],
        visualMap: {
            show: false,
            dimension: 2,
            seriesIndex: 0,
            inRange: {
                color: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#eab308'],
            }
        },
    }), [positionedNodes, initialGraph.nodes, initialGraph.edges, selectedNode, hoveredNode]);

    // Event handlers for the ECharts instance - memoized to prevent recreating on every render
    const onEvents = useMemo(() => ({
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
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
                handleNodeHover(null);
            }, 50);
        },
        // Periodically save node positions during force layout
        'graphroam': () => {
            if (layoutFinishedRef.current) { // Only save after initial layout is done
                if (debounceTimerRef.current !== null) {
                    clearTimeout(debounceTimerRef.current);
                }
                debounceTimerRef.current = setTimeout(() => {
                    capturePositions();
                }, 1000);
            }
        }
    }), [handleNodeClick, handleNodeHover, capturePositions]);

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

            {/* Title */}
            <div className="absolute top-0 left-0 p-4 z-20">
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
                    paddingTop: '70px',
                    paddingBottom: '80px',
                    transition: 'all 0.3s ease-out',
                    filter: isAnimating ? 'brightness(1.1)' : 'none',
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: selectedNode ? 'none' : 'auto', // Disable pointer events when node is selected
                }}
                lazyUpdate={true}
                notMerge={false}
                className={`${isAnimating ? 'animate-pulse' : ''}`}
            />

            {/* Overlay div to handle click-away from selected node */}
            {selectedNode && (
                <div
                    onClick={() => setSelectedNode(null)}
                    className="absolute inset-0 cursor-pointer z-20"
                    style={{ backgroundColor: 'rgba(0,0,0,0.01)' }} // Nearly invisible but still clickable
                />
            )}

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
                            <span className="text-sm text-slate-200 whitespace-nowrap">{initialGraph.edges.length} Relationships</span>
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
                <div className="absolute bottom-24 right-5 bg-slate-900/90 backdrop-blur-sm p-5 rounded-lg border border-slate-700/50 z-30 shadow-xl max-w-sm transform transition-all duration-300 ease-in-out">
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
                        <button 
                            onClick={() => setSelectedNode(null)}
                            className="text-xs text-slate-400 hover:text-white hover:bg-slate-800 px-2 py-1 rounded transition-colors"
                        >
                            Click to close
                        </button>
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