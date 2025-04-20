'use client';

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import { Database, GitBranch, Link2, Tag } from 'lucide-react';
import dagre from 'dagre';

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

// Node dimensions for layout calculation - balanced
const nodeWidth = 200;
const nodeHeight = 55;

// Layout direction options
type LayoutDirection = 'TB' | 'LR' | 'BT' | 'RL';

/*──────── Calculate optimal layout using dagre ────────*/
function calculateDagreLayout(direction: LayoutDirection = 'TB', focusNodeId?: string) {
    // Use dagre for optimal layout calculation
    const graphlib = dagre.graphlib as any;
    const dagreGraph = new graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    dagreGraph.setGraph({ 
        rankdir: direction, 
        ranker: 'network-simplex',
        align: 'UL',
        nodesep: 250, // Increased from 180 for better horizontal spacing
        ranksep: 250, // Increased from 180 for better vertical spacing
        marginx: 80,  // Slightly more padding
        marginy: 80,
    });

    // Add nodes to dagre
    tables.forEach(table => {
        dagreGraph.setNode(table, { 
            width: nodeWidth, 
            height: nodeHeight 
        });
    });

    // If we have a focus node, prioritize its connections
    if (focusNodeId) {
        // First identify direct connections to the focus node
        const directConnections = new Set<string>();

        fk.forEach(([source, target]) => {
            if (source === focusNodeId) {
                directConnections.add(target);
            }
            if (target === focusNodeId) {
                directConnections.add(source);
            }
        });

        // Add the focus node first
        dagreGraph.setNode(focusNodeId, { 
            width: nodeWidth * 1.2, // Make focus node slightly larger
            height: nodeHeight * 1.2
        });
        
        // Then add direct connection edges with higher weight
        fk.forEach(([source, target]) => {
            if (source === focusNodeId || target === focusNodeId) {
                dagreGraph.setEdge(source, target, { weight: 5 }); // Higher weight for direct connections
            } else if (directConnections.has(source) && directConnections.has(target)) {
                dagreGraph.setEdge(source, target, { weight: 3 }); // Medium weight for connections between direct connections
            } else if (directConnections.has(source) || directConnections.has(target)) {
                dagreGraph.setEdge(source, target, { weight: 2 }); // Lower weight for secondary connections
            } else {
                dagreGraph.setEdge(source, target, { weight: 1 }); // Normal weight for other connections
            }
        });
    } else {
        // Add edges without special weighting if no focus node
        fk.forEach(([source, target]) => {
            dagreGraph.setEdge(source, target);
        });
    }

    // Calculate layout
    dagre.layout(dagreGraph);

    // Get graph dimensions to calculate scaling
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    // Calculate graph boundaries
    tables.forEach(table => {
        const node = dagreGraph.node(table);
        if (node) {
            const x = node.x;
            const y = node.y;
            
            minX = Math.min(minX, x - nodeWidth/2);
            minY = Math.min(minY, y - nodeHeight/2);
            maxX = Math.max(maxX, x + nodeWidth/2);
            maxY = Math.max(maxY, y + nodeHeight/2);
        }
    });
    
    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    
    // Convert dagre layout to node positions
    const nodes = tables.map(table => {
        const nodeWithPosition = dagreGraph.node(table);
        const isFocusNode = table === focusNodeId;
        
        return {
            id: table,
            name: table,
            x: nodeWithPosition.x,
            y: nodeWithPosition.y,
            isFocusNode,
            isDirectConnection: focusNodeId ? false : undefined // Will be set later if needed
        };
    });

    // If focusing on a specific node, identify its direct connections and center the view
    if (focusNodeId) {
        const focusNode = nodes.find(node => node.id === focusNodeId);
        
        if (focusNode) {
            // Identify direct connections for highlighting
            const directConnections = new Set<string>();
            fk.forEach(([source, target]) => {
                if (source === focusNodeId) {
                    directConnections.add(target);
                }
                if (target === focusNodeId) {
                    directConnections.add(source);
                }
            });
            
            // Mark direct connections
            nodes.forEach(node => {
                if (directConnections.has(node.id)) {
                    node.isDirectConnection = true;
                } else {
                    node.isDirectConnection = false;
                }
            });
            
            // Center the focus node (0,0 is the center of our view)
            const centerX = 0;
            const centerY = 0;
            
            // Calculate the offset to move the focus node to center
            const offsetX = centerX - focusNode.x;
            const offsetY = centerY - focusNode.y;
            
            // Apply the offset to all nodes
            nodes.forEach(node => {
                node.x += offsetX;
                node.y += offsetY;
            });
        }
    }

    return { 
        nodes,
        dimensions: {
            width: graphWidth,
            height: graphHeight,
            minX, minY, maxX, maxY
        }
    };
}

