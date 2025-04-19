import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import {
    Database,
    Clock,
    FileText,
    Brain,
    Code,
    Settings,
    CheckSquare,
    Link2,
    Search,
    Activity,
    Server,
    Cpu,
    Zap,
    Eye,
    GitBranch,
    GitMerge,
    BarChart2,
    Box,
    Package,
    List,
    FileCode,
    GitCommit,
    Lock,
    Tag,
    Save,
    RefreshCw,
    CheckCircle,
    Target,
    Upload,
    Play,
    AlertTriangle,
    FlaskConical,
} from 'lucide-react';
import Prism from 'prismjs';
// Import Prism languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import './prism-monokai.css';
import './styles/scrollbars.css';
import AgentArchitectureDiagram from './AgentArchitectureDiagram';
// import mermaid from 'mermaid'; // Import mermaid

// Import our reusable components at the top of the file
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import MobileNavToggle from './components/MobileNavToggle';
// import MermaidDiagram from './components/MermaidDiagram'; // Comment out import

// Lazy load SchemaDiagram component
const DatabaseSchema = lazy(() => import('./SchemaDiagram'));

// Simple loading component for Suspense fallback
const SchemaLoading = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
  </div>
);

// Helper components for consistent styling
const InlineCode = ({ children }) => (
    <code className="mx-1 px-1.5 py-0.5 bg-gray-700/80 rounded text-blue-200 text-[11px] md:text-xs font-mono whitespace-nowrap">
        {children}
    </code>
);

