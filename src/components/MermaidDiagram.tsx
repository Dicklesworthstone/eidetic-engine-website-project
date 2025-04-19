import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
    idSuffix?: string; // Optional unique suffix if multiple diagrams are on the same page
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, idSuffix = 'default' }) => {
    const [showMarkup, setShowMarkup] = useState(false);
    const [renderedSvg, setRenderedSvg] = useState<string | null>(null); // State for SVG code
    const [error, setError] = useState<string | null>(null); // State for errors
    const mermaidContainerRef = useRef<HTMLDivElement>(null);
    const uniqueId = `mermaid-graph-${idSuffix}-${Math.random().toString(36).substring(7)}`; // Ensure unique ID

    useEffect(() => {
        // Initialize Mermaid (consider doing this once globally if possible)
        mermaid.initialize({
            startOnLoad: false, // We control rendering manually
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
                darkMode: true,
                background: '#1f2937', // bg-gray-800
                mainBkg: '#374151', // bg-gray-700
                primaryColor: '#60a5fa', // text-blue-400
                primaryTextColor: '#d1d5db', // text-gray-300
                primaryBorderColor: '#4b5563', // border-gray-600
                lineColor: '#9ca3af', // text-gray-400
                // Custom class colors from the example - REMOVED as they are defined in the chart string via classDef
                /*
                levelSemanticFill: '#fffde7',
                levelSemanticStroke: '#ffc107',
                levelSemanticColor: '#ffa000',
                levelepisodicFill: '#e8f5e9',
                levelepisodicStroke: '#4caf50',
                levelepisodicColor: '#388e3c',
                */
            }
        });

        let isMounted = true;
        setError(null); // Clear previous errors
        setRenderedSvg(null); // Clear previous SVG on chart change
        const container = mermaidContainerRef.current;

        if (!showMarkup && container) {
            // Clear previous content explicitly before rendering attempt
            container.innerHTML = '<p class="text-gray-400 text-sm italic">Rendering diagram...</p>';

            // Render directly without setTimeout
            try {
                mermaid.render(uniqueId, chart).then(({ svg, bindFunctions }) => {
                    // console.log('Generated Mermaid SVG (for state):', svg); 
                    if (isMounted && container) {
                        // --- Restore original SVG rendering ---
                        // const testSvg = '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" style="fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,0)" /></svg>';
                        // setRenderedSvg(testSvg); 
                        setRenderedSvg(svg); // Use the actual generated SVG
                        // --- End Restore ---

                        if (bindFunctions) {
                            bindFunctions(container);
                        }
                        const svgElement = container.querySelector('svg');
                        if (svgElement) {
                            svgElement.style.maxWidth = '100%';
                            svgElement.style.height = 'auto';
                        }
                    }
                }).catch(renderError => {
                    console.error('Mermaid render promise failed:', renderError);
                    if (isMounted && container) {
                        container.innerHTML = '<p class="text-red-400">Failed to process diagram definition.</p>';
                    }
                });
            } catch (syncError) {
                console.error('Mermaid rendering failed synchronously:', syncError);
                if (isMounted && container) {
                    container.innerHTML = '<p class="text-red-400">Failed to render diagram.</p>';
                }
            }
        }

        return () => {
            isMounted = false;
            // No timerId to clear anymore
        };

    }, [chart, showMarkup, uniqueId]);

    return (
        <div className="mt-4 bg-gray-900/60 p-4 rounded-lg border border-gray-700/30">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-blue-300">Example Visualization</h4>
                <button
                    onClick={() => setShowMarkup(!showMarkup)}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label={showMarkup ? 'Show Diagram' : 'Show Markup'}
                    aria-pressed={showMarkup}
                >
                    {showMarkup ? 'Show Diagram' : 'Show Markup'}
                </button>
            </div>

            {showMarkup ? (
                <div className="text-xs text-gray-300 font-mono bg-gray-900/80 p-3 rounded overflow-x-auto code-scrollbar">
                    <pre className="code-scrollbar overflow-y-auto">{chart}</pre>
                </div>
            ) : (
                <>
                    {!renderedSvg && !error && (
                         <p className="text-gray-400 text-sm italic mb-2">Generating diagram...</p>
                    )}
                    <div 
                        className={`mermaid-render-area flex justify-center items-center bg-gray-800/80 p-3 rounded min-h-[150px] w-full ${!renderedSvg && !error ? 'hidden' : ''}`}
                        aria-label="Mermaid Diagram Container"
                    >
                        {error ? (
                            <p className="text-red-400">{error}</p>
                        ) : renderedSvg ? (
                            <div dangerouslySetInnerHTML={{ __html: renderedSvg }} />
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
};

export default MermaidDiagram;