/**
 * Determine the best layout direction based on graph structure
 * and container dimensions
 */
function determineBestLayoutDirection(containerWidth: number, containerHeight: number): LayoutDirection {
    // Analyze the graph connections to decide on best direction
    const horizontalConnections = new Set<string>();
    const verticalConnections = new Set<string>();
    
    // Count relationships by domain to determine natural hierarchy
    fk.forEach(([source, target]) => {
        const sourceDomain = domain(source);
        const targetDomain = domain(target);
        
        // If same domain, could be either direction
        if (sourceDomain === targetDomain) {
            verticalConnections.add(`${source}-${target}`);
            horizontalConnections.add(`${source}-${target}`);
        } 
        // Memory and Tag domains tend to be "leaf" nodes (horizontal connections)
        else if (sourceDomain === 'Memory' || targetDomain === 'Memory' || 
                 sourceDomain === 'Tag' || targetDomain === 'Tag') {
            horizontalConnections.add(`${source}-${target}`);
        }
        // Workflow and Action tend to be hierarchical (vertical connections)
        else if ((sourceDomain === 'Workflow' && targetDomain === 'Action') ||
                 (sourceDomain === 'Action' && targetDomain === 'Artifact') ||
                 (sourceDomain === 'Workflow' && targetDomain === 'Thought')) {
            verticalConnections.add(`${source}-${target}`);
        }
        else {
            // Default to vertical organization
            verticalConnections.add(`${source}-${target}`);
        }
    });
    
    // Consider container aspect ratio
    const aspectRatio = containerWidth / containerHeight;
    
    // If more vertical connections and wider container, use TB
    if (verticalConnections.size >= horizontalConnections.size && aspectRatio >= 1) {
        return 'TB';
    }
    // If more horizontal connections and taller container, use LR
    else if (horizontalConnections.size > verticalConnections.size && aspectRatio < 1) {
        return 'LR';
    }
    // For wide containers with more horizontal connections, LR makes sense
    else if (aspectRatio >= 1.5 && horizontalConnections.size > verticalConnections.size / 2) {
        return 'LR';
    }
    // Default to top-bottom for most natural reading
    else {
        return 'TB';
    }
}