const CodeBlock = ({ children, language = 'python' }) => {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [children]);

    return (
        <div className="my-4 bg-gray-800/80 border border-gray-700/50 rounded-lg overflow-hidden">
            <pre className="p-4 text-[10px] xs:text-xs md:text-sm font-mono overflow-x-auto code-scrollbar">
                <code ref={codeRef} className={`language-${language}`}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

// --- SECTION: Unified Architectural Overview ---
const ArchitecturalOverviewSection = () => (
    <section id="summary" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Architectural Overview and Design Philosophy
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-blue-700/30 shadow-lg">
                    <p>
                        The Unified Memory System (UMS) emerges from a fundamental challenge in AI agent development: creating systems that can maintain context, learn from experiences, understand patterns, and exhibit increasingly human-like cognitive capabilities. Traditional approaches to LLM agent architecture frequently suffer from several limitations:
                    </p>

                    <ol className="space-y-2 list-decimal pl-5 mt-4">
                        <li><strong className="text-blue-300">Context Window Constraints</strong>: LLMs have finite context windows, making long-term memory management essential</li>
                        <li><strong className="text-blue-300">Memory Organization</strong>: Flat memory structures lack the nuanced organization that enables efficient retrieval</li>
                        <li><strong className="text-blue-300">Cognitive Continuity</strong>: Maintaining coherent agent identity and learning across sessions</li>
                        <li><strong className="text-blue-300">Metacognitive Capabilities</strong>: Enabling self-reflection and knowledge consolidation</li>
                    </ol>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/40 p-5 rounded-lg border border-blue-700/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-300 flex items-center">
                                <Brain className="w-5 h-5 mr-2 text-blue-400" /> Memory Hierarchy
                            </h3>
                            <p className="text-sm">
                                Four-tiered memory structure inspired by human cognition: Working Memory (active focus), Episodic Memory (experiences), Semantic Memory (knowledge), and Procedural Memory (skills).
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-5 rounded-lg border border-blue-700/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-300 flex items-center">
                                <GitMerge className="w-5 h-5 mr-2 text-blue-400" /> Associative Design
                            </h3>
                            <p className="text-sm">
                                Rich memory linking with typed relationships, importance/confidence weighting, and temporal dynamics through decay and refreshing patterns.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <GitBranch className="w-5 h-5 mr-2 text-blue-400" /> Integration with Agent Architecture
                        </h3>

                        <div className="flex justify-center mt-6">
                            {/* Added explicit height h-[600px] */}
                            <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-700/50 w-full max-w-3xl h-[600px]">
                                <AgentArchitectureDiagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const MemoryGraphVisualization = () => (
    <div className="relative w-full h-64 md:h-80 bg-gray-900/80 rounded-xl border border-blue-700/30 p-4">
        {/* Central node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                <div className="relative w-12 h-12 bg-blue-900/80 rounded-full border-2 border-blue-500/70 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Database className="w-6 h-6 text-blue-300" />
                </div>
            </div>
        </div>

        {/* Memory nodes */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse delay-300"></div>
                <div className="relative w-10 h-10 bg-green-900/80 rounded-full border-2 border-green-500/70 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-300" />
                </div>
            </div>
            <div className="absolute mt-1 ml-5 bg-gray-900/90 px-2 py-1 rounded text-[10px] xs:text-xs text-green-300 whitespace-nowrap">
                Episodic Memory
            </div>
        </div>

        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-pulse delay-500"></div>
                <div className="relative w-10 h-10 bg-yellow-900/80 rounded-full border-2 border-yellow-500/70 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-yellow-300" />
                </div>
            </div>
            <div className="absolute mt-1 ml-5 bg-gray-900/90 px-2 py-1 rounded text-[10px] xs:text-xs text-yellow-300 whitespace-nowrap">
                Semantic Memory
            </div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse delay-100"></div>
                <div className="relative w-10 h-10 bg-blue-900/80 rounded-full border-2 border-blue-500/70 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-300" />
                </div>
            </div>
            <div className="absolute mt-1 ml-5 bg-gray-900/90 px-2 py-1 rounded text-[10px] xs:text-xs text-blue-300 whitespace-nowrap">
                Working Memory
            </div>
        </div>

        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse delay-700"></div>
                <div className="relative w-10 h-10 bg-purple-900/80 rounded-full border-2 border-purple-500/70 flex items-center justify-center">
                    <Code className="w-5 h-5 text-purple-300" />
                </div>
            </div>
            <div className="absolute mt-1 ml-5 bg-gray-900/90 px-2 py-1 rounded text-[10px] xs:text-xs text-purple-300 whitespace-nowrap">
                Procedural Memory
            </div>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Lines connecting to central node */}
            <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="url(#green-gradient)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="url(#yellow-gradient)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="url(#purple-gradient)" strokeWidth="2" strokeDasharray="5,5" />

            {/* Connection between memories */}
            <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="url(#link-gradient)" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="url(#link-gradient)" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="url(#link-gradient)" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Gradients */}
            <defs>
                <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#64748b" stopOpacity="0.4" />
                </linearGradient>
            </defs>
        </svg>

        <div className="absolute bottom-2 right-2 text-[10px] xs:text-xs text-gray-500">Memory Association Graph</div>
    </div>
);

// SQL Code Display component that handles highlighting internally
const SqlCodeDisplay = ({ sql, sqlRef }: { sql: string, sqlRef: React.RefObject<HTMLElement | null> }) => {
    // Apply syntax highlighting after component mounts or sql changes
    useEffect(() => {
        // Use a small timeout to ensure the DOM is ready
        const timer = setTimeout(() => {
            if (sqlRef.current) {
                Prism.highlightElement(sqlRef.current);
            }
        }, 0);

        // Cleanup the timeout on unmount
        return () => clearTimeout(timer);
    }, [sql, sqlRef]);

    return (
        <code ref={sqlRef} className="language-sql">
            {sql}
        </code>
    );
};

// --- SECTION: System Overview --- 
const SystemOverviewSection = () => (
    <section id="overview" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Database className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> System Overview and Architecture
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <p>
                        The provided code implements a sophisticated <strong className="text-blue-300">Unified Agent Memory and Cognitive System</strong> designed for LLM agents.
                        This system combines a structured memory hierarchy with process tracking, reasoning capabilities, and knowledge management.
                        It's built as an asynchronous Python module using SQLite for persistence with sophisticated memory organization patterns.
                    </p>
                    <p>
                        The system implements a cognitive architecture with four distinct memory levels:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 mt-4">
                        <li className="pl-2"><strong className="text-blue-300">Working Memory:</strong> Temporarily active information (30-minute default TTL)</li>
                        <li className="pl-2"><strong className="text-blue-300">Episodic Memory:</strong> Experiences and event records (7-day default TTL)</li>
                        <li className="pl-2"><strong className="text-blue-300">Semantic Memory:</strong> Knowledge, facts, and insights (30-day default TTL)</li>
                        <li className="pl-2"><strong className="text-blue-300">Procedural Memory:</strong> Skills and procedures (90-day default TTL)</li>
                    </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Server className="w-6 h-6 mr-2 text-blue-400 flex-shrink-0" /> Core Architecture
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <p>
                        The system uses SQLite with optimized configuration through <InlineCode>aiosqlite</InlineCode> for asynchronous operations:
                    </p>

                    <CodeBlock language="python">{`DEFAULT_DB_PATH = os.environ.get("AGENT_MEMORY_DB_PATH", "unified_agent_memory.db")
MAX_TEXT_LENGTH = 64000  # Maximum for text fields
CONNECTION_TIMEOUT = 10.0  # seconds
ISOLATION_LEVEL = None  # SQLite autocommit mode

# Memory management parameters
MAX_WORKING_MEMORY_SIZE = int(os.environ.get("MAX_WORKING_MEMORY_SIZE", "20"))
DEFAULT_TTL = {
    "working": 60 * 30,       # 30 minutes
    "episodic": 60 * 60 * 24 * 7, # 7 days
    "semantic": 60 * 60 * 24 * 30, # 30 days
    "procedural": 60 * 60 * 24 * 90 # 90 days
}
MEMORY_DECAY_RATE = float(os.environ.get("MEMORY_DECAY_RATE", "0.01"))  # Per hour`}</CodeBlock>

                    <p>
                        The system uses various SQLite optimizations through pragmas:
                    </p>

                    <CodeBlock language="python">{`SQLITE_PRAGMAS = [
    "PRAGMA journal_mode=WAL",  # Write-Ahead Logging
    "PRAGMA synchronous=NORMAL",  # Balance durability and performance
    "PRAGMA foreign_keys=ON",
    "PRAGMA temp_store=MEMORY",
    "PRAGMA cache_size=-32000",  # ~32MB cache
    "PRAGMA mmap_size=2147483647",  # Memory-mapped I/O
    "PRAGMA busy_timeout=30000"  # 30-second timeout
]`}</CodeBlock>
                </div>

                <div className="mt-8">
                    <MemoryGraphVisualization />
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Core Memory Operations --- 
const CoreMemoryOperationsSection = () => (
    <section id="core-ops" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Cpu className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Core Memory Operations
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system implements a comprehensive set of operations for memory management through tool functions, each designed with standardized error handling and metrics tracking via decorators (<InlineCode>@with_tool_metrics</InlineCode>, <InlineCode>@with_error_handling</InlineCode>).
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Save className="w-5 h-5 mr-2 text-blue-400" /> Memory Creation and Storage
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <p>
                        The primary function for creating memories is <InlineCode>store_memory()</InlineCode>:
                    </p>

                    <CodeBlock language="python">{`async def store_memory(
    workflow_id: str,
    content: str,
    memory_type: str,
    memory_level: str = MemoryLevel.EPISODIC.value,
    importance: float = 5.0,
    confidence: float = 1.0,
    description: Optional[str] = None,
    reasoning: Optional[str] = None,
    source: Optional[str] = None,
    tags: Optional[List[str]] = None,
    ttl: Optional[int] = None,
    context_data: Optional[Dict[str, Any]] = None,
    generate_embedding: bool = True,
    suggest_links: bool = True,
    link_suggestion_threshold: float = SIMILARITY_THRESHOLD,
    max_suggested_links: int = 3,
    action_id: Optional[str] = None,
    thought_id: Optional[str] = None,
    artifact_id: Optional[str] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Key Steps</h4>
                            <ol className="space-y-1 list-decimal pl-5 text-sm">
                                <li>Validates all input parameters</li>
                                <li>Generates a UUID for the memory</li>
                                <li>Records timestamp</li>
                                <li>Establishes database connections</li>
                                <li>Performs existence checks for foreign keys</li>
                                <li>Inserts the memory record with all metadata</li>
                                <li>Optionally generates vector embeddings</li>
                                <li>Identifies and suggests semantic links</li>
                                <li>Updates workflow timestamps</li>
                                <li>Logs the operation</li>
                            </ol>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Automatic Handling</h4>
                            <ul className="space-y-1 list-disc pl-5 text-sm">
                                <li>Tag normalization and storage</li>
                                <li>TTL determination (using defaults if not specified)</li>
                                <li>Importance and confidence validation</li>
                                <li>Creation of bidirectional links to similar memories</li>
                                <li>Foreign key relationship tracking</li>
                                <li>Error logging and standardized responses</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-blue-400" /> Memory Retrieval and Search
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-blue-300 mb-2">Direct Retrieval</h4>
                            <CodeBlock language="python">{`async def get_memory_by_id(
    memory_id: str,
    include_links: bool = True,
    include_context: bool = True,
    context_limit: int = 5,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Fetches specific memory by ID, updates access statistics, and optionally includes links and context.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-blue-300 mb-2">Criteria-Based Search</h4>
                            <CodeBlock language="python">{`async def query_memories(
    workflow_id: Optional[str] = None,
    memory_level: Optional[str] = None,
    memory_type: Optional[str] = None,
    search_text: Optional[str] = None,
    tags: Optional[List[str]] = None,
    min_importance: Optional[float] = None,
    # ... many more parameters ...
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Provides powerful filtering capabilities with full-text search and custom sorting options.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Link2 className="w-5 h-5 mr-2 text-blue-400" /> Memory Linking and Relationships
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-blue-300 mb-2">Creating Links</h4>
                            <CodeBlock language="python">{`async def create_memory_link(
    source_memory_id: str,
    target_memory_id: str,
    link_type: str,
    strength: float = 1.0,
    description: Optional[str] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Creates directional associations between memories with type classification and strength.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-blue-300 mb-2">Retrieving Links</h4>
                            <CodeBlock language="python">{`async def get_linked_memories(
    memory_id: str,
    direction: str = "both",
    link_type: Optional[str] = None,
    limit: int = 10,
    include_memory_details: bool = True,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Retrieves outgoing and/or incoming links with optional type filtering and memory details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Thought Chains --- 
const ThoughtChainsSection = () => (
    <section id="thoughts" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <GitBranch className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Thought Chains and Reasoning
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system implements a sophisticated thought chain mechanism for tracking reasoning.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <GitCommit className="w-5 h-5 mr-2 text-blue-400" /> Creating Thought Chains
                        </h3>
                        <CodeBlock language="python">{`async def create_thought_chain(
    workflow_id: str,
    title: str,
    initial_thought: Optional[str] = None,
    initial_thought_type: str = "goal",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Creates a container for related thoughts, optionally adding an initial thought (goal, hypothesis, etc.) and ensuring atomicity through transaction management.
                        </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <GitCommit className="w-5 h-5 mr-2 text-blue-400" /> Recording Thoughts
                        </h3>
                        <CodeBlock language="python">{`async def record_thought(
    workflow_id: str,
    content: str,
    thought_type: str = "inference",
    thought_chain_id: Optional[str] = None,
    parent_thought_id: Optional[str] = None,
    relevant_action_id: Optional[str] = None,
    relevant_artifact_id: Optional[str] = None,
    relevant_memory_id: Optional[str] = None,
    db_path: str = DEFAULT_DB_PATH,
    conn: Optional[aiosqlite.Connection] = None
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Records individual reasoning steps, automatically creating semantic memory entries for important thoughts and supporting transaction nesting.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 mt-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-blue-400" /> Thought Chain Visualization
                    </h3>

                    <CodeBlock language="python">{`async def visualize_reasoning_chain(
    thought_chain_id: str,
    output_format: str = "mermaid",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <p className="mt-4 text-sm">
                        Generates visualizations (Mermaid diagrams or JSON) of thought chains, showing hierarchical relationships and connections to other entities.
                    </p>

                    {/* Comment out the MermaidDiagram component usage */}
                    {/* <MermaidDiagram
                        idSuffix="thought-chain-example"
                        chart={`graph TD
    M_abc123["Observation<br/>Column A is numerical<br/>(I: 6.0)"]:::levelepisodic
    M_def456["Observation<br/>Column B is categorical<br/>(I: 6.0)"]:::levelepisodic
    M_ghi789["Insight<br/>Data requires mixed analysis<br/>(I: 7.5)"]:::levelsemantic
    
    M_ghi789 -- generalizes --> M_abc123
    M_ghi789 -- generalizes --> M_def456
    
    classDef levelepisodic fill:#e8f5e9,stroke:#4caf50,color:#388e3c,stroke-width:1px;
    classDef levelsemantic fill:#fffde7,stroke:#ffc107,color:#ffa000,stroke-width:1px;`}
                    /> */}

                    {/* Restore original static code block */}
                    <div className="mt-4 bg-gray-900/60 p-4 rounded-lg border border-gray-700/30">
                         <h4 className="font-semibold text-blue-300 mb-2 text-center">Example Mermaid Output</h4>
                         <div className="text-xs text-gray-300 font-mono bg-gray-900/80 p-3 rounded overflow-x-auto code-scrollbar">
                             <pre className="code-scrollbar overflow-y-auto">{`graph TD
    M_abc123["Observation<br/>Column A is numerical<br/>(I: 6.0)"]:::levelepisodic
    M_def456["Observation<br/>Column B is categorical<br/>(I: 6.0)"]:::levelepisodic
    M_ghi789["Insight<br/>Data requires mixed analysis<br/>(I: 7.5)"]:::levelsemantic
    
    M_ghi789 -- generalizes --> M_abc123
    M_ghi789 -- generalizes --> M_def456
    
    classDef levelepisodic fill:#e8f5e9,stroke:#4caf50,color:#388e3c,stroke-width:1px;
    classDef levelsemantic fill:#fffde7,stroke:#ffc107,color:#ffa000,stroke-width:1px;`}</pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Working Memory --- 
const WorkingMemorySection = () => (
    <section id="working-memory" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Clock className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Working Memory Management
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system implements sophisticated working memory with capacity management.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Eye className="w-5 h-5 mr-2 text-blue-400" /> Working Memory Access
                        </h3>
                        <CodeBlock language="python">{`async def get_working_memory(
    context_id: str,
    include_content: bool = True,
    include_links: bool = True,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Retrieves the current active memory set, updates access statistics, and returns a structured view of working memory.
                        </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-blue-400" /> Focus Management
                        </h3>
                        <CodeBlock language="python">{`async def focus_memory(
    memory_id: str,
    context_id: str,
    add_to_working: bool = True,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Sets a specific memory as the current focus of attention, optionally adding it to working memory if not present.
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-400" /> Working Memory Optimization
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <CodeBlock language="python">{`async def optimize_working_memory(
    context_id: str,
    target_size: int = MAX_WORKING_MEMORY_SIZE,
    strategy: str = "balanced",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Optimization Strategies</h4>
                            <ul className="space-y-1 list-disc pl-5 text-sm">
                                <li><strong className="text-blue-200">balanced</strong>: Considers all relevance factors</li>
                                <li><strong className="text-blue-200">importance</strong>: Prioritizes importance scores</li>
                                <li><strong className="text-blue-200">recency</strong>: Prioritizes recently accessed memories</li>
                                <li><strong className="text-blue-200">diversity</strong>: Ensures variety of memory types</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Implementation</h4>
                            <p className="text-sm">
                                Scores memories based on strategy, selects optimal subset to retain, and updates the cognitive state.
                            </p>
                            <p className="text-sm mt-2">
                                When capacity is reached, computes relevance scores for all memories and removes least relevant memory to make space.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2 text-blue-400" /> Automatic Focus Updating
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <CodeBlock language="python">{`async def auto_update_focus(
    context_id: str,
    recent_actions_count: int = 3,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <p className="mt-4 text-sm">
                        Implements automatic attention shifting through sophisticated heuristics that analyze memories in working memory, score them based on relevance and recent activity, and update focus to the highest-scoring memory.
                    </p>

                    <div className="mt-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                        <h4 className="font-semibold text-blue-300 mb-2">Focus Scoring Factors</h4>
                        <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>Base relevance (importance, confidence, recency, usage)</li>
                            <li>Boost for relationship to recent actions</li>
                            <li>Type-based boosts for attention-worthy types (questions, plans, insights)</li>
                            <li>Memory level boosts (semantic and procedural get priority)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Cognitive State --- 
const CognitiveStateSection = () => (
    <section id="cog-state" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Cognitive State Management
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system implements cognitive state persistence for context restoration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Save className="w-5 h-5 mr-2 text-blue-400" /> Saving Cognitive State
                        </h3>
                        <CodeBlock language="python">{`async def save_cognitive_state(
    workflow_id: str,
    title: str,
    working_memory_ids: List[str],
    focus_area_ids: Optional[List[str]] = None,
    context_action_ids: Optional[List[str]] = None,
    current_goal_thought_ids: Optional[List[str]] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Validates IDs, marks previous states as not latest, serializes state components, and records a timestamped cognitive state snapshot.
                        </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Play className="w-5 h-5 mr-2 text-blue-400" /> Loading Cognitive State
                        </h3>
                        <CodeBlock language="python">{`async def load_cognitive_state(
    workflow_id: str,
    state_id: Optional[str] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Loads either a specific state or the latest state, deserializes state components, and logs the operation.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 mt-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-blue-400" /> Context Building
                    </h3>

                    <CodeBlock language="python">{`async def get_workflow_context(
    workflow_id: str,
    recent_actions_limit: int = 10,
    important_memories_limit: int = 5,
    key_thoughts_limit: int = 5,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <p className="mt-4 text-sm">
                        Builds a comprehensive context summary including workflow metadata, latest cognitive state, recent actions, important memories, and key thoughts (goals, decisions, reflections).
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Meta-Cognition --- 
const MetaCognitiveSection = () => (
    <section id="metacognition" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Zap className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Meta-Cognitive Capabilities
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system implements sophisticated meta-cognitive functions that allow the agent to reflect on and improve its own knowledge and operations.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <GitMerge className="w-5 h-5 mr-2 text-blue-400" /> Memory Consolidation
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <CodeBlock language="python">{`async def consolidate_memories(
    workflow_id: Optional[str] = None,
    target_memories: Optional[List[str]] = None,
    consolidation_type: str = "summary",
    query_filter: Optional[Dict[str, Any]] = None,
    max_source_memories: int = 20,
    prompt_override: Optional[str] = None,
    provider: str = LLMGatewayProvider.OPENAI.value,
    model: Optional[str] = None,
    store_result: bool = True,
    store_as_level: str = MemoryLevel.SEMANTIC.value,
    store_as_type: Optional[str] = None,
    max_tokens: int = 1000,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Consolidation Types</h4>
                            <ul className="space-y-1 list-disc pl-5 text-sm">
                                <li><strong className="text-blue-200">summary</strong>: Comprehensive integration</li>
                                <li><strong className="text-blue-200">insight</strong>: Pattern recognition</li>
                                <li><strong className="text-blue-200">procedural</strong>: Generalized steps/methods</li>
                                <li><strong className="text-blue-200">question</strong>: Information gaps</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Implementation</h4>
                            <p className="text-sm">
                                The consolidation process:
                            </p>
                            <ol className="mt-2 space-y-1 list-decimal pl-5 text-sm">
                                <li>Selects source memories</li>
                                <li>Generates LLM prompt with detailed instructions</li>
                                <li>Makes external LLM API calls</li>
                                <li>Stores results as new memory</li>
                                <li>Creates bidirectional links to source memories</li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                        <h4 className="font-semibold text-blue-300 mb-2">Prompt Generation</h4>
                        <CodeBlock language="python">{`def _generate_consolidation_prompt(memories: List[Dict], consolidation_type: str) -> str:
    # Format memory details with truncation
    # Add type-specific instructions:
    
    if consolidation_type == "summary":
        base_prompt += """TASK: Create a comprehensive and coherent summary...
        [detailed instructions for summarization]
        """
    elif consolidation_type == "insight":
        base_prompt += """TASK: Generate high-level insights...
        [detailed instructions for insight generation]
        """
    # Additional consolidation types...`}</CodeBlock>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-400" /> Reflection Generation
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <CodeBlock language="python">{`async def generate_reflection(
    workflow_id: str,
    reflection_type: str = "summary",
    recent_ops_limit: int = 30,
    provider: str = LLMGatewayProvider.OPENAI.value,
    model: Optional[str] = None,
    max_tokens: int = 1000,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Reflection Types</h4>
                            <ul className="space-y-1 list-disc pl-5 text-sm">
                                <li><strong className="text-blue-200">summary</strong>: Overview of recent activity</li>
                                <li><strong className="text-blue-200">progress</strong>: Analysis of goal advancement</li>
                                <li><strong className="text-blue-200">gaps</strong>: Knowledge and understanding deficits</li>
                                <li><strong className="text-blue-200">strengths</strong>: Effective patterns and insights</li>
                                <li><strong className="text-blue-200">plan</strong>: Strategic next steps</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Implementation</h4>
                            <p className="text-sm">
                                The reflection process:
                            </p>
                            <ol className="mt-2 space-y-1 list-decimal pl-5 text-sm">
                                <li>Analyzes recent memory operations</li>
                                <li>Formats operations with context information</li>
                                <li>Generates type-specific prompts</li>
                                <li>Makes external LLM calls for analysis</li>
                                <li>Stores the reflection in the system</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" /> Memory Promotion and Evolution
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <CodeBlock language="python">{`async def promote_memory_level(
    memory_id: str,
    target_level: Optional[str] = None,
    min_access_count_episodic: int = 5,
    min_confidence_episodic: float = 0.8,
    min_access_count_semantic: int = 10,
    min_confidence_semantic: float = 0.9,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Promotion Paths</h4>
                            <ul className="space-y-1 list-disc pl-5 text-sm">
                                <li><strong className="text-blue-200">Episodic → Semantic</strong>: Experiences to knowledge</li>
                                <li><strong className="text-blue-200">Semantic → Procedural</strong>: Knowledge to skills (with type constraints)</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Promotion Criteria</h4>
                            <ul className="space-y-1 list-disc pl-5 text-sm">
                                <li>Access frequency (demonstrates importance)</li>
                                <li>Confidence level (demonstrates reliability)</li>
                                <li>Memory type (suitability for procedural level)</li>
                                <li>Configurable thresholds for each promotion path</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Vector Embeddings --- 
const VectorEmbeddingsSection = () => (
    <section id="embeddings" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Search className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Vector Embeddings and Semantic Search
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system integrates with an external embedding service:
                </p>

                <CodeBlock language="python">{`# Embedding configuration
DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSION = 384  # For the default model
SIMILARITY_THRESHOLD = 0.75`}</CodeBlock>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                            <Upload className="w-4 h-4 mr-2" /> Embedding Storage
                        </h4>
                        <p className="text-sm">
                            The <InlineCode>_store_embedding()</InlineCode> function:
                        </p>
                        <ul className="mt-2 space-y-1 list-disc pl-5 text-sm">
                            <li>Generates embeddings with error handling</li>
                            <li>Stores vector embeddings as binary BLOBs</li>
                            <li>Links to memory records</li>
                            <li>Handles model metadata</li>
                        </ul>
                    </div>

                    <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                            <Search className="w-4 h-4 mr-2" /> Semantic Search
                        </h4>
                        <p className="text-sm">
                            The <InlineCode>_find_similar_memories()</InlineCode> function:
                        </p>
                        <ul className="mt-2 space-y-1 list-disc pl-5 text-sm">
                            <li>Performs semantic search with cosine similarity</li>
                            <li>Implements filtering and thresholds</li>
                            <li>Updates access statistics</li>
                            <li>Integrates with scikit-learn for similarity calculations</li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-400" /> Hybrid Search
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <p>
                        The <InlineCode>hybrid_search_memories()</InlineCode> function combines both vector and keyword searches:
                    </p>
                    <CodeBlock language="python">{`async def hybrid_search_memories(
    query: str,
    workflow_id: Optional[str] = None,
    limit: int = 10,
    offset: int = 0,
    semantic_weight: float = 0.6,
    keyword_weight: float = 0.4,
    memory_level: Optional[str] = None,
    memory_type: Optional[str] = None,
    tags: Optional[List[str]] = None,
    min_importance: Optional[float] = None,
    max_importance: Optional[float] = None,
    min_confidence: Optional[float] = None,
    min_created_at_unix: Optional[int] = None,
    max_created_at_unix: Optional[int] = None,
    include_content: bool = True,
    include_links: bool = False,
    link_direction: str = "outgoing",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                    <p className="mt-4 text-sm">
                        This sophisticated search function combines semantic and keyword search results, normalizes and weights scores, applies comprehensive filtering, and returns hybrid-scored results.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Memory Relevance --- 
const MemoryRelevanceSection = () => (
    <section id="relevance" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Activity className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Memory Relevance System
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The memory relevance system determines which memories are most important in a given context,
                    prioritizing them for retrieval and reasoning. It combines multiple factors to calculate an
                    effective relevance score, balancing semantic similarity with other metrics.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <BarChart2 className="w-5 h-5 mr-2 text-blue-400" /> Relevance Factors
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-blue-700/30">
                    <p className="mb-4">
                        Multiple factors contribute to a memory's relevance score:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                                <Search className="w-4 h-4 mr-2" /> Semantic Similarity
                            </h4>
                            <p className="text-sm">
                                Vector space distance between the query and memory embedding, typically using cosine similarity.
                            </p>
                            <CodeBlock language="python">{`# Cosine similarity calculation
dot_product = sum(a * b for a, b in zip(query_vector, memory_vector))
norm_a = math.sqrt(sum(a * a for a in query_vector))
norm_b = math.sqrt(sum(b * b for b in memory_vector))
        
if norm_a == 0 or norm_b == 0:
    return 0.0
        
similarity_score = dot_product / (norm_a * norm_b)`}</CodeBlock>
                        </div>

                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                                <Target className="w-4 h-4 mr-2" /> Importance Score
                            </h4>
                            <p className="text-sm">
                                The intrinsic importance value assigned to the memory (1.0-10.0 scale).
                            </p>
                            <CodeBlock language="python">{`# From memories table
importance REAL DEFAULT 5.0,  -- Relevance score (1.0-10.0)

# Usage in relevance calculation
effective_score = base_score * (importance / 5.0)  # Normalize around 5`}</CodeBlock>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                                <Clock className="w-4 h-4 mr-2" /> Recency Factor
                            </h4>
                            <p className="text-sm">
                                How recently the memory was created or accessed, with newer memories given higher weight.
                            </p>
                            <CodeBlock language="python">{`# Calculate recency factor
hours_old = (current_time - memory_timestamp) / 3600
recency_factor = math.exp(-RECENCY_DECAY_RATE * hours_old)

# Apply to relevance score
effective_score = base_score * recency_factor`}</CodeBlock>
                        </div>

                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                                <RefreshCw className="w-4 h-4 mr-2" /> Usage Frequency
                            </h4>
                            <p className="text-sm">
                                How often the memory has been accessed or used in reasoning, with frequently accessed memories prioritized.
                            </p>
                            <CodeBlock language="python">{`# From memories table
access_count INTEGER DEFAULT 0,

# Usage boost factor
usage_factor = min(1.0 + (access_count / 10), 2.0)  # Cap at 2x boost

# Apply to relevance score
effective_score = base_score * usage_factor`}</CodeBlock>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-400" /> Relevance Calculation
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <p>
                        The system combines multiple factors to calculate a final relevance score:
                    </p>

                    <CodeBlock language="python">{`def calculate_relevance_score(
    similarity_score: float,
    importance: float = 5.0,
    confidence: float = 1.0,
    created_at: int = None,
    last_accessed: int = None,
    access_count: int = 0,
    current_time: int = None
) -> float:
    """
    Calculate the overall relevance score for a memory
    
    Args:
        similarity_score: Base semantic similarity (0-1)
        importance: Memory importance rating (1-10)
        confidence: Confidence in the memory (0-1)
        created_at: Unix timestamp of creation
        last_accessed: Unix timestamp of last access
        access_count: Number of times memory accessed
        current_time: Current unix timestamp
        
    Returns:
        Float relevance score
    """
    # Start with the similarity score as the base
    score = similarity_score
    
    # Apply importance factor (normalized around 5.0)
    score *= (importance / 5.0)
    
    # Apply confidence factor
    score *= confidence
    
    # Apply recency factors if timestamps available
    if current_time and created_at:
        # Calculate hours since creation
        hours_old = (current_time - created_at) / 3600
        creation_recency = math.exp(-MEMORY_DECAY_RATE * hours_old)
        score *= max(creation_recency, 0.5)  # Limit decay to 50%
    
    if current_time and last_accessed:
        # Calculate hours since last access
        hours_since_access = (current_time - last_accessed) / 3600
        access_recency = math.exp(-ACCESS_DECAY_RATE * hours_since_access)
        score *= max(access_recency, 0.7)  # Limit decay to 70%
    
    # Apply usage frequency factor
    usage_factor = min(1.0 + (access_count / 10), 2.0)  # Cap at 2x boost
    score *= usage_factor
    
    return score`}</CodeBlock>

                    <div className="mt-6">
                        <h4 className="font-semibold text-blue-300 mb-2">Implementing in Memory Operations</h4>
                        <p className="text-sm mb-2">
                            The relevance system is incorporated throughout memory operations:
                        </p>
                        <ul className="text-sm space-y-1 list-disc pl-5">
                            <li>Query results are sorted by calculated relevance</li>
                            <li>Similar memory suggestions use relevance thresholds</li>
                            <li>Working memory prioritizes high-relevance items when capacity is reached</li>
                            <li>Cognitive state focuses on the most relevant active memories</li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <GitBranch className="w-5 h-5 mr-2 text-blue-400" /> Context-Aware Relevance
                </h3>

                <div className="bg-gradient-to-br from-blue-900/30 to-gray-900/30 p-6 rounded-xl border border-blue-700/30">
                    <p className="mb-4">
                        The system implements context-aware relevance mechanisms:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-900/40 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-300 mb-2">Task Context</h4>
                            <p className="text-sm">
                                Memories related to the current workflow and task are prioritized through explicit filtering.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-300 mb-2">Memory Network Effects</h4>
                            <p className="text-sm">
                                Memories with strong links to currently active memories receive boosted relevance scores.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-300 mb-2">Adaptive Thresholds</h4>
                            <p className="text-sm">
                                Similarity thresholds adjust based on query characteristics and result set size for optimal recall.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Database Schema --- 
interface DatabaseSchemaSectionProps {
    selectedTable: string | null;
    setSelectedTable: (table: string | null) => void;
    sqlCodeRef: React.RefObject<HTMLElement | null>;
    getTableDefinition: (tableName: string | null) => string;
    getTableColorClass: (tableName: string | null) => string;
    getTableColorTextClass: (tableName: string | null) => string;
    getTableColorBgClass: (tableName: string | null) => string;
    getTableColorBorderClass: (tableName: string | null) => string;
    getTableGradientClass: (tableName: string | null) => string;
    getTableCategory: (tableName: string | null) => string;
    getTableKeyFields: (tableName: string | null) => { name: string; description: string; }[];
    getTableRelationships: (tableName: string | null) => { field: string; description: string; }[];
    getTableFeatures: (tableName: string | null) => { field: string; description: string; }[];
}

const DatabaseSchemaSection: React.FC<DatabaseSchemaSectionProps> = ({
    selectedTable,
    setSelectedTable,
    sqlCodeRef,
    getTableDefinition,
    getTableColorClass,
    getTableColorTextClass,
    getTableColorBgClass,
    getTableColorBorderClass,
    getTableGradientClass,
    getTableCategory,
    getTableKeyFields,
    getTableRelationships,
    getTableFeatures
}) => (
    <section id="schema" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Server className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Database Schema
            </h2>

            {/* Schema overview with improved interactive diagram */}
            <div className="relative mb-8 overflow-hidden p-6">
                <Suspense fallback={<SchemaLoading />}>
                    <DatabaseSchema />
                </Suspense>
            </div>

            {/* Table categories with selectable tables */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                    <Database className="w-5 h-5 mr-2" /> Core Table Architecture
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Memory tables */}
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-5 transition-all duration-300 shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-lg text-blue-300 flex items-center">
                                <Database className="w-5 h-5 mr-2 text-blue-400" /> Memory Storage
                            </h4>
                            <span className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded-full">4 Tables</span>
                        </div>

                        <div className="space-y-3">
                            {/* Selectable table button - memories */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('memories')}
                            >
                                <div className="mr-3 p-2 bg-blue-900/40 rounded-lg">
                                    <Database className="w-4 h-4 text-blue-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-blue-200">memories</div>
                                    <div className="text-xs text-gray-400">Core memory storage and metadata (24 columns)</div>
                                </div>
                                {selectedTable === 'memories' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - memory_links */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('memory_links')}
                            >
                                <div className="mr-3 p-2 bg-blue-900/40 rounded-lg">
                                    <Link2 className="w-4 h-4 text-blue-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-blue-200">memory_links</div>
                                    <div className="text-xs text-gray-400">Associative memory connections with typed relationships</div>
                                </div>
                                {selectedTable === 'memory_links' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - embeddings */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('embeddings')}
                            >
                                <div className="mr-3 p-2 bg-blue-900/40 rounded-lg">
                                    <Search className="w-4 h-4 text-blue-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-blue-200">embeddings</div>
                                    <div className="text-xs text-gray-400">Vector embeddings for semantic search</div>
                                </div>
                                {selectedTable === 'embeddings' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - memory_fts */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('memory_fts')}
                            >
                                <div className="mr-3 p-2 bg-blue-900/40 rounded-lg">
                                    <FileCode className="w-4 h-4 text-blue-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-blue-200">memory_fts</div>
                                    <div className="text-xs text-gray-400">FTS5 virtual table for full-text search</div>
                                </div>
                                {selectedTable === 'memory_fts' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Workflow tables */}
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-5 transition-all duration-300 shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-lg text-purple-300 flex items-center">
                                <CheckSquare className="w-5 h-5 mr-2 text-purple-400" /> Action Tracking
                            </h4>
                            <span className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded-full">5 Tables</span>
                        </div>

                        <div className="space-y-3">
                            {/* Selectable table button - workflows */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-purple-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('workflows')}
                            >
                                <div className="mr-3 p-2 bg-purple-900/40 rounded-lg">
                                    <Box className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-purple-200">workflows</div>
                                    <div className="text-xs text-gray-400">High-level goal and context containers</div>
                                </div>
                                {selectedTable === 'workflows' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - actions */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-purple-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('actions')}
                            >
                                <div className="mr-3 p-2 bg-purple-900/40 rounded-lg">
                                    <CheckSquare className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-purple-200">actions</div>
                                    <div className="text-xs text-gray-400">Detailed agent actions with status tracking</div>
                                </div>
                                {selectedTable === 'actions' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - artifacts */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-purple-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('artifacts')}
                            >
                                <div className="mr-3 p-2 bg-purple-900/40 rounded-lg">
                                    <FileText className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-purple-200">artifacts</div>
                                    <div className="text-xs text-gray-400">Created outputs and documents</div>
                                </div>
                                {selectedTable === 'artifacts' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - dependencies */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-purple-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('dependencies')}
                            >
                                <div className="mr-3 p-2 bg-purple-900/40 rounded-lg">
                                    <GitBranch className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-purple-200">dependencies</div>
                                    <div className="text-xs text-gray-400">Action dependency relationships</div>
                                </div>
                                {selectedTable === 'dependencies' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                )}
                            </button>
                            {/* Add button for tags here */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-purple-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('tags')}
                            >
                                <div className="mr-3 p-2 bg-purple-900/40 rounded-lg">
                                    <Tag className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-purple-200">tags & junctions</div>
                                    <div className="text-xs text-gray-400">Categorization system and links</div>
                                </div>
                                {selectedTable === 'tags' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cognitive architecture tables */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-300 flex items-center">
                    <Brain className="w-5 h-5 mr-2" /> Cognitive Architecture Tables
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Thought processing */}
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-5 transition-all duration-300 shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-lg text-green-300 flex items-center">
                                <GitBranch className="w-5 h-5 mr-2 text-green-400" /> Reasoning System
                            </h4>
                            <span className="bg-green-900/30 text-green-300 text-xs px-2 py-1 rounded-full">3 Tables</span>
                        </div>

                        <div className="space-y-3">
                            {/* Selectable table button - thought_chains */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-green-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('thought_chains')}
                            >
                                <div className="mr-3 p-2 bg-green-900/40 rounded-lg">
                                    <GitBranch className="w-4 h-4 text-green-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-green-200">thought_chains</div>
                                    <div className="text-xs text-gray-400">Organized reasoning processes</div>
                                </div>
                                {selectedTable === 'thought_chains' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - thoughts */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-green-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('thoughts')}
                            >
                                <div className="mr-3 p-2 bg-green-900/40 rounded-lg">
                                    <GitCommit className="w-4 h-4 text-green-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-green-200">thoughts</div>
                                    <div className="text-xs text-gray-400">Individual reasoning steps and insights</div>
                                </div>
                                {selectedTable === 'thoughts' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - reflections */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-green-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('reflections')}
                            >
                                <div className="mr-3 p-2 bg-green-900/40 rounded-lg">
                                    <Zap className="w-4 h-4 text-green-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-green-200">reflections</div>
                                    <div className="text-xs text-gray-400">Meta-cognitive analysis</div>
                                </div>
                                {selectedTable === 'reflections' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Cognitive state */}
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-5 transition-all duration-300 shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-lg text-yellow-300 flex items-center">
                                <Activity className="w-5 h-5 mr-2 text-yellow-400" /> State Management
                            </h4>
                            <span className="bg-yellow-900/30 text-yellow-300 text-xs px-2 py-1 rounded-full">3 Tables</span>
                        </div>

                        <div className="space-y-3">
                            {/* Selectable table button - cognitive_states */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-yellow-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('cognitive_states')}
                            >
                                <div className="mr-3 p-2 bg-yellow-900/40 rounded-lg">
                                    <Brain className="w-4 h-4 text-yellow-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-yellow-200">cognitive_states</div>
                                    <div className="text-xs text-gray-400">Snapshots of agent mental state</div>
                                </div>
                                {selectedTable === 'cognitive_states' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                                    </div>
                                )}
                            </button>

                            {/* Selectable table button - memory_operations */}
                            <button
                                className="w-full flex items-center bg-gray-900/60 hover:bg-yellow-900/20 p-3 rounded-lg transition-colors duration-300 group relative"
                                onClick={() => setSelectedTable('memory_operations')}
                            >
                                <div className="mr-3 p-2 bg-yellow-900/40 rounded-lg">
                                    <List className="w-4 h-4 text-yellow-300" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-yellow-200">memory_operations</div>
                                    <div className="text-xs text-gray-400">Log of memory system activities</div>
                                </div>
                                {selectedTable === 'memory_operations' && (
                                    <div className="absolute right-3">
                                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                                    </div>
                                )}
                            </button>

                            {/* Removed duplicate working_memory and focus_areas buttons as they were conceptual */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Table Definition Display */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-blue-700/30 shadow-xl p-6 mb-8 relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

                <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center relative z-10">
                    <Database className="w-5 h-5 mr-2 text-blue-400" />
                    {selectedTable ? `Table Definition: ${selectedTable}` : 'Select a table to view details'}
                </h3>

                <div className="relative z-10">
                    {selectedTable ? (
                        <>
                            <div className="flex items-center mb-3 text-sm">
                                <div className="flex-1 flex items-center">
                                    <div className={`w-3 h-3 ${getTableColorClass(selectedTable)} rounded-full mr-2`}></div>
                                    <span className={`${getTableColorTextClass(selectedTable)} font-semibold`}>{selectedTable}</span>
                                </div>
                                <div className={`px-2 py-0.5 ${getTableColorBgClass(selectedTable)} rounded text-xs ${getTableColorTextClass(selectedTable)}`}>
                                    {getTableCategory(selectedTable)}
                                </div>
                            </div>

                            <div className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r ${getTableGradientClass(selectedTable)} opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300`}></div>

                                <pre className="relative z-10 p-4 bg-gray-900/80 rounded-lg border border-gray-700/50 text-[10px] xs:text-xs md:text-sm font-mono overflow-x-auto code-scrollbar max-h-96 overflow-y-auto">
                                    {/* Use SqlCodeDisplay component here */}
                                    <SqlCodeDisplay sql={getTableDefinition(selectedTable)} sqlRef={sqlCodeRef} />
                                </pre>

                                <div className="absolute right-3 top-3">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-2 h-2 bg-red-500 rounded-full opacity-70"></div>
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-70"></div>
                                        <div className="w-2 h-2 bg-green-500 rounded-full opacity-70"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Table Details */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className={`${getTableColorBgClass(selectedTable)} rounded-lg p-3 border ${getTableColorBorderClass(selectedTable)} overflow-y-auto max-h-48 code-scrollbar`}>
                                    <h4 className="text-sm font-bold mb-2 text-blue-300 flex items-center">
                                        <Tag className="w-4 h-4 mr-1.5" /> Key Fields
                                    </h4>
                                    <ul className="text-xs space-y-1.5 text-gray-300">
                                        {getTableKeyFields(selectedTable).map((field, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className={`${getTableColorTextClass(selectedTable)} font-mono mr-2`}>{field.name}</span>
                                                <span>{field.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={`${getTableColorBgClass(selectedTable)} rounded-lg p-3 border ${getTableColorBorderClass(selectedTable)} overflow-y-auto max-h-48 code-scrollbar`}>
                                    <h4 className="text-sm font-bold mb-2 text-blue-300 flex items-center">
                                        <GitBranch className="w-4 h-4 mr-1.5" /> Relationships
                                    </h4>
                                    <ul className="text-xs space-y-1.5 text-gray-300">
                                        {getTableRelationships(selectedTable).map((relation, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className={`${getTableColorTextClass(selectedTable)} font-mono mr-2`}>{relation.field}</span>
                                                <span>{relation.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={`${getTableColorBgClass(selectedTable)} rounded-lg p-3 border ${getTableColorBorderClass(selectedTable)} overflow-y-auto max-h-48 code-scrollbar`}>
                                    <h4 className="text-sm font-bold mb-2 text-blue-300 flex items-center">
                                        <Activity className="w-4 h-4 mr-1.5" /> System Features
                                    </h4>
                                    <ul className="text-xs space-y-1.5 text-gray-300">
                                        {getTableFeatures(selectedTable).map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className={`${getTableColorTextClass(selectedTable)} font-mono mr-2`}>{feature.field}</span>
                                                <span>{feature.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-10 flex flex-col items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded-lg">
                            <Database className="w-12 h-12 mb-3 opacity-50" />
                            <p className="text-center">Select a table from above to view its schema definition and details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Database features section */}
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-bold mb-5 text-blue-300 flex items-center">
                    <Server className="w-5 h-5 mr-2 text-blue-400" /> Advanced Database Features
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 hover:bg-blue-900/20 rounded-lg p-4 border border-gray-700/50 hover:border-blue-700/30 transition-colors duration-300 shadow-sm group">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
                            <GitBranch className="w-5 h-5 text-blue-300" />
                        </div>
                        <h4 className="font-medium text-blue-300 mb-2">Circular References</h4>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            Deferred constraints for complex bidirectional relationships between memories and thoughts
                        </p>
                    </div>

                    <div className="bg-gray-800/50 hover:bg-blue-900/20 rounded-lg p-4 border border-gray-700/50 hover:border-blue-700/30 transition-colors duration-300 shadow-sm group">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
                            <Zap className="w-5 h-5 text-blue-300" />
                        </div>
                        <h4 className="font-medium text-blue-300 mb-2">Performance Optimization</h4>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            Comprehensive indexing for fast retrieval and efficient query patterns
                        </p>
                    </div>

                    <div className="bg-gray-800/50 hover:bg-blue-900/20 rounded-lg p-4 border border-gray-700/50 hover:border-blue-700/30 transition-colors duration-300 shadow-sm group">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
                            <Tag className="w-5 h-5 text-blue-300" />
                        </div>
                        <h4 className="font-medium text-blue-300 mb-2">Hierarchical Tagging</h4>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            Junction tables with advanced taxonomy support for content classification
                        </p>
                    </div>

                    <div className="bg-gray-800/50 hover:bg-blue-900/20 rounded-lg p-4 border border-gray-700/50 hover:border-blue-700/30 transition-colors duration-300 shadow-sm group">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
                            <Search className="w-5 h-5 text-blue-300" />
                        </div>
                        <h4 className="font-medium text-blue-300 mb-2">Advanced Search</h4>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            FTS5 virtual table for high-performance full-text search capabilities
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Action Tracking --- 
const ActionTrackingSection = () => (
    <section id="tracking" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <CheckSquare className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Action and Artifact Tracking
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system tracks all agent actions and created artifacts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Play className="w-5 h-5 mr-2 text-blue-400" /> Action Recording
                        </h3>
                        <CodeBlock language="python">{`async def record_action_start(
    workflow_id: str,
    action_type: str,
    reasoning: str,
    tool_name: Optional[str] = None,
    tool_args: Optional[Dict[str, Any]] = None,
    title: Optional[str] = None,
    parent_action_id: Optional[str] = None,
    tags: Optional[List[str]] = None,
    related_thought_id: Optional[str] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Records the start of an action, validates references, creates a corresponding episodic memory entry, and processes tags.
                        </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-blue-400" /> Action Completion
                        </h3>
                        <CodeBlock language="python">{`async def record_action_completion(
    action_id: str,
    status: str = "completed",
    tool_result: Optional[Any] = None,
    summary: Optional[str] = None,
    conclusion_thought: Optional[str] = None,
    conclusion_thought_type: str = "inference",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        <p className="mt-4 text-sm">
                            Records tool execution result, updates action record, adds concluding thought if provided, and updates linked episodic memory with outcome.
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" /> Artifact Management
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="overflow-y-auto max-h-80 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Recording Artifacts</h4>
                            <CodeBlock language="python">{`async def record_artifact(
    workflow_id: str,
    name: str,
    artifact_type: str,
    action_id: Optional[str] = None,
    description: Optional[str] = None,
    path: Optional[str] = None,
    content: Optional[str] = None,
    metadata: Optional[Dict[str, Any]] = None,
    is_output: bool = False,
    tags: Optional[List[str]] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                        </div>

                        <div className="overflow-y-auto max-h-80 code-scrollbar">
                            <h4 className="font-semibold text-blue-300 mb-2">Retrieving Artifacts</h4>
                            <CodeBlock language="python">{`async def get_artifacts(
    workflow_id: str,
    artifact_type: Optional[str] = None,
    tag: Optional[str] = None,
    is_output: Optional[bool] = None,
    include_content: bool = False,
    limit: int = 10,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Lists artifacts for a workflow with filtering options and controls inclusion of large content.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                        <h4 className="font-semibold text-blue-300 mb-2">Key Features</h4>
                        <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>Handles content truncation for large text artifacts</li>
                            <li>Creates corresponding episodic memory entries</li>
                            <li>Records relationships to creating action</li>
                            <li>Applies tags and metadata</li>
                            <li>Advanced filtering options for retrieval</li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                    <GitBranch className="w-5 h-5 mr-2 text-blue-400" /> Action Dependencies
                </h3>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-blue-300 mb-2">Adding Dependencies</h4>
                            <CodeBlock language="python">{`async def add_action_dependency(
    source_action_id: str,
    target_action_id: str,
    dependency_type: str = "requires",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Creates explicit dependency relationship between actions, ensuring they belong to the same workflow.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-blue-300 mb-2">Getting Dependencies</h4>
                            <CodeBlock language="python">{`async def get_action_dependencies(
    action_id: str,
    direction: str = "downstream",
    dependency_type: Optional[str] = None,
    include_details: bool = False,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>
                            <p className="mt-2 text-sm">
                                Retrieves dependencies in either direction (upstream/downstream) with optional type filtering.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Reporting --- 
const ReportingSection = () => (
    <section id="reporting" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <BarChart2 className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Reporting and Visualization
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system implements sophisticated reporting capabilities for insight and transparency.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 overflow-y-auto max-h-96 code-scrollbar">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-blue-400" /> Workflow Reports
                        </h3>

                        <CodeBlock language="python">{`async def generate_workflow_report(
    workflow_id: str,
    report_format: str = "markdown",
    include_details: bool = True,
    include_thoughts: bool = True,
    include_artifacts: bool = True,
    style: Optional[str] = "professional",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="bg-gray-900/50 p-2 rounded-lg text-center">
                                <p className="text-xs font-medium text-blue-300">Formats</p>
                                <div className="mt-1 grid grid-cols-1 gap-1">
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">markdown</div>
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">html</div>
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">json</div>
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">mermaid</div>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 p-2 rounded-lg text-center">
                                <p className="text-xs font-medium text-blue-300">Styles</p>
                                <div className="mt-1 grid grid-cols-1 gap-1">
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">professional</div>
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">concise</div>
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">narrative</div>
                                    <div className="text-xs bg-gray-900/80 p-1 rounded">technical</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 overflow-y-auto max-h-96 code-scrollbar">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <GitMerge className="w-5 h-5 mr-2 text-blue-400" /> Memory Network Visualization
                        </h3>

                        <CodeBlock language="python">{`async def visualize_memory_network(
    workflow_id: Optional[str] = None,
    center_memory_id: Optional[str] = None,
    depth: int = 1,
    max_nodes: int = 30,
    memory_level: Optional[str] = None,
    memory_type: Optional[str] = None,
    output_format: str = "mermaid",
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                        <p className="mt-4 text-sm">
                            Creates a visual representation of memory relationships using breadth-first search. The Mermaid diagram shows nodes styled by memory level and links showing relationship types.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 mt-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                        <BarChart2 className="w-5 h-5 mr-2 text-blue-400" /> System Statistics {/* Use BarChart2 */}
                    </h3>

                    <CodeBlock language="python">{`async def compute_memory_statistics(
    workflow_id: Optional[str] = None,
    db_path: str = DEFAULT_DB_PATH
) -> Dict[str, Any]:`}</CodeBlock>

                    <div className="mt-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 overflow-y-auto max-h-64 code-scrollbar">
                        <h4 className="font-semibold text-blue-300 mb-2">Collected Metrics</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="text-xs bg-gray-900/80 p-2 rounded">Total memory counts</div>
                            <div className="text-xs bg-gray-900/80 p-2 rounded">Distribution by level and type</div>
                            <div className="text-xs bg-gray-900/80 p-2 rounded">Confidence and importance averages</div>
                            <div className="text-xs bg-gray-900/80 p-2 rounded">Temporal metrics (newest/oldest)</div>
                            <div className="text-xs bg-gray-900/80 p-2 rounded">Link statistics by type</div>
                            <div className="text-xs bg-gray-900/80 p-2 rounded">Tag frequencies</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Type System ---
const TypeSystemSection = () => (
    <section id="types" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Package className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Type System and Enumerations
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The code defines comprehensive type hierarchies through enumerations:
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-blue-400" /> Workflow and Action Status
                        </h3>
                        <CodeBlock language="python">{`class WorkflowStatus(str, Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    FAILED = "failed"
    ABANDONED = "abandoned"

class ActionStatus(str, Enum):
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"`}</CodeBlock>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <List className="w-5 h-5 mr-2 text-blue-400" /> Content Classification
                        </h3>
                        <CodeBlock language="python">{`class ActionType(str, Enum):
    TOOL_USE = "tool_use"
    REASONING = "reasoning"
    PLANNING = "planning"
    RESEARCH = "research"
    ANALYSIS = "analysis"
    DECISION = "decision"
    OBSERVATION = "observation"
    REFLECTION = "reflection"
    # ...more types...

class ArtifactType(str, Enum):
    FILE = "file"
    TEXT = "text"
    IMAGE = "image"
    TABLE = "table"
    CHART = "chart"
    CODE = "code"
    # ...more types...`}</CodeBlock>
</div>
                    </div>

                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 mt-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-blue-400" /> Memory System Types
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <CodeBlock language="python">{`class MemoryLevel(str, Enum):
    WORKING = "working"
    EPISODIC = "episodic"
    SEMANTIC = "semantic"
    PROCEDURAL = "procedural"

class MemoryType(str, Enum):
    OBSERVATION = "observation"
    ACTION_LOG = "action_log"
    TOOL_OUTPUT = "tool_output"
    ARTIFACT_CREATION = "artifact_creation"
    REASONING_STEP = "reasoning_step"
    FACT = "fact"
    INSIGHT = "insight"
    PLAN = "plan"
    # ...many more types...`}</CodeBlock>
                        </div>
                        <div>
                            <CodeBlock language="python">{`class LinkType(str, Enum):
    RELATED = "related"
    CAUSAL = "causal"
    SEQUENTIAL = "sequential"
    HIERARCHICAL = "hierarchical"
    CONTRADICTS = "contradicts"
    SUPPORTS = "supports"
    GENERALIZES = "generalizes"
    SPECIALIZES = "specializes"
    FOLLOWS = "follows"
    PRECEDES = "precedes"
    TASK = "task"
    REFERENCES = "references"`}</CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Connection Management --- 
const ConnectionManagementSection = () => (
    <section id="connection" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Link2 className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Connection Management
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The database connection is managed through a sophisticated singleton pattern:
                </p>

                <CodeBlock language="python">{`class DBConnection:
    """Context manager for database connections using aiosqlite."""

    _instance: Optional[aiosqlite.Connection] = None 
    _lock = asyncio.Lock()
    _db_path_used: Optional[str] = None
    _init_lock_timeout = 15.0  # seconds
    
    # Methods for connection management, initialization, transaction handling, etc.`}</CodeBlock>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                            <Lock className="w-4 h-4 mr-2" /> Key Features
                        </h4>
                        <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>Asynchronous context manager pattern</li>
                            <li>Lock-protected singleton initialization</li>
                            <li>Transaction context manager with automatic commit/rollback</li>
                            <li>Schema initialization on first connection</li>
                            <li>Custom SQLite function registration</li>
                        </ul>
                    </div>

                    <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                            <RefreshCw className="w-4 h-4 mr-2" /> Transaction Management
                        </h4>
                        <CodeBlock language="python">{`@contextlib.asynccontextmanager
async def transaction(self):
    """Atomic transaction block."""
    conn = await self.__aenter__()
    try:
        await conn.execute("BEGIN")
        yield conn
    except Exception:
        await conn.rollback()
        raise
    else:
        await conn.commit()`}</CodeBlock>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Utility Functions --- 
const UtilityFunctionsSection = () => (
    <section id="utilities" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Utility Functions
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <p>
                    The system includes several utility classes and functions:
                </p>

                <CodeBlock language="python">{`def to_iso_z(ts: float) -> str:
    """Converts Unix timestamps to ISO-8601 with Z suffix."""
    # Implementation

class MemoryUtils:
    """Utility methods for memory operations."""
    
    @staticmethod
    def generate_id() -> str:
        """Generate a unique UUID V4 string for database records."""
        return str(uuid.uuid4())
    
    # Methods for serialization, validation, sequence generation, etc.`}</CodeBlock>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-blue-300 mb-2">Additional Utilities</h4>
                        <ul className="space-y-1 list-disc pl-5 text-sm">
                            <li>JSON serialization with error handling and truncation</li>
                            <li>SQL identifier validation to prevent injection</li>
                            <li>Tag processing to maintain taxonomies</li>
                            <li>Access tracking to update statistics</li>
                            <li>Operation logging for audit trails</li>
                        </ul>
                    </div>

                    <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-blue-300 mb-2">Error Handling Decorators</h4>
                        <CodeBlock language="python">{`@with_tool_metrics
@with_error_handling
async def function_name(...):
    # Implementation`}</CodeBlock>
                        <p className="mt-2 text-sm">
                            Provides standardized error handling, metrics tracking, and consistent result formatting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Addendum --- 
const AddendumSection = () => (
    <section id="addendum-details" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <List className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> Addendum: Additional Technical Insights
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-gray-700/50 shadow-lg">
                    <p>Further details supplementing the core technical analysis:</p>

                    <div className="mt-8 bg-gray-900/50 p-4 rounded-xl border border-gray-700/40">
                        <h3 className="text-lg font-bold mb-3 text-gray-200 flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-gray-400" /> Configuration and Environment Variables
                        </h3>
                        <p className="text-sm mb-3">
                            UMS behavior is configurable via environment variables (e.g., <InlineCode>UMS_DB_PATH</InlineCode>, <InlineCode>UMS_EMBEDDING_MODEL</InlineCode>). Default values are provided for ease of setup.
                        </p>
                        {/* Removed code-scrollbar class from the pre element below */}
                        <pre className="p-4 text-xs md:text-sm font-mono overflow-x-auto bg-gray-800/80 border border-gray-700/50 rounded-lg">
                            <code className="language-bash">
                                {`export UMS_DB_PATH="./data/ums_database.db"
export UMS_EMBEDDING_MODEL="sentence-transformers/all-MiniLM-L6-v2"
export UMS_RELEVANCE_THRESHOLD=0.75
export UMS_WORKING_MEMORY_SIZE=20
export UMS_REFLECTION_INTERVAL_SECONDS=3600`}
                            </code>
                        </pre>
                    </div>

                    <div className="mt-8 bg-gray-900/50 p-4 rounded-xl border border-gray-700/40">
                        <h3 className="text-lg font-bold mb-3 text-gray-200 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2 text-gray-400" /> Error Handling and Logging
                        </h3>
                        <p className="text-sm mb-3">
                            Standard Python logging configured. Errors are logged with context. Specific exceptions (e.g., <InlineCode>MemoryNotFoundError</InlineCode>) are raised for callers to handle.
                        </p>
                        <CodeBlock language="python">
                            {`try:
    memory = ums.retrieve_memory(memory_id="invalid-id")
except MemoryNotFoundError as e:
    logger.error(f"Memory retrieval failed: {e}")
    # Handle error gracefully`}
                        </CodeBlock>
                    </div>

                    <div className="mt-8 bg-gray-900/50 p-4 rounded-xl border border-gray-700/40">
                        <h3 className="text-lg font-bold mb-3 text-gray-200 flex items-center">
                            <FlaskConical className="w-4 h-4 mr-2 text-gray-400" /> Testing and Validation
                        </h3>
                        <p className="text-sm mb-3">
                            Includes a test suite using <InlineCode>pytest</InlineCode> covering core operations, edge cases, and integration points. Ensures stability and correctness.
                        </p>
                        <CodeBlock language="bash">
                            {`pytest tests/unit/
pytest tests/integration/`}
                        </CodeBlock>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
// --- SECTION: Addendum --- - Restored Content End

// --- Canonical Section Definition ---

// Map section IDs to their details
    const SECTION_DETAILS = {
    'summary': {
        id: 'summary',
        name: 'Architectural Overview',
        icon: <Eye className="w-4 h-4" />,
        component: ArchitecturalOverviewSection,
    },
    'overview': {
        id: 'overview',
        name: 'System Overview',
        icon: <Database className="w-4 h-4" />,
        component: SystemOverviewSection,
    },
    'schema': {
        id: 'schema',
            name: 'Database Schema',
        icon: <Server className="w-4 h-4" />,
            component: DatabaseSchemaSection,
        requiresProps: true, // Flag for special prop handling
    },
    'relevance': {
        id: 'relevance',
        name: 'Relevance Calculation',
        icon: <Activity className="w-4 h-4" />,
        component: MemoryRelevanceSection,
    },
    'core-ops': {
        id: 'core-ops',
        name: 'Core Memory Operations',
        icon: <Cpu className="w-4 h-4" />,
        component: CoreMemoryOperationsSection,
    },
    'thoughts': {
        id: 'thoughts',
        name: 'Thought Chains',
        icon: <GitBranch className="w-4 h-4" />,
        component: ThoughtChainsSection,
    },
    'working-memory': {
        id: 'working-memory',
        name: 'Working Memory',
        icon: <Clock className="w-4 h-4" />,
        component: WorkingMemorySection,
    },
    'cog-state': {
        id: 'cog-state',
        name: 'Cognitive State',
        icon: <Brain className="w-4 h-4" />,
        component: CognitiveStateSection,
    },
    'metacognition': {
        id: 'metacognition',
        name: 'Meta-Cognition',
        icon: <Zap className="w-4 h-4" />,
        component: MetaCognitiveSection,
    },
    'embeddings': {
        id: 'embeddings',
        name: 'Vector Embeddings',
        icon: <Search className="w-4 h-4" />,
        component: VectorEmbeddingsSection,
    },
    'tracking': {
        id: 'tracking',
            name: 'Action Tracking',
        icon: <CheckSquare className="w-4 h-4" />,
            component: ActionTrackingSection,
        },
    'reporting': {
        id: 'reporting',
            name: 'Reporting',
        icon: <BarChart2 className="w-4 h-4" />,
            component: ReportingSection,
        },
    'types': {
        id: 'types',
            name: 'Type System',
        icon: <Package className="w-4 h-4" />,
            component: TypeSystemSection,
    },
    'connection': {
        id: 'connection',
        name: 'Connection Management',
        icon: <Link2 className="w-4 h-4" />,
        component: ConnectionManagementSection,
    },
    'utilities': {
        id: 'utilities',
        name: 'Utility Functions',
        icon: <Settings className="w-4 h-4" />,
        component: UtilityFunctionsSection,
    },
    'addendum-details': {
        id: 'addendum-details',
        name: 'Addendum',
        icon: <List className="w-4 h-4" />,
        component: AddendumSection,
    }
};

// Define the canonical order of sections using their IDs
const SECTION_ORDER = [
    'summary', // Start with Architectural Overview
    'schema',
    'relevance',
    'overview',
    'core-ops',
    'thoughts',
    'working-memory',
    'cog-state',
    'metacognition',
    'embeddings',
    'tracking',
    'reporting',
    'types',
    'connection',
    'utilities',
    'addendum-details',
];

// --- End Canonical Section Definition ---


// Main component to display the UMS Technical Analysis
// Define the sections in the desired order
// REMOVED OLD HARDCODED sections array
// const sections = [
//     { id: 'overview', component: SystemOverviewSection },
//     { id: 'schema', component: DatabaseSchemaSection, requiresProps: true }, // Mark that this needs props
//     { id: 'relevance', component: MemoryRelevanceSection },
//     { id: 'core-ops', component: CoreMemoryOperationsSection },
//     { id: 'thoughts', component: ThoughtChainsSection },
//     { id: 'working-memory', component: WorkingMemorySection },
//     { id: 'cog-state', component: CognitiveStateSection },
//     { id: 'metacognition', component: MetaCognitiveSection },
//     { id: 'embeddings', component: VectorEmbeddingsSection },
//     { id: 'tracking', component: ActionTrackingSection },
//     { id: 'reporting', component: ReportingSection },
//     { id: 'types', component: TypeSystemSection },
//     { id: 'connection', component: ConnectionManagementSection },
//     { id: 'utilities', component: UtilityFunctionsSection },
//     { id: 'addendum-details', component: AddendumSection },
//     { id: 'summary', component: ArchitecturalOverviewSection },
// ];

const UmsTechnicalAnalysis = () => {
    // State for navigation
    const [activeSection, setActiveSection] = useState<string>(SECTION_ORDER[0]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showNavigation, setShowNavigation] = useState(true);
    const sqlCodeRef = useRef<HTMLElement | null>(null); // Keep sqlCodeRef
    // Remove previous refs for scroll handling
    // const previousActiveSectionRef = useRef<string>(SECTION_ORDER[0]);
    // const previousScrollProgressRef = useRef<number>(0);

    // Handle initial navigation state and resize events
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowNavigation(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle scroll for progress bar and active section
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
            setScrollProgress(currentProgress); // Revert to direct update

            // Update active section based on scroll position
            const scrollOffset = window.innerHeight * 0.4;
            let currentActive = SECTION_ORDER[0]; 
            for (const sectionId of SECTION_ORDER) {
                const element = document.getElementById(sectionId);
                if (element && element.offsetTop <= window.scrollY + scrollOffset) {
                    currentActive = sectionId;
                } else {
                    break;
                }
            }
            setActiveSection(currentActive); // Revert to direct update
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); 

        return () => window.removeEventListener('scroll', handleScroll);
    // Revert dependency array back to empty (or original dependencies if known, likely empty)
    }, []); 

    // Scroll to section helper
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 60;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close navigation on mobile after clicking
            if (window.innerWidth < 768) {
                setShowNavigation(false);
            }
        }
    };

    // State management for selected table - Restored
    const [selectedTable, setSelectedTable] = useState<string | null>("thought_chains");

    // Helper functions to get table-specific styling - Restored
    function getTableColorClass(tableName) {
        const categories = {
            memories: 'bg-blue-500',
            memory_links: 'bg-blue-500',
            embeddings: 'bg-blue-500',
            memory_fts: 'bg-blue-500',
            workflows: 'bg-purple-500',
            actions: 'bg-purple-500',
            artifacts: 'bg-purple-500',
            dependencies: 'bg-purple-500',
            thought_chains: 'bg-green-500',
            thoughts: 'bg-green-500',
            reflections: 'bg-green-500',
            cognitive_states: 'bg-yellow-500',
            working_memory: 'bg-yellow-500',
            focus_areas: 'bg-yellow-500'
        };
        return categories[tableName] || 'bg-gray-500';
    }

    function getTableColorTextClass(tableName) {
        if (!tableName) return 'text-gray-400';

        if (tableName.match(/memor/)) return 'text-blue-300';
        if (tableName.match(/work|action|artifact|depend/)) return 'text-purple-300';
        if (tableName.match(/thought|reflect/)) return 'text-green-300';
        if (tableName.match(/cognitive|focus/)) return 'text-yellow-300';
        return 'text-gray-300';
    }

    function getTableColorBgClass(tableName) {
        if (!tableName) return 'bg-gray-900/40';

        if (tableName.match(/memor/)) return 'bg-blue-900/20';
        if (tableName.match(/work|action|artifact|depend/)) return 'bg-purple-900/20';
        if (tableName.match(/thought|reflect/)) return 'bg-green-900/20';
        if (tableName.match(/cognitive|focus/)) return 'bg-yellow-900/20';
        return 'bg-gray-900/40';
    }

    function getTableColorBorderClass(tableName) {
        if (!tableName) return 'border-gray-700/50';

        if (tableName.match(/memor/)) return 'border-blue-700/30';
        if (tableName.match(/work|action|artifact|depend/)) return 'border-purple-700/30';
        if (tableName.match(/thought|reflect/)) return 'border-green-700/30';
        if (tableName.match(/cognitive|focus/)) return 'border-yellow-700/30';
        return 'border-gray-700/50';
    }

    function getTableGradientClass(tableName) {
        if (!tableName) return 'from-blue-600/20 to-purple-600/20';

        if (tableName.match(/memor/)) return 'from-blue-600/20 to-blue-700/20';
        if (tableName.match(/work|action|artifact|depend/)) return 'from-purple-600/20 to-purple-700/20';
        if (tableName.match(/thought|reflect/)) return 'from-green-600/20 to-green-700/20';
        if (tableName.match(/cognitive|focus/)) return 'from-yellow-600/20 to-yellow-700/20';
        return 'from-blue-600/20 to-purple-600/20';
    }

    function getTableCategory(tableName) {
        if (!tableName) return 'Unknown';

        if (tableName.match(/memor/)) return 'Memory Storage';
        if (tableName.match(/work|action|artifact/)) return 'Action Tracking';
        if (tableName.match(/depend/)) return 'Dependencies';
        if (tableName.match(/thought|reflect/)) return 'Reasoning System';
        if (tableName.match(/cognitive|focus/)) return 'State Management';
        return 'System Table';
    }

    // Sample data for displaying table details - Restored
    function getTableKeyFields(tableName) {
        const fields = {
            memories: [
                { name: 'memory_id', description: 'UUID v4 primary key' },
                { name: 'memory_level', description: 'Working, Episodic, Semantic, Procedural' },
                { name: 'memory_type', description: 'Content classification (24+ types)' }
            ],
            memory_links: [
                { name: 'link_id', description: 'UUID v4 primary key' },
                { name: 'link_type', description: 'Relationship classification' },
                { name: 'strength', description: 'Relationship importance (0-1)' }
            ],
            // Add more tables as needed...
            workflows: [
                { name: 'workflow_id', description: 'UUID v4 primary key' },
                { name: 'title', description: 'Human-readable workflow name' },
                { name: 'status', description: 'Active, Completed, Failed, etc.' }
            ],
            actions: [
                { name: 'action_id', description: 'UUID v4 primary key' },
                { name: 'action_type', description: 'Tool use, reasoning, planning, etc.' },
                { name: 'status', description: 'In progress, completed, failed' }
            ],
            thought_chains: [
                { name: 'chain_id', description: 'UUID v4 primary key' },
                { name: 'title', description: 'Reasoning process description' },
                { name: 'created_at', description: 'Timestamp of creation' }
            ]
        };

        // Provide default fields if table not found
        return fields[tableName] || [
            { name: 'id', description: 'Primary key' },
            { name: 'type', description: 'Classification' },
            { name: 'created_at', description: 'Creation timestamp' }
        ];
    }

    function getTableRelationships(tableName) {
        const relationships = {
            memories: [
                { field: 'workflow_id', description: 'Parent workflow (cascading)' },
                { field: 'embedding_id', description: 'Associated vector embedding' },
                { field: 'action_id', description: 'Source action reference' }
            ],
            memory_links: [
                { field: 'source_memory_id', description: 'Origin memory' },
                { field: 'target_memory_id', description: 'Destination memory' }
            ],
            // Add more tables as needed...
            workflows: [
                { field: 'parent_workflow_id', description: 'Optional parent workflow' }
            ],
            actions: [
                { field: 'workflow_id', description: 'Parent workflow' },
                { field: 'parent_action_id', description: 'Optional parent action' },
                { field: 'thought_id', description: 'Related thought process' }
            ]
        };

        // Provide default relationships if table not found
        return relationships[tableName] || [
            { field: 'workflow_id', description: 'Associated workflow' }
        ];
    }

    function getTableFeatures(tableName) {
        const features = {
            memories: [
                { field: 'importance, confidence', description: 'Weighting factors' },
                { field: 'last_accessed, access_count', description: 'Usage statistics' },
                { field: 'ttl', description: 'Memory decay lifecycle' }
            ],
            embeddings: [
                { field: 'vector', description: 'Binary BLOB of embedding vector' },
                { field: 'model', description: 'Embedding model reference' },
                { field: 'dimensions', description: 'Vector space dimensions' }
            ],
            // Add more tables as needed...
            actions: [
                { field: 'tool_name, tool_args', description: 'Tool execution details' },
                { field: 'start_time, end_time', description: 'Performance tracking' },
                { field: 'result', description: 'Operation outcome data' }
            ],
            cognitive_states: [
                { field: 'working_memory_ids', description: 'Active memory snapshot' },
                { field: 'focus_area_ids', description: 'Attention allocation' },
                { field: 'is_latest', description: 'Current state indicator' }
            ]
        };

        // Provide default features if table not found
        return features[tableName] || [
            { field: 'created_at, updated_at', description: 'Timestamp tracking' },
            { field: 'metadata', description: 'Additional properties' }
        ];
    }

    // SQL Combined Schema - Restored
    const SQL_COMBINED_SCHEMA = `
-- Base Pragmas (Combined)
PRAGMA foreign_keys = ON;
PRAGMA journal_mode=WAL;
PRAGMA synchronous=NORMAL;
PRAGMA temp_store=MEMORY;
PRAGMA cache_size=-32000;
PRAGMA mmap_size=2147483647;
PRAGMA busy_timeout=30000;

-- Workflows table ---
CREATE TABLE IF NOT EXISTS workflows (
    workflow_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    goal TEXT,
    status TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    completed_at INTEGER,
    parent_workflow_id TEXT,
    metadata TEXT,
    last_active INTEGER
);

-- Actions table ---
CREATE TABLE IF NOT EXISTS actions (
    action_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    parent_action_id TEXT,
    action_type TEXT NOT NULL,        -- Uses ActionType enum
    title TEXT,
    reasoning TEXT,
    tool_name TEXT,
    tool_args TEXT,                   -- JSON serialized
    tool_result TEXT,                 -- JSON serialized
    status TEXT NOT NULL,             -- Uses ActionStatus enum
    started_at INTEGER NOT NULL,
    completed_at INTEGER,
    sequence_number INTEGER,
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_action_id) REFERENCES actions(action_id) ON DELETE SET NULL
);

-- Artifacts table ---
CREATE TABLE IF NOT EXISTS artifacts (
    artifact_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    action_id TEXT,                   -- Action that created this
    artifact_type TEXT NOT NULL,      -- Uses ArtifactType enum
    name TEXT NOT NULL,
    description TEXT,
    path TEXT,                        -- Filesystem path
    content TEXT,                     -- For text-based artifacts
    metadata TEXT,                    -- JSON serialized
    created_at INTEGER NOT NULL,
    is_output BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE,
    FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE SET NULL
);

-- Thought chains table (From agent_memory)
CREATE TABLE IF NOT EXISTS thought_chains (
    thought_chain_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    action_id TEXT,                   -- Optional action context
    title TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE,
    FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE SET NULL
);

-- Embeddings table (Create before memories which references it) ---
CREATE TABLE IF NOT EXISTS embeddings (
    id TEXT PRIMARY KEY,               -- Embedding hash ID
    memory_id TEXT UNIQUE,             -- Link back to the memory
    model TEXT NOT NULL,               -- Embedding model used
    embedding BLOB NOT NULL,           -- Serialized vector
    dimension INTEGER NOT NULL,        -- Dimension of the embedding vector
    created_at INTEGER NOT NULL
    -- Cannot add FK to memories yet, as it doesn't exist. Will be added via memories FK.
);

-- Memories table (Create before thoughts which references it) ---
CREATE TABLE IF NOT EXISTS memories (
    memory_id TEXT PRIMARY KEY,        -- Renamed from 'id' for clarity
    workflow_id TEXT NOT NULL,
    content TEXT NOT NULL,             -- The core memory content
    memory_level TEXT NOT NULL,        -- Uses MemoryLevel enum
    memory_type TEXT NOT NULL,         -- Uses MemoryType enum
    importance REAL DEFAULT 5.0,       -- Relevance score (1.0-10.0)
    confidence REAL DEFAULT 1.0,       -- Confidence score (0.0-1.0)
    description TEXT,                  -- Optional short description
    reasoning TEXT,                    -- Optional reasoning for the memory
    source TEXT,                       -- Origin (tool name, file, user, etc.)
    context TEXT,                      -- JSON context of memory creation
    tags TEXT,                         -- JSON array of tags
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    last_accessed INTEGER,
    access_count INTEGER DEFAULT 0,
    ttl INTEGER DEFAULT 0,             -- TTL in seconds (0 = permanent)
    embedding_id TEXT,                 -- FK to embeddings table
    action_id TEXT,                    -- *** FK: Action associated with this memory ***
    thought_id TEXT,                   -- *** FK: Thought associated with this memory - REMOVED INLINE, ADDED VIA ALTER LATER ***
    artifact_id TEXT,                  -- *** FK: Artifact associated with this memory ***
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE,
    FOREIGN KEY (embedding_id) REFERENCES embeddings(id) ON DELETE SET NULL,
    FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE SET NULL,
    FOREIGN KEY (artifact_id) REFERENCES artifacts(artifact_id) ON DELETE SET NULL
    -- REMOVED INLINE FK: FOREIGN KEY (thought_id) REFERENCES thoughts(thought_id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;
);

-- Add back reference from embeddings to memories now that memories exists
ALTER TABLE embeddings ADD CONSTRAINT fk_embeddings_memory FOREIGN KEY (memory_id) REFERENCES memories(memory_id) ON DELETE CASCADE;


-- Thoughts table (Create after memories)
CREATE TABLE IF NOT EXISTS thoughts (
    thought_id TEXT PRIMARY KEY,
    thought_chain_id TEXT NOT NULL,
    parent_thought_id TEXT,
    thought_type TEXT NOT NULL,        -- Uses ThoughtType enum
    content TEXT NOT NULL,
    sequence_number INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    relevant_action_id TEXT,           -- Action this thought relates to/caused
    relevant_artifact_id TEXT,         -- Artifact this thought relates to
    relevant_memory_id TEXT,           -- *** FK: Memory entry this thought relates to - REMOVED INLINE, ADDED VIA ALTER LATER ***
    FOREIGN KEY (thought_chain_id) REFERENCES thought_chains(thought_chain_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_thought_id) REFERENCES thoughts(thought_id) ON DELETE SET NULL,
    FOREIGN KEY (relevant_action_id) REFERENCES actions(action_id) ON DELETE SET NULL,
    FOREIGN KEY (relevant_artifact_id) REFERENCES artifacts(artifact_id) ON DELETE SET NULL
    -- REMOVED INLINE FK: FOREIGN KEY (relevant_memory_id) REFERENCES memories(memory_id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;
);


-- Memory links table ---
CREATE TABLE IF NOT EXISTS memory_links (
    link_id TEXT PRIMARY KEY,
    source_memory_id TEXT NOT NULL,
    target_memory_id TEXT NOT NULL,
    link_type TEXT NOT NULL,          -- Uses LinkType enum
    strength REAL DEFAULT 1.0,
    description TEXT,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (source_memory_id) REFERENCES memories(memory_id) ON DELETE CASCADE,
    FOREIGN KEY (target_memory_id) REFERENCES memories(memory_id) ON DELETE CASCADE,
    UNIQUE(source_memory_id, target_memory_id, link_type)
);

-- Cognitive states table (will store memory_ids)
CREATE TABLE IF NOT EXISTS cognitive_states (
    state_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    title TEXT NOT NULL,
    working_memory TEXT,               -- JSON array of memory_ids in active working memory
    focus_areas TEXT,                  -- JSON array of memory_ids or descriptive strings
    context_actions TEXT,              -- JSON array of relevant action_ids
    current_goals TEXT,                -- JSON array of goal descriptions or thought_ids
    created_at INTEGER NOT NULL,
    is_latest BOOLEAN NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE
);

-- Reflections table (for meta-cognitive analysis)
CREATE TABLE IF NOT EXISTS reflections (
    reflection_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    reflection_type TEXT NOT NULL,     -- summary, insight, planning, etc.
    created_at INTEGER NOT NULL,
    referenced_memories TEXT,          -- JSON array of memory_ids
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE
);

-- Memory operations log (for auditing/debugging)
CREATE TABLE IF NOT EXISTS memory_operations (
    operation_log_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    memory_id TEXT,                    -- Related memory, if applicable
    action_id TEXT,                    -- Related action, if applicable
    operation TEXT NOT NULL,           -- create, update, access, link, consolidate, expire, reflect, etc.
    operation_data TEXT,               -- JSON of operation details
    timestamp INTEGER NOT NULL,        -- Unix timestamp
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE,
    FOREIGN KEY (memory_id) REFERENCES memories(memory_id) ON DELETE SET NULL,
    FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE SET NULL
);

-- Tags table ---
CREATE TABLE IF NOT EXISTS tags (
    tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT,
    created_at INTEGER NOT NULL
);

-- Junction Tables for Tags ---
CREATE TABLE IF NOT EXISTS workflow_tags (
    workflow_id TEXT NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (workflow_id, tag_id),
    FOREIGN KEY (workflow_id) REFERENCES workflows(workflow_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS action_tags (
    action_id TEXT NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (action_id, tag_id),
    FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artifact_tags (
    artifact_id TEXT NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (artifact_id, tag_id),
    FOREIGN KEY (artifact_id) REFERENCES artifacts(artifact_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

-- Dependencies table ---
CREATE TABLE IF NOT EXISTS dependencies (
    dependency_id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_action_id TEXT NOT NULL,    -- The action that depends on the target
    target_action_id TEXT NOT NULL,    -- The action that is depended upon
    dependency_type TEXT NOT NULL,     -- Type of dependency (e.g., 'requires', 'informs')
    created_at INTEGER NOT NULL,       -- When the dependency was created
    FOREIGN KEY (source_action_id) REFERENCES actions (action_id) ON DELETE CASCADE,
    FOREIGN KEY (target_action_id) REFERENCES actions (action_id) ON DELETE CASCADE,
    UNIQUE(source_action_id, target_action_id, dependency_type)
);


-- Create Indices ---
-- Workflow indices
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_workflows_parent ON workflows(parent_workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflows_last_active ON workflows(last_active DESC);
-- Action indices
CREATE INDEX IF NOT EXISTS idx_actions_workflow_id ON actions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_actions_parent ON actions(parent_action_id);
CREATE INDEX IF NOT EXISTS idx_actions_sequence ON actions(workflow_id, sequence_number);
CREATE INDEX IF NOT EXISTS idx_actions_type ON actions(action_type);
-- Artifact indices
CREATE INDEX IF NOT EXISTS idx_artifacts_workflow_id ON artifacts(workflow_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_action_id ON artifacts(action_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_type ON artifacts(artifact_type);
-- Thought indices
CREATE INDEX IF NOT EXISTS idx_thought_chains_workflow ON thought_chains(workflow_id);
CREATE INDEX IF NOT EXISTS idx_thoughts_chain ON thoughts(thought_chain_id);
CREATE INDEX IF NOT EXISTS idx_thoughts_sequence ON thoughts(thought_chain_id, sequence_number);
CREATE INDEX IF NOT EXISTS idx_thoughts_type ON thoughts(thought_type);
CREATE INDEX IF NOT EXISTS idx_thoughts_relevant_memory ON thoughts(relevant_memory_id); -- Index still useful
-- Memory indices
CREATE INDEX IF NOT EXISTS idx_memories_workflow ON memories(workflow_id);
CREATE INDEX IF NOT EXISTS idx_memories_level ON memories(memory_level);
CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(memory_type);
CREATE INDEX IF NOT EXISTS idx_memories_importance ON memories(importance DESC);
CREATE INDEX IF NOT EXISTS idx_memories_confidence ON memories(confidence DESC);
CREATE INDEX IF NOT EXISTS idx_memories_created ON memories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_accessed ON memories(last_accessed DESC);
CREATE INDEX IF NOT EXISTS idx_memories_embedding ON memories(embedding_id);
CREATE INDEX IF NOT EXISTS idx_memories_action_id ON memories(action_id);
CREATE INDEX IF NOT EXISTS idx_memories_thought_id ON memories(thought_id); -- Index still useful
CREATE INDEX IF NOT EXISTS idx_memories_artifact_id ON memories(artifact_id);
-- Link indices
CREATE INDEX IF NOT EXISTS idx_memory_links_source ON memory_links(source_memory_id);
CREATE INDEX IF NOT EXISTS idx_memory_links_target ON memory_links(target_memory_id);
CREATE INDEX IF NOT EXISTS idx_memory_links_type ON memory_links(link_type);
-- Embedding indices
CREATE INDEX IF NOT EXISTS idx_embeddings_memory_id ON embeddings(memory_id); -- Index the FK
CREATE INDEX IF NOT EXISTS idx_embeddings_dimension ON embeddings(dimension); -- Index for dimension filtering
-- Cognitive State indices
CREATE INDEX IF NOT EXISTS idx_cognitive_states_workflow ON cognitive_states(workflow_id);
CREATE INDEX IF NOT EXISTS idx_cognitive_states_latest ON cognitive_states(workflow_id, is_latest);
-- Reflection indices
CREATE INDEX IF NOT EXISTS idx_reflections_workflow ON reflections(workflow_id);
-- Operation Log indices
CREATE INDEX IF NOT EXISTS idx_operations_workflow ON memory_operations(workflow_id);
CREATE INDEX IF NOT EXISTS idx_operations_memory ON memory_operations(memory_id);
CREATE INDEX IF NOT EXISTS idx_operations_timestamp ON memory_operations(timestamp DESC);
-- Tag indices
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_workflow_tags ON workflow_tags(tag_id); -- Index tag_id for lookups
CREATE INDEX IF NOT EXISTS idx_action_tags ON action_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_artifact_tags ON artifact_tags(tag_id);
-- Dependency indices
CREATE INDEX IF NOT EXISTS idx_dependencies_source ON dependencies(source_action_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_target ON dependencies(target_action_id);

-- Virtual table for memories ---
CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
    content, description, reasoning, tags,
    workflow_id UNINDEXED,
    memory_id UNINDEXED,
    content='memories',
    content_rowid='rowid',
    tokenize='porter unicode61'
);

-- Triggers to keep virtual table in sync (Updated for new table/columns)
CREATE TRIGGER IF NOT EXISTS memories_after_insert AFTER INSERT ON memories BEGIN
    INSERT INTO memory_fts(rowid, content, description, reasoning, tags, workflow_id, memory_id)
    VALUES (new.rowid, new.content, new.description, new.reasoning, new.tags, new.workflow_id, new.memory_id);
END;
CREATE TRIGGER IF NOT EXISTS memories_after_delete AFTER DELETE ON memories BEGIN
    INSERT INTO memory_fts(memory_fts, rowid, content, description, reasoning, tags, workflow_id, memory_id)
    VALUES ('delete', old.rowid, old.content, old.description, old.reasoning, old.tags, old.workflow_id, old.memory_id);
END;
CREATE TRIGGER IF NOT EXISTS memories_after_update AFTER UPDATE ON memories BEGIN
    INSERT INTO memory_fts(memory_fts, rowid, content, description, reasoning, tags, workflow_id, memory_id)
    VALUES ('delete', old.rowid, old.content, old.description, old.reasoning, old.tags, old.workflow_id, old.memory_id);
    INSERT INTO memory_fts(rowid, content, description, reasoning, tags, workflow_id, memory_id)
    VALUES (new.rowid, new.content, new.description, new.reasoning, new.tags, new.workflow_id, new.memory_id);
END;

-- Deferrable Circular Foreign Key Constraints for thoughts <-> memories
-- Execute after tables are created and within an explicit transaction
BEGIN IMMEDIATE TRANSACTION; -- Use IMMEDIATE for exclusive lock during schema change
PRAGMA defer_foreign_keys = ON; -- Enable deferral specifically for this transaction

ALTER TABLE thoughts ADD CONSTRAINT fk_thoughts_memory
    FOREIGN KEY (relevant_memory_id) REFERENCES memories(memory_id)
    ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE memories ADD CONSTRAINT fk_memories_thought
    FOREIGN KEY (thought_id) REFERENCES thoughts(thought_id)
    ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;

COMMIT; -- Commit the transaction containing the PRAGMA and ALTERs
    `;

    // SQL definitions for each table
    function getTableDefinition(tableName) {
        if (!tableName) return '';

        // Split schema into lines
        const lines = SQL_COMBINED_SCHEMA.split('\n');

        // Normalize table name to handle potential variations
        const normalizedTableName = tableName.replace(/^thought_chains$/, 'thought_chains')
            .replace(/^memories$/, 'memories')
            .replace(/^memory_links$/, 'memory_links')
            .replace(/^thoughts$/, 'thoughts')
            .replace(/^cognitive_states$/, 'cognitive_states')
            .replace(/^working_memory$/, 'working_memory')
            .replace(/^reflections$/, 'reflections')
            .replace(/^focus_areas$/, 'focus_areas')
            .replace(/^embeddings$/, 'embeddings')
            .replace(/^memory_fts$/, 'memory_fts')
            .replace(/^workflows$/, 'workflows')
            .replace(/^actions$/, 'actions')
            .replace(/^artifacts$/, 'artifacts')
            .replace(/^dependencies$/, 'dependencies')
            .replace(/^tags$/, 'tags') // Added tags
            .replace(/^workflow_tags$/, 'workflow_tags') // Added junction
            .replace(/^action_tags$/, 'action_tags') // Added junction
            .replace(/^artifact_tags$/, 'artifact_tags') // Added junction
            .replace(/^memory_operations$/, 'memory_operations'); // Added memory_operations

        // Find the line with CREATE TABLE and the table name
        const createTableRegex = new RegExp(`CREATE TABLE.*?\\s${normalizedTableName}\\s`, 'i');
        // For virtual tables like memory_fts
        const virtualTableRegex = new RegExp(`CREATE VIRTUAL TABLE.*?\\s${normalizedTableName}\\s`, 'i');

        let tableStart = -1;

        for (let i = 0; i < lines.length; i++) {
            if (createTableRegex.test(lines[i]) || virtualTableRegex.test(lines[i])) {
                tableStart = i;
                break;
            }
        }

        if (tableStart === -1) {
            return `-- No SQL definition available for table "${tableName}"

CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);`;
        }

        // Extract the table definition
        let tableDefinition: string[] = [];
        let openBrackets = 0;
        let i = tableStart;

        do {
            const line = lines[i];
            tableDefinition.push(line);

            openBrackets += (line.match(/\(/g) || []).length;
            openBrackets -= (line.match(/\)/g) || []).length;

            i++;
        } while (i < lines.length && (openBrackets > 0 || !lines[i - 1].trim().endsWith(';')));

        // Now get the related indices
        const indexRegex = new RegExp(`CREATE INDEX.*?ON\\s+${normalizedTableName}\\b`, 'i');
        const indices: string[] = [];

        for (let j = 0; j < lines.length; j++) {
            if (indexRegex.test(lines[j])) {
                indices.push(lines[j]);
            }
        }

        // Get related triggers for this table
        const triggerRegex = new RegExp(`CREATE TRIGGER.*?\\s${normalizedTableName}\\b`, 'i');
        const afterTriggerRegex = new RegExp(`AFTER (INSERT|DELETE|UPDATE) ON\\s+${normalizedTableName}\\b`, 'i');
        const triggers: string[] = [];

        for (let j = 0; j < lines.length; j++) {
            if (triggerRegex.test(lines[j]) || afterTriggerRegex.test(lines[j])) {
                let triggerDefinition: string[] = [];
                let k = j;

                do {
                    triggerDefinition.push(lines[k]);
                    k++;
                } while (k < lines.length && !lines[k - 1].trim().endsWith(';'));

                triggers.push(triggerDefinition.join('\n'));
                j = k - 1;
            }
        }

        // Look for ALTER TABLE statements related to this table
        const alterTableRegex = new RegExp(`ALTER TABLE\\s+${normalizedTableName}\\b`, 'i');
        const alterStatements: string[] = [];

        for (let j = 0; j < lines.length; j++) {
            if (alterTableRegex.test(lines[j])) {
                let alterDefinition: string[] = [];
                let k = j;

                do {
                    alterDefinition.push(lines[k]);
                    k++;
                } while (k < lines.length && !lines[k - 1].trim().endsWith(';'));

                alterStatements.push(alterDefinition.join('\n'));
                j = k - 1;
            }
        }

        // Combine all definitions
        let result = tableDefinition.join('\n');

        if (indices.length > 0) {
            result += '\n\n-- Indexes for table\n' + indices.join('\n');
        }

        if (triggers.length > 0) {
            result += '\n\n-- Triggers for table\n' + triggers.join('\n\n');
        }

        if (alterStatements.length > 0) {
            result += '\n\n-- Alter statements for table\n' + alterStatements.join('\n\n');
        }

        // Add junction table definitions if 'tags' is selected
        if (tableName === 'tags') {
            const junctionTables = ['workflow_tags', 'action_tags', 'artifact_tags'];
            junctionTables.forEach(jt => {
                const jtRegex = new RegExp(`CREATE TABLE.*?\\s${jt}\\s`, 'i');
                let jtStart = -1;
                for (let i = 0; i < lines.length; i++) {
                    if (jtRegex.test(lines[i])) {
                        jtStart = i;
                        break;
                    }
                }
                if (jtStart !== -1) {
                    let jtDef: string[] = [];
                    let jtBrackets = 0;
                    let i = jtStart;
                    do {
                        const line = lines[i];
                        jtDef.push(line);
                        jtBrackets += (line.match(/\\\(/g) || []).length; // Correctly escape parenthesis (4 backslashes needed)
                        jtBrackets -= (line.match(/\\\)/g) || []).length; // Correctly escape parenthesis (4 backslashes needed)
                        i++;
                    } while (i < lines.length && (jtBrackets > 0 || !lines[i - 1].trim().endsWith(';')));
                    result += '\\n\\n-- Junction Table\\n' + jtDef.join('\\n');
                }
            });
        }

        return result;
    }

    // Add this effect to highlight SQL code when the selected table changes - Restored
    useEffect(() => {
        if (sqlCodeRef.current && selectedTable) {
            Prism.highlightElement(sqlCodeRef.current);
        }
    }, [selectedTable]);

    // Add this effect to highlight SQL code on initial page load - Restored
    useEffect(() => {
        // Use a longer timeout to ensure the DOM is fully rendered
        const timer = setTimeout(() => {
            if (sqlCodeRef.current && selectedTable) {
                console.log('Initial SQL highlighting applied');
                Prism.highlightElement(sqlCodeRef.current);
            } else {
                console.log('SQL highlighting failed - DOM not ready:', {
                    sqlCodeRef: !!sqlCodeRef.current,
                    selectedTable
                });
            }
        }, 500); // Increased from 100ms to 500ms

        return () => clearTimeout(timer);
    }, []); // Empty dependency array means this runs once on mount

    // Add a useEffect to initialize Prism highlighting on all code blocks
    useEffect(() => {
        // Initialize Prism on all existing code blocks
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }, []);

    // Define navigation items for this page - DERIVED FROM CANONICAL SOURCES
    const navItems = SECTION_ORDER.map(id => {
        const details = SECTION_DETAILS[id];
        if (!details) {
            console.warn(`Missing details for section ID: ${id}`);
            return null; // Or handle error appropriately
        }
        return {
            id: details.id,
            name: details.name,
            icon: details.icon,
        };
    }).filter(item => item !== null); // Filter out any nulls if details were missing


    // Define technical doc links
    const docLinks = [
        {
            href: "/aml-technical-analysis",
            title: "AML Technical Analysis",
            description: "Agent Master Loop Architecture",
            icon: <RefreshCw className="w-5 h-5 text-purple-300" />,
            bgColorClass: "from-purple-900/50 to-purple-800/30 hover:from-purple-800/60 hover:to-purple-700/40",
            textColorClass: "text-purple-300"
        },
        {
            href: "/",
            title: "Back to Main",
            description: "EideticEngine Overview",
            icon: <Brain className="w-5 h-5 text-blue-300" />,
            bgColorClass: "from-blue-900/50 to-blue-800/30 hover:from-blue-800/60 hover:to-blue-700/40",
            textColorClass: "text-blue-300"
        }
    ];

    // Replace the original header and sidebar with our components
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 font-sans relative overflow-x-hidden">
            {/* Header Component */}
            <Header
                showNavigation={showNavigation}
                setShowNavigation={setShowNavigation}
                scrollProgress={scrollProgress}
            />

            {/* Main Content Wrapper */}
            <div className="flex pt-16">
                {/* Sidebar Component */}
                <Sidebar
                    showNavigation={showNavigation}
                    setShowNavigation={setShowNavigation}
                    activeSection={activeSection}
                    navItems={navItems}
                    docLinks={docLinks}
                    scrollToSection={scrollToSection}
                />

                {/* Mobile Navigation Toggle */}
                <MobileNavToggle
                    showNavigation={showNavigation}
                    setShowNavigation={setShowNavigation}
                />

                {/* Main content */}
                <main className={`flex-1 transition-margin duration-300 ease-in-out ${showNavigation ? 'md:ml-64' : 'ml-0'} overflow-x-hidden`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                        {/* Title Section */}
                        <section className="py-16 mb-16">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <Database className="w-20 h-20 text-blue-500" />
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                        Unified Memory System (UMS)
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                                    Technical Analysis of the Cognitive Memory Architecture
                                </p>
                            </div>
                        </section>

                        {/* Render sections DERIVED from the canonical order */}
                        {SECTION_ORDER.map((id) => {
                            const details = SECTION_DETAILS[id];
                            if (!details || !details.component) {
                                console.warn(`Component missing for section ID: ${id}`);
                                return null; // Skip rendering if component is missing
                            }

                            const Component = details.component;

                            // Handle prop passing for DatabaseSchemaSection
                            if (id === 'schema' && details.requiresProps) {
                                const schemaProps: DatabaseSchemaSectionProps = {
                                    selectedTable,
                                    setSelectedTable,
                                    sqlCodeRef,
                                    getTableDefinition,
                                    getTableColorClass,
                                    getTableColorTextClass,
                                    getTableColorBgClass,
                                    getTableColorBorderClass,
                                    getTableGradientClass,
                                    getTableCategory,
                                    getTableKeyFields,
                                    getTableRelationships,
                                    getTableFeatures
                                };
                                // Use section ID as key for React list rendering
                                return <Component key={id} {...schemaProps} />;
                            }

                            // Render other components normally
                            // Use section ID as key for React list rendering
                            return <Component key={id} />;
                        })}

                        {/* Footer */}
                        <Footer />

</div>
                </main>
                    </div>
                        </div>
    );
};

export default UmsTechnicalAnalysis;