/*──────── Build Graph Data (for ECharts) ────────*/
function buildGraph(containerWidth: number, containerHeight: number, focusNodeId?: string, selectedNode?: string | null) {
    // Base node dimensions
    const W = 200, H = 55;
    const padding = 80;
    
    // Apply responsive checks
    const isMobile = containerWidth < 768;
    const isTablet = containerWidth >= 768 && containerWidth < 1024;
    
    // Always use LR for mobile for better spacing
    const direction = isMobile ? 'LR' : determineBestLayoutDirection(containerWidth, containerHeight);
    
    // Get optimally positioned nodes from dagre
    const { nodes: positionedNodes, dimensions } = calculateDagreLayout(direction, focusNodeId);
    
    // Calculate scaling factor based on available space
    const availableWidth = containerWidth - (padding * 2);
    const availableHeight = containerHeight - (padding * 2);
    
    // Calculate width and height ratios
    const widthRatio = availableWidth / dimensions.width;
    const heightRatio = availableHeight / dimensions.height;
    
    // More moderate scaling that balances between too crowded and too spread out
    let scaleFactor = Math.min(widthRatio, heightRatio) * 0.85;
    
    // Set more moderate min/max to prevent extremes
    scaleFactor = Math.max(scaleFactor, 0.4);
    scaleFactor = Math.min(scaleFactor, 0.85);
    
    // Center the graph
    const offsetX = (containerWidth / 2) - ((dimensions.minX + dimensions.maxX) / 2 * scaleFactor);
    const offsetY = (containerHeight / 2) - ((dimensions.minY + dimensions.maxY) / 2 * scaleFactor);
    
    // Create ECharts nodes with the calculated positions
    const nodes = positionedNodes.map(posNode => {
        const id = posNode.id;
            const domainCategory = domain(id);
            const colors = palette[domainCategory];
        const isFocusNode = posNode.isFocusNode;
        const isDirectConnection = posNode.isDirectConnection;
        const isSelected = selectedNode === id && !isFocusNode;

        // More modest size adjustments
        const nameLength = id.length;
        const sizeMultiplier = Math.min(1 + (nameLength / 30), 1.5); // Less aggressive size increase, but increased max multiplier
        
        // Increase size for focus node and its connections
        let sizeW = W * scaleFactor * sizeMultiplier;
        let sizeH = H * scaleFactor;
        let borderWidth = 2;
        let shadowBlur = 15;
        let fontSize = Math.max(12, 14 * scaleFactor);
        
        // Adjust sizes based on importance and focus
        if (isFocusNode) {
            // Significantly larger and more prominent for focus node
            sizeW *= 1.3;
            sizeH *= 1.3;
            borderWidth = 3;
            shadowBlur = 25;
            fontSize = Math.max(14, 16 * scaleFactor);
        } else if (isDirectConnection) {
            // Slightly larger for direct connections
            sizeW *= 1.15;
            sizeH *= 1.15;
            borderWidth = 2.5;
            shadowBlur = 20;
            fontSize = Math.max(13, 15 * scaleFactor);
        } else if (isSelected) {
            // Style for selected but not pinned nodes
            sizeW *= 1.2;
            sizeH *= 1.2;
            borderWidth = 2.5;
            shadowBlur = 22;
            fontSize = Math.max(13, 15 * scaleFactor);
        } else if (['workflows', 'actions', 'artifacts', 'memories'].includes(id)) {
            sizeW *= 1.1;
            sizeH *= 1.1;
            } else if (['tags', 'thought_chains', 'embeddings'].includes(id)) {
            sizeW *= 1.05;
            sizeH *= 1.05;
            }

            return {
                id,
                name: id,
            x: posNode.x * scaleFactor + offsetX,  
            y: posNode.y * scaleFactor + offsetY,
                symbol: 'roundRect',
            symbolSize: [sizeW, sizeH],
            category: domainCategory,
            domainCategory,
            isFocusNode,
            isDirectConnection,
            isSelected,
                itemStyle: {
                    color: 'rgba(15, 21, 36, 0.95)',
                    borderColor: isSelected ? colors.secondary : colors.primary,
                borderWidth: borderWidth,
                shadowBlur: shadowBlur,
                    shadowColor: colors.glow,
                    borderRadius: 18,
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    color: '#f8fafc',
                fontSize: fontSize,
                fontWeight: isFocusNode || isSelected ? 'bolder' : 'bold',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                overflow: 'break', // Allow breaking long names instead of truncating
                width: sizeW * 0.9, // Use more of the node width for text
                ellipsis: '...', // Fallback for very long names
                },
            // Add fixed:true to prevent force layout from moving the nodes
            fixed: true
            };
        });

    // Adjust line styles for better visibility with the spacious layout
    const edges = fk.map(([s, t]) => {
        const sourceDomain = domain(s);
        const targetDomain = domain(t);
        const isSameDomain = sourceDomain === targetDomain;
        const isDomainCrossing = sourceDomain !== targetDomain;
        
        // Check if this edge connects to the focus node or between direct connections
        const isDirectFocusEdge = focusNodeId && (s === focusNodeId || t === focusNodeId);
        const isSecondaryFocusEdge = !isDirectFocusEdge && positionedNodes.some(n => 
            n.id === s && n.isDirectConnection && positionedNodes.some(m => 
                m.id === t && m.isDirectConnection
            )
        );
        
        // Check if edge connects to the selected node
        const isSelectedEdge = selectedNode && (s === selectedNode || t === selectedNode) && !isDirectFocusEdge;
        
        // Compute line style based on focus
        let lineWidth = 2;
        let lineOpacity = isDomainCrossing ? 0.5 : 0.8;
        let curveness = 0.15;
        let shadowBlur = 3;
        let lineType = isDomainCrossing ? 'dashed' : 'solid';
        
        if (isDirectFocusEdge) {
            lineWidth = 3.5;
            lineOpacity = 1;
            curveness = 0.25;
            shadowBlur = 8;
            lineType = 'solid';
        } else if (isSecondaryFocusEdge) {
            lineWidth = 2.5;
            lineOpacity = 0.9;
            curveness = 0.2;
            shadowBlur = 5;
        } else if (isSelectedEdge) {
            lineWidth = 3;
            lineOpacity = 0.9;
            curveness = 0.2;
            shadowBlur = 6;
            lineType = 'solid';
        }

        // Determine edge color
        let lineColor = isSameDomain
            ? palette[sourceDomain].primary
            : '#94a3b8';
        
        // Highlight selected edges more prominently
        if (isSelectedEdge) {
            lineColor = isSameDomain
                ? palette[sourceDomain].secondary
                : '#cbd5e1';
        }

        return {
            source: s,
            target: t,
            sourceDomain,
            targetDomain,
            lineStyle: {
                color: lineColor,
                width: lineWidth,
                opacity: lineOpacity,
                curveness: curveness,
                shadowBlur: shadowBlur,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                type: lineType
            },
            symbol: ['none', 'arrow'],
            symbolSize: 8 * scaleFactor,
        };
    });

    return { 
        nodes, 
        edges,
        direction, // Return the automatically selected direction
        scaleFactor 
    };
}

/*──────────────── component ────────────────*/
export default function DatabaseSchemaDiagram() {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [relatedEdges, setRelatedEdges] = useState<Array<[string, string]>>([]);
    const chartRef = useRef<ReactECharts>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isPinned, setIsPinned] = useState<boolean>(false);
    const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
    
    // Effect to measure container size
    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                const { width, height } = entries[0].contentRect;
                setContainerSize({ width, height });
            });
            
            resizeObserver.observe(containerRef.current);
            
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);
    
    // Calculate relationships for the selected node
    useEffect(() => {
        if (!selectedNode) {
            setRelatedEdges([]);
            return;
        }

        const related = fk.filter(([source, target]) =>
            source === selectedNode || target === selectedNode
        );

        setRelatedEdges(related);
    }, [selectedNode]);

    // Animation effect when node is clicked
    useEffect(() => {
        if (!selectedNode) return;

        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 800);

        return () => clearTimeout(timer);
    }, [selectedNode]);

    // Node click handler
    const handleNodeClick = useCallback((nodeId: string) => {
        setSelectedNode(prev => prev === nodeId ? null : nodeId);
    }, []);

    // Pin handling improved to ensure proper centering and recalculation
    const togglePin = useCallback(() => {
        setIsPinned(prev => {
            const newPinState = !prev;
            
            if (chartRef.current && selectedNode) {
            const instance = chartRef.current.getEchartsInstance();
                
                // Simply clear the instance and let the regular render cycle handle rebuilding
                // This avoids manual option manipulation that was causing errors
                instance.clear();
            }
            
            return newPinState;
        });
    }, [selectedNode]);

    // Improve debounced node hover handling
    const handleNodeHover = useCallback((nodeId: string | null) => {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => setHoveredNode(nodeId), 100);
    }, []);

    // Memoize chart options to prevent unnecessary updates
    const option = useMemo(() => {
        // Build graph with container dimensions and focused node if pinned
        const graph = buildGraph(
            containerSize.width,
            containerSize.height,
            isPinned && selectedNode ? selectedNode : undefined,
            selectedNode
        );

        return {
        backgroundColor: 'transparent',
        tooltip: {
            show: true,
            formatter: (params: any) => {
                if (params.dataType === 'node') {
                    const domainType = params.data.domainCategory;
                    let colorClass = palette[domainType].primary;
                    
                    // Calculate incoming and outgoing relationships
                    const incoming = fk.filter(([_, target]) => target === params.name).length;
                    const outgoing = fk.filter(([source, _]) => source === params.name).length;
                    const total = incoming + outgoing;

                    return [
                        '<div class="tooltip-container">',
                        `<div class="tooltip-title"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${colorClass};margin-right:6px;"></span>${params.name}</div>`,
                        `<div class="tooltip-content">${domainDescriptions[domainType]}</div>`,
                        `<div class="tooltip-stats">`,
                        `<div><span style="color:#94a3b8">Relationships:</span> <span style="color:#f1f5f9;font-weight:600">${total}</span></div>`,
                        `<div><span style="color:#94a3b8;margin-right:5px">↓</span><span style="color:#f1f5f9">${incoming} incoming</span></div>`,
                        `<div><span style="color:#94a3b8;margin-right:5px">↑</span><span style="color:#f1f5f9">${outgoing} outgoing</span></div>`,
                        `</div>`,
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
            layout: 'none',  // No force layout - use pre-calculated positions
            data: graph.nodes,
            edges: graph.edges,
            categories: Object.keys(palette).map(domain => ({
                name: domain,
                itemStyle: {
                    borderColor: palette[domain].primary,
                    color: 'rgba(15, 21, 36, 0.95)',
                }
            })),
            roam: 'scale',  // Enable zooming functionality
            zoom: 0.8,     // Start slightly zoomed out for better overview
            nodeScaleRatio: 0.6,
            focusNodeAdjacency: true,
            draggable: false, // Disable node dragging
            label: {
                show: true,
                position: 'inside',
                fontSize: 13,
                fontWeight: '600',
                color: '#ffffff',
                textShadowColor: 'rgba(0,0,0,0.8)',
                textShadowBlur: 3,
                formatter: '{b}',
                overflow: 'break', // Changed from 'truncate' for consistency
                width: nodeWidth * 0.9 * graph.scaleFactor,
                avoidLabelOverlap: true,
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
            animation: true,
            animationDuration: 500,
            animationEasingUpdate: 'cubicInOut',
            animationThreshold: 200,
            animationDurationUpdate: 500,
            hoverAnimation: false,
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
                scale: 1.02,
                blurScope: 'global',
                itemStyle: {
                    borderWidth: 2.5,
                    shadowBlur: 18,
                    shadowColor: (params: any) => {
                        const domain = params.data.domainCategory;
                        return palette[domain].glow;
                    },
                },
                lineStyle: {
                    width: 2.5,
                    color: (params: any) => {
                        const sourceDomain = params.data.sourceDomain;
                        const targetDomain = params.data.targetDomain;
                        return sourceDomain === targetDomain ?
                            palette[sourceDomain].primary : '#f1f5f9';
                    },
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowColor: 'rgba(255, 255, 255, 0.3)',
                    type: 'solid',
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
        };
    }, [containerSize, isPinned, selectedNode, buildGraph]);

    // Event handlers for the ECharts instance
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
        }
    }), [handleNodeClick, handleNodeHover]);

    // Effect to create ambient particles in the background
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

            {/* Only show the Pin button if a node is selected */}
            {selectedNode && (
                <div className="absolute top-0 right-0 z-30 p-2">
                    <div className="bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg border border-slate-700/40 flex space-x-2">
                        <button
                            onClick={togglePin}
                            className={`p-2 rounded ${isPinned ? 'bg-blue-700' : 'bg-slate-800'} text-white text-xs`}
                            title={isPinned ? "Unpin selected node" : "Pin selected node to center"}
                        >
                            {isPinned ? "Unpin" : "Pin"}
                        </button>
                    </div>
                </div>
            )}

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

            {/* Stats panel */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center px-4">
                <div className="bg-slate-900/80 backdrop-blur-sm py-3 px-4 sm:px-6 rounded-xl border border-slate-800/60 z-10 shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                        <div className="flex items-center">
                            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2" />
                            <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">{tables.length} Tables</span>
                        </div>
                        <div className="flex items-center">
                            <Link2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
                            <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">{fk.length} Relationships</span>
                        </div>
                        <div className="flex items-center">
                            <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2" />
                            <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">{Object.keys(domainDescriptions).length} Domains</span>
                        </div>
                        <div className="flex items-center">
                            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                            <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">Memory System Schema</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Node Info Panel */}
            {selectedNode && (
                <div className="absolute bottom-24 right-5 bg-slate-900/90 backdrop-blur-sm p-5 rounded-lg border border-slate-700/50 z-30 shadow-xl max-w-sm transform transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-white text-lg flex items-center">
                            {(() => {
                                const nodeDomain = domain(selectedNode);
                                let backgroundColor = palette[nodeDomain].primary;

                                return (
                                    <>
                                        <div
                                            className="glow-effect"
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                backgroundColor,
                                                marginRight: '10px',
                                                boxShadow: `0 0 10px ${palette[nodeDomain].glow}`
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

                    {/* Pin Control */}
                    <div className="mb-4 flex items-center">
                        <button
                            onClick={togglePin}
                            className={`w-full py-2 px-3 rounded ${isPinned ? 'bg-blue-700/60 text-blue-100' : 'bg-slate-800/60 text-slate-300'} text-xs flex items-center justify-center transition-colors gap-2`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isPinned ? 'bg-blue-300' : 'bg-slate-500'}`}></div>
                            {isPinned ? "Pinned to Center" : "Pin to Center"}
                        </button>
                    </div>

                    {relatedEdges.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center">
                                <span className="inline-block w-3 h-3 bg-slate-500/30 mr-2 rounded"></span>
                                Relationships ({relatedEdges.length})
                            </h4>
                            <div className="max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                <ul className="space-y-1">
                                    {relatedEdges.map(([source, target], idx) => {
                                        // Determine the relationship type
                                        const isParent = source === selectedNode;
                                        const relationLabel = isParent ? "References →" : "← Referenced by";
                                        const relatedNode = isParent ? target : source;
                                        const relatedDomain = domain(relatedNode);
                                        const dotColor = palette[relatedDomain].primary;
                                        const glowColor = palette[relatedDomain].glow;

                                        return (
                                            <li key={idx} className="text-sm flex items-center justify-between px-2 py-1.5 hover:bg-slate-800/30 rounded group transition-colors">
                                                <span className="flex items-center">
                                                    <span
                                                        className="inline-block w-2.5 h-2.5 rounded-full mr-2 transition-all group-hover:scale-125"
                                                        style={{ 
                                                            backgroundColor: dotColor,
                                                            boxShadow: `0 0 5px ${glowColor}`
                                                        }}
                                                    ></span>
                                                    <span className="text-slate-300 transition-colors group-hover:text-white">
                                                        {relatedNode}
                                                </span>
                                                </span>
                                                <span className="text-slate-500 text-xs bg-slate-800/50 px-1.5 py-0.5 rounded">
                                                    {relationLabel}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Schema Structure Visualization */}
                            <div className="mt-4 pt-3 border-t border-slate-800/50">
                                <h4 className="text-xs font-semibold text-slate-400 mb-2">Schema Position</h4>
                                <div className="relative w-full h-24 bg-slate-900/50 rounded-lg border border-slate-800/30 overflow-hidden">
                                    {/* Mini visualization showing where table fits in schema */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">
                                        <div className="w-full h-full flex items-center justify-center">
                                            {/* Domain indicators */}
                                            {Object.keys(domainDescriptions).map((domainName, i) => {
                                                const isActive = domain(selectedNode) === domainName;
                                                const color = palette[domainName].primary;
                                                const glow = palette[domainName].glow;
                                                
                                                return (
                                                    <div 
                                                        key={i}
                                                        className={`absolute rounded-full transition-all duration-300`}
                                                        style={{
                                                            width: isActive ? '40px' : '15px',
                                                            height: isActive ? '40px' : '15px',
                                                            backgroundColor: isActive ? `${color}30` : 'transparent',
                                                            borderColor: color,
                                                            borderWidth: isActive ? '2px' : '1px',
                                                            boxShadow: isActive ? `0 0 8px ${glow}` : 'none',
                                                            top: `${10 + (i * 15)}%`,
                                                            left: `${10 + ((i % 3) * 30)}%`,
                                                            transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                                            opacity: isActive ? 1 : 0.5,
                                                        }}
                                                    ></div>
                                                );
                                            })}
                                            
                                            {/* Selected table indicator */}
                                            <div className="absolute z-10 shadow-md"
                                                style={{
                                                    backgroundColor: palette[domain(selectedNode)].primary,
                                                    boxShadow: `0 0 10px ${palette[domain(selectedNode)].glow}`,
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 pt-2 border-t border-slate-800/70 flex items-center justify-between">
                        <button 
                            onClick={() => setSelectedNode(null)}
                            className="text-xs text-slate-400 hover:text-white hover:bg-slate-800 px-2 py-1 rounded transition-colors"
                        >
                            Close
                        </button>
                        <span className="text-xs text-slate-400">Table ID: <span className="text-slate-300 font-mono">{selectedNode}</span></span>
                    </div>
                </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute bottom-24 left-5 z-30">
                <div className="bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg border border-slate-700/50 flex flex-col gap-2">
                    <button 
                        onClick={() => {
                            if (chartRef.current) {
                                const instance = chartRef.current.getEchartsInstance();
                                instance.dispatchAction({
                                    type: 'dataZoom',
                                    start: 0,
                                    end: 100,
                                    zoomSize: 10
                                });
                            }
                        }}
                        className="p-2 rounded bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                        title="Zoom In"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    <button 
                        onClick={() => {
                            if (chartRef.current) {
                                const instance = chartRef.current.getEchartsInstance();
                                instance.dispatchAction({
                                    type: 'dataZoom',
                                    start: 0,
                                    end: 100,
                                    zoomSize: -10
                                });
                            }
                        }}
                        className="p-2 rounded bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                        title="Zoom Out"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    <button 
                        onClick={() => {
                            if (chartRef.current) {
                                const instance = chartRef.current.getEchartsInstance();
                                instance.dispatchAction({
                                    type: 'restore'
                                });
                            }
                        }}
                        className="p-2 rounded bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                        title="Reset View"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                    </button>
                </div>
            </div>

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
          margin-bottom: 8px;
        }
        .tooltip-stats {
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          padding-top: 6px;
          font-size: 12px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4px;
        }
        .tooltip-stats div {
          display: flex;
          align-items: center;
        }
        
        /* Reduced opacity for ambient particles */
        .bg-white\\/10 {
          opacity: 0.05 !important;
        }
      `}} />
        </div>
    );
}