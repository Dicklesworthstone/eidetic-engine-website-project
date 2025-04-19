// AmlTechnicalAnalysis.jsx - Redesigned to match EideticEngine main page aesthetic
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNavToggle from './components/MobileNavToggle';
import FloatingNavigation from './components/FloatingNavigation';
import MobileFAB from './components/MobileFAB';
import {
    RefreshCw,
    List,
    Settings,
    Database,
    Cpu,
    Zap,
    Target,
    GitBranch,
    CheckCircle,
    AlertTriangle,
    Telescope,
    Layers,
    GitMerge,
    Clock,
    Package,
    Brain,
    Server,
    Eye,
    MessageCircle,
    FileCode,
    Terminal,
    GitCommit,
    Activity,
    Code,
    Lightbulb,
    Users,
    Compass,
    Share2,
    FlaskConical,
    Scale,
    BookOpen,
    ChevronDown,
} from 'lucide-react';
import Prism from 'prismjs';
// Import Prism languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
// Import Monokai theme
import './prism-monokai.css'; // We'll create this file next
import Footer from './components/Footer';

// Lazy load the component
const AgentLoopFlow = lazy(() => import('./AgentLoopFlow'));

// Helper components for consistent styling
const InlineCode = ({ children }) => (
    <code className="mx-1 px-1.5 py-0.5 bg-gray-700/80 rounded text-blue-200 text-[9px] md:text-xs font-mono whitespace-nowrap">
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
        <div className="my-4 border border-gray-700/50 rounded-lg overflow-hidden">
            <pre className="p-4 text-[10px] md:text-sm font-mono overflow-x-auto code-scrollbar !bg-[#272822]">
                <code ref={codeRef} className={`language-${language}`}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

// Extracted Overview and Architecture into its own component
const OverviewAndArchitecture = () => (
    <section id="overview" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <RefreshCw className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> Overview and Architecture
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <p>
                        The code implements the <strong className="text-purple-300">EideticEngine Agent Master Loop (AML)</strong>, an AI agent orchestration system that manages a sophisticated cognitive agent with capabilities inspired by human memory and reasoning.
                    </p>
                    <p>
                        The system orchestrates a primary think-act cycle where the agent:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 mt-4">
                        <li className="pl-2">Gathers comprehensive context from its memory systems.</li>
                        <li className="pl-2">Consults a Large Language Model (LLM) for decision-making.</li>
                        <li className="pl-2">Executes actions via tools.</li>
                        <li className="pl-2">Updates its plans and goals.</li>
                        <li className="pl-2">Performs periodic meta-cognitive operations.</li>
                        <li className="pl-2">Maintains persistent state for continuity.</li>
                    </ol>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-purple-300 flex items-center">
                    <Layers className="w-6 h-6 mr-2 text-purple-400 flex-shrink-0" /> Core Components
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* AgentMasterLoop card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30 flex items-start">
                        <div className="p-2 bg-purple-900/40 rounded-lg mr-3 flex-shrink-0">
                            <RefreshCw className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-300 mb-1">AgentMasterLoop</h4>
                            <p className="text-sm text-gray-300">The main orchestrator class.</p>
                        </div>
                    </div>
                    {/* AgentState card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30 flex items-start">
                        <div className="p-2 bg-purple-900/40 rounded-lg mr-3 flex-shrink-0">
                            <List className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-300 mb-1">AgentState</h4>
                            <p className="text-sm text-gray-300">Dataclass representing runtime state.</p>
                        </div>
                    </div>
                    {/* PlanStep card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30 flex items-start">
                        <div className="p-2 bg-purple-900/40 rounded-lg mr-3 flex-shrink-0">
                            <GitBranch className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-300 mb-1">PlanStep</h4>
                            <p className="text-sm text-gray-300">Pydantic model for plan steps.</p>
                        </div>
                    </div>
                    {/* External Dependencies card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30 flex items-start">
                        <div className="p-2 bg-purple-900/40 rounded-lg mr-3 flex-shrink-0">
                            <Server className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-300 mb-1">External Dependencies</h4>
                            <p className="text-sm text-gray-300">MCPClient (for UMS), AsyncAnthropic (for LLM).</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-purple-300 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-purple-400 flex-shrink-0" /> Key Features and Innovations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Goal Stack Management card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30">
                        <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-purple-400" /> Goal Stack Management
                        </h4>
                        <p className="text-sm text-gray-300">Hierarchical goal decomposition with disciplined focus tracking.</p>
                    </div>
                    {/* Mental Momentum Bias card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30">
                        <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                            <Activity className="w-4 h-4 mr-2 text-purple-400" /> Mental Momentum Bias
                        </h4>
                        <p className="text-sm text-gray-300">Preference for stable progress completion via adaptive thresholds.</p>
                    </div>
                    {/* Adaptive Thresholds card */}
                    <div className="bg-gray-800/70 p-5 rounded-lg border border-purple-800/30">
                        <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-purple-400" /> Adaptive Thresholds
                        </h4>
                        <p className="text-sm text-gray-300">Dynamic adjustment based on performance and error metrics.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const PromptEngineering = () => (
    <section id="prompting" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <FileCode className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> Prompt Engineering as Cognitive Scaffolding
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-purple-700/30 shadow-lg">
                    <p className="mb-4">
                        The Agent Master Loop implements advanced prompt engineering that goes beyond simple instructions,
                        creating a sophisticated <strong className="text-purple-300">cognitive scaffold</strong> for the LLM:
                    </p>

                    {/* Prompt Layered Structure Visualization */}
                    <div className="relative w-full h-[26rem] mb-8 bg-gray-900/60 rounded-xl overflow-hidden border border-purple-700/20">
                        {/* Prompt layers visualization */}
                        <div className="absolute inset-0 flex flex-col">
                            {/* System Instructions Layer */}
                            <div className="h-1/6 bg-blue-900/30 border-b border-blue-700/50 flex items-center justify-center px-4 group relative">
                                <div className="text-blue-300 text-sm font-medium text-center flex items-center">
                                    <div className="absolute left-4 p-1.5 bg-blue-900/70 rounded-lg">
                                        <Brain className="w-5 h-5 text-blue-300" />
                                    </div>
                                    Agent Identity & Goal Context
                                </div>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 inset-0 p-4 flex items-center justify-center">
                                    <div className="text-xs text-blue-200 max-w-md">
                                        Sets foundational identity and anchors to both overall goal and current sub-goal from the goal stack,
                                        establishing the agent's purpose and immediate focus.
                                    </div>
                                </div>
                            </div>

                            {/* Tool Definitions Layer */}
                            <div className="h-1/6 bg-emerald-900/30 border-b border-emerald-700/50 flex items-center justify-center px-4 group relative">
                                <div className="text-emerald-300 text-sm font-medium text-center flex items-center">
                                    <div className="absolute left-4 p-1.5 bg-emerald-900/70 rounded-lg">
                                        <Settings className="w-5 h-5 text-emerald-300" />
                                    </div>
                                    Available Tools & Schemas
                                </div>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 inset-0 p-4 flex items-center overflow-y-auto code-scrollbar">
                                    <div className="text-xs text-emerald-200 max-w-md">
                                        Provides detailed definitions of all available tools, highlighting essential cognitive tools
                                        with special markers. Includes memory tools, goal stack tools, thought chain tools, and internal tools.
                                    </div>
                                </div>
                            </div>

                            {/* Process Instructions Layer */}
                            <div className="h-2/6 bg-purple-900/30 border-b border-purple-700/50 flex items-center justify-center px-4 group relative">
                                <div className="text-purple-300 text-sm font-medium text-center flex items-center">
                                    <div className="absolute left-4 p-1.5 bg-purple-900/70 rounded-lg">
                                        <GitBranch className="w-5 h-5 text-purple-300" />
                                    </div>
                                    Detailed Process Instructions & Considerations
                                </div>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 inset-0 p-4 flex items-center overflow-y-auto code-scrollbar">
                                    <div className="text-xs text-purple-200 max-w-md leading-relaxed">
                                        <strong className="text-purple-300">1. Context Analysis:</strong> Directs attention to specific context components with emphasis on goal stack, errors, working memory and timestamps.
                                        <br /><br />
                                        <strong className="text-purple-300">2. Error Handling:</strong> Instructs to prioritize error analysis based on type and message.
                                        <br /><br />
                                        <strong className="text-purple-300">3. Reasoning & Planning:</strong> Breaks down into 10 subtasks (a-j) covering goal management, dependencies, artifacts, memory management, and search strategies.
                                        <br /><br />
                                        <strong className="text-purple-300">4. Action Decision:</strong> Forces selection of a single action from explicitly enumerated options.
                                        <br /><br />
                                        <strong className="text-purple-300">5. Output Format:</strong> Restricts response format to valid JSON or completion signal.
                                    </div>
                                </div>
                            </div>

                            {/* Recovery Strategies Layer */}
                            <div className="h-1/6 bg-amber-900/30 border-b border-amber-700/50 flex items-center justify-center px-4 group relative">
                                <div className="text-amber-300 text-sm font-medium text-center flex items-center">
                                    <div className="absolute left-4 p-1.5 bg-amber-900/70 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-amber-300" />
                                    </div>
                                    Error Recovery Strategies
                                </div>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 inset-0 p-4 flex items-center overflow-y-auto code-scrollbar">
                                    <div className="text-xs text-amber-200 max-w-md leading-relaxed">
                                        Provides specific recovery paths for 10 error types (InvalidInputError, DependencyNotMetError, ServerUnavailable, etc.)
                                        with tailored strategies for each scenario.
                                    </div>
                                </div>
                            </div>

                            {/* Runtime Context Layer */}
                            <div className="h-1/6 bg-red-900/30 flex items-center justify-center px-4 group relative">
                                <div className="text-red-300 text-sm font-medium text-center flex items-center pl-10 sm:pl-0">
                                    <div className="absolute left-2 sm:left-4 p-1.5 bg-red-900/70 rounded-lg">
                                        <Activity className="w-5 h-5 text-red-300" />
                                    </div>
                                    <span>Runtime Context &amp; Final Instruction</span>
                                </div>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 inset-0 p-4 flex items-center overflow-y-auto code-scrollbar">
                                    <div className="text-xs text-red-200 max-w-md">
                                        Contains actual runtime data: current plan JSON, error details (highlighted),
                                        meta-cognitive feedback, current goal reminder, and final action instruction
                                        emphasizing goal management and plan repair.
                                    </div>
                                </div>
                            </div>

                            {/* Hover instructions */}
                            <div className="absolute top-2 left-0 right-0 text-center text-xs text-white/70">
                                Hover over sections to see details
                            </div>
                        </div>
                    </div>

                    {/* Key Cognitive Scaffolding Techniques */}
                    <h3 className="text-xl font-bold mt-8 mb-4 text-purple-300 flex items-center">
                        <GitBranch className="w-5 h-5 mr-2 text-purple-400" /> Cognitive Scaffolding Techniques
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div className="bg-gray-900/40 p-4 rounded-lg border border-purple-700/20">
                            <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                                <Target className="w-4 h-4 mr-2 text-purple-400" /> Goal-Focused Direction
                            </h4>
                            <p className="text-sm">
                                Creates a strong emphasis on the <strong className="text-purple-200">goal stack hierarchy</strong>, differentiating
                                between the overall goal and current goal. Ensures the agent maintains focus on immediate tasks
                                while preserving awareness of higher-level objectives.
                            </p>
                            <div className="mt-2 bg-gray-800/60 p-2 rounded border border-purple-700/10 text-xs font-mono text-gray-300">
                                <span className="text-purple-300">*</span> Goal Focus: Always work towards the <span className="text-purple-300">**Current Goal**</span> (top of the stack).
                            </div>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-purple-700/20">
                            <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-purple-400" /> Mental Momentum Bias
                            </h4>
                            <p className="text-sm">
                                Introduces a cognitive bias toward <strong className="text-purple-200">maintaining current plan trajectory</strong> when progress is stable,
                                reducing unnecessary replanning while allowing justified deviations when needed.
                            </p>
                            <div className="mt-2 bg-gray-800/60 p-2 rounded border border-purple-700/10 text-xs font-mono text-gray-300">
                                <span className="text-purple-300">*</span> <span className="text-purple-300">**Mental Momentum:**</span> Prioritize completing current plan steps if progress is steady.
                            </div>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-purple-700/20">
                            <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2 text-purple-400" /> Typed Error Recovery
                            </h4>
                            <p className="text-sm">
                                Rather than generic error handling, provides <strong className="text-purple-200">typed error strategies</strong> tailored to each error category.
                                This modular approach enables the LLM to apply specific, contextually appropriate recovery techniques.
                            </p>
                            <div className="mt-2 bg-gray-800/60 p-2 rounded border border-purple-700/10 text-xs font-mono text-gray-300">
                                <span className="text-purple-300">Recovery Strategies based on `last_error_details.type`:</span><br />
                                <span className="text-gray-500">// Each error type has a specific recovery approach</span>
                            </div>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-purple-700/20">
                            <h4 className="font-bold text-purple-300 mb-2 flex items-center">
                                <GitMerge className="w-4 h-4 mr-2 text-purple-400" /> Process Decomposition
                            </h4>
                            <p className="text-sm">
                                Decomposes complex cognitive tasks into <strong className="text-purple-200">clear sequential steps</strong> and further sub-steps, creating a structured
                                thinking framework that guides the LLM through a consistent analytical process.
                            </p>
                            <div className="mt-2 bg-gray-800/60 p-2 rounded border border-purple-700/10 text-xs font-mono text-gray-300">
                                <span className="text-purple-300">1. Context Analysis</span><br />
                                <span className="text-purple-300">2. Error Handling</span><br />
                                <span className="text-purple-300">3. Reasoning & Planning:</span><br />
                                <span className="text-gray-400">    a. ... j.</span><br />
                                <span className="text-purple-300">4. Action Decision</span><br />
                                <span className="text-purple-300">5. Output Format</span>
                            </div>
                        </div>
                    </div>

                    {/* Implementation Highlights */}
                    <h3 className="text-xl font-bold mt-8 mb-4 text-blue-300 flex items-center">
                        <GitMerge className="w-5 h-5 mr-2 text-blue-400" /> Implementation Highlights
                    </h3>

                    <div className="bg-gray-900/50 rounded-xl p-5 border border-blue-700/20 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-bold text-blue-300 mb-3 flex items-center">
                                    <Code className="w-4 h-4 mr-2 text-blue-400" /> Dynamic Composition
                                </h4>
                                <p className="text-sm mb-2">
                                    The prompt is built dynamically at runtime by assembling blocks based on the current state:
                                </p>
                                <ul className="text-xs space-y-1 list-disc pl-4">
                                    <li>System blocks (identity, goals, tools, instructions)</li>
                                    <li>User blocks (runtime context, plans, errors, feedback)</li>
                                    <li>Conditional sections based on state (errors, goals)</li>
                                    <li>Visual formatting to direct attention</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-blue-300 mb-3 flex items-center">
                                    <MessageCircle className="w-4 h-4 mr-2 text-blue-400" /> Two-Part Structure
                                </h4>
                                <p className="text-sm mb-2">
                                    The prompt is separated into two distinct functional parts:
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="p-2 bg-blue-900/30 rounded-lg text-xs">
                                        <span className="font-bold text-blue-300">System Prompt:</span> Provides stable cognitive framework, instructions, and guidance
                                    </div>
                                    <div className="p-2 bg-indigo-900/30 rounded-lg text-xs">
                                        <span className="font-bold text-indigo-300">User Prompt:</span> Contains dynamic runtime data, context, and specific instruction
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Features */}
                    <h3 className="text-xl font-bold mt-8 mb-4 text-indigo-300 flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-indigo-400" /> Advanced Prompt Features
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
                            <h4 className="font-bold text-indigo-300 mb-2">Temporal & Freshness Awareness</h4>
                            <p className="text-sm">
                                The prompt explicitly directs attention to <InlineCode>retrieved_at</InlineCode> timestamps on context components,
                                enabling the LLM to reason about information freshness and prioritize more recent data.
                            </p>
                            <div className="p-3 bg-gray-900/70 rounded-lg mt-2 text-xs">
                                <span className="text-indigo-300 font-bold">→ Context Analysis Instruction:</span><br />
                                "Pay attention to memory <span className="text-indigo-200 font-bold">`importance`/`confidence`</span> and context component <span className="text-indigo-200 font-bold">`retrieved_at` timestamps</span>."
                            </div>
                        </div>

                        <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
                            <h4 className="font-bold text-indigo-300 mb-2">Context-Aware Tool Selection</h4>
                            <p className="text-sm">
                                Rather than simplistic tool descriptions, the prompt provides detailed guidance on when and why to select specific tools,
                                teaching the LLM tool-selection criteria and usage patterns.
                            </p>
                            <div className="p-3 bg-gray-900/70 rounded-lg mt-2 text-xs">
                                <span className="text-indigo-300 font-bold">→ Search Tool Selection Example:</span><br />
                                "Prefer <span className="text-indigo-200 font-bold">`hybrid_search_memories`</span> for mixed queries needing relevance and keyword matching. Use <span className="text-indigo-200 font-bold">`search_semantic_memories`</span> for pure conceptual similarity."
                            </div>
                        </div>

                        <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
                            <h4 className="font-bold text-indigo-300 mb-2">Rich Text Formatting</h4>
                            <p className="text-sm">
                                Strategically leverages markdown formatting—using code blocks, bold, italics, bullets, and other formatting to
                                create visual emphasis and guide the LLM's attention to critical elements.
                            </p>
                            <div className="grid grid-cols-3 gap-3 mt-2">
                                <div className="p-2 bg-gray-900/70 rounded-lg text-xs text-center">
                                    <span className="text-indigo-300 font-bold">Code Blocks</span>
                                    <div className="mt-1 text-[10px]">Used for JSON context, plan data</div>
                                </div>
                                <div className="p-2 bg-gray-900/70 rounded-lg text-xs text-center">
                                    <span className="text-indigo-300 font-bold">Bold/Italics</span>
                                    <div className="mt-1 text-[10px]">Applied to critical terms like **Current Goal**</div>
                                </div>
                                <div className="p-2 bg-gray-900/70 rounded-lg text-xs text-center">
                                    <span className="text-indigo-300 font-bold">Highlighting</span>
                                    <div className="mt-1 text-[10px]">CRITICAL/ATTENTION labels for key issues</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Example Snippets */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/40">
                            <h4 className="text-lg font-bold mb-2 text-gray-200 flex items-center">
                                <Brain className="w-4 h-4 mr-2 text-gray-400" /> System Prompt Snippet
                            </h4>
                            <div className="bg-gray-800/70 p-3 rounded-lg text-xs font-mono text-gray-300 max-h-40 overflow-y-auto code-scrollbar">
                                <span className="text-green-300">You are 'AgentName', an AI agent orchestrator using a Unified Memory System.</span><br /><br />
                                <span className="text-blue-300">Overall Goal: Complete project research</span><br />
                                <span className="text-blue-300">Current Goal: Find relevant papers (ID: goal-ab12, Status: in_progress)</span><br /><br />
                                <span className="text-purple-300">Your Process at each step:</span><br />
                                <span className="text-purple-300">1. Context Analysis: Deeply analyze 'Current Context'...</span><br />
                                <span className="text-gray-500">// Process steps continue...</span><br /><br />
                                <span className="text-amber-300">Recovery Strategies based on `last_error_details.type`:</span><br />
                                <span className="text-amber-300">* `InvalidInputError`: Review tool schema...</span><br />
                                <span className="text-gray-500">// More strategies...</span>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/40">
                            <h4 className="text-lg font-bold mb-2 text-gray-200 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-gray-400" /> User Prompt Snippet
                            </h4>
                            <div className="bg-gray-800/70 p-3 rounded-lg text-xs font-mono text-gray-300 max-h-40 overflow-y-auto code-scrollbar">
                                <span className="text-gray-400">Current Context:</span><br />
                                <span className="text-blue-300">```json</span><br />
                                <span className="text-gray-500">// Structured context data with timestamps</span><br />
                                <span className="text-blue-300">```</span><br /><br />
                                <span className="text-gray-400">Current Plan:</span><br />
                                <span className="text-blue-300">```json</span><br />
                                <span className="text-gray-500">// Plan steps data</span><br />
                                <span className="text-blue-300">```</span><br /><br />
                                <span className="text-red-300">**CRITICAL: Address Last Error Details**:</span><br />
                                <span className="text-blue-300">```json</span><br />
                                <span className="text-gray-500">// Error details with type and message</span><br />
                                <span className="text-blue-300">```</span><br /><br />
                                <span className="text-purple-300">Current Goal Reminder: Find relevant papers</span><br /><br />
                                <span className="text-green-300">Instruction: Analyze context & errors...</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-900/50 p-5 rounded-xl border border-gray-700/40">
                        <h3 className="text-xl font-bold mb-4 text-gray-200 flex items-center">
                            <MessageCircle className="w-5 h-5 mr-2 text-gray-400" /> Conclusion
                        </h3>
                        <p className="text-sm">
                            This prompt engineering exemplifies "cognitive programming"—using the prompt not just as instructions
                            but as an architecture that shapes how the LLM perceives, reasons about, and interacts with its environment.
                            It creates a consistent cognitive framework that persists across multiple LLM calls, establishing predictable
                            reasoning patterns, error handling behaviors, and execution strategies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Components that were referenced but not defined
const IntegrationWorkflowSteps = () => (
    <div className="space-y-4">
        <div className="bg-gray-900/60 p-4 rounded-lg border border-indigo-700/20">
            <h4 className="font-bold text-indigo-300 mb-2">Workflow Steps</h4>
            <ol className="space-y-2 list-decimal pl-5 text-sm">
                <li>Initialize AML instance and state</li>
                <li>Load previous state (if available)</li>
                <li>Start background tasks</li>
                <li>Enter main master loop</li>
                <li>Process state transitions and goals</li>
                <li>Persist state on exit</li>
            </ol>
        </div>
    </div>
);

const IntegrationArchitecture = () => (
    <section id="integration" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <GitMerge className="w-8 h-8 mr-3 text-indigo-400 flex-shrink-0" /> Integration Architecture and Workflow
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-indigo-700/30 shadow-lg">
                    <p className="mb-6 text-center text-lg">
                        The operational lifecycle of the EideticEngine Agent Master Loop follows a structured workflow:
                    </p>

                    {/* Mobile-first workflow visualization */}
                    <div className="-mx-2 px-2 overflow-visible">
                        {/* Vertical workflow for mobile - horizontal for desktop */}
                        <div className="relative flex flex-col md:flex-row items-center md:justify-between md:items-center gap-8 md:gap-4">
                            {/* Vertical line for mobile / Horizontal line for desktop */}
                            <div className="absolute top-0 bottom-0 left-6 md:top-1/2 md:left-0 md:right-0 md:bottom-auto w-px md:w-full h-full md:h-px bg-gradient-to-b md:bg-gradient-to-r from-indigo-600/50 via-purple-500/50 to-blue-400/50 z-0"></div>
                            
                            {/* Steps */}
                            {[
                                { icon: <Zap className="w-5 h-5" />, title: "Initialize", description: "Instantiate AML & State" },
                                { icon: <Database className="w-5 h-5" />, title: "Load State", description: "Fetch previous session" },
                                { icon: <Server className="w-5 h-5" />, title: "Start Tasks", description: "Begin background processes" },
                                { icon: <RefreshCw className="w-5 h-5" />, title: "Enter Loop", description: "Core think-act cycle" },
                                { icon: <Target className="w-5 h-5" />, title: "Process", description: "Handle state & goals" },
                                { icon: <CheckCircle className="w-5 h-5" />, title: "Persist", description: "Save state on exit" }
                            ].map((step, index) => (
                                <div key={index} className="relative z-10 flex md:flex-col md:items-center group">
                                    {/* Circle with icon */}
                                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-900/80 border-2 border-indigo-600/70 rounded-full flex items-center justify-center shadow-lg shadow-indigo-900/30 transform transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400">
                                        {React.cloneElement(step.icon, { className: "w-5 h-5 md:w-6 md:h-6 text-indigo-300 transition-colors group-hover:text-indigo-100" })}
                                    </div>
                                    
                                    {/* Step label - visible on all screens */}
                                    <div className="ml-4 md:ml-0 md:mt-2">
                                        <span className="text-sm font-medium text-indigo-300">{step.title}</span>
                                        
                                        {/* Description - visible on mobile */}
                                        <p className="text-xs text-gray-400 md:hidden mt-0.5">{step.description}</p>
                                    </div>
                                    
                                    {/* Desktop hover details - appears on hover on desktop only */}
                                    <div className="hidden md:block absolute p-3 bg-gray-800/70 rounded-lg border border-indigo-700/30 shadow-md text-center w-40 transform transition-all duration-300 opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 -translate-x-1/2 invisible group-hover:visible">
                                        <p className="text-xs text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const TokenEstimationAndContextManagement = () => (
    <section id="context-management" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Package className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> Token Estimation and Context Management
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-purple-700/30 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                                <Target className="w-5 h-5 mr-2 text-purple-400" /> Token Estimation
                            </h3>

                            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                                <p className="text-sm">
                                    Uses Anthropic API's <InlineCode>count_tokens</InlineCode> for precise estimation, with heuristic fallback, crucial for staying within limits and cost optimization.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-purple-400" /> Temporal Awareness
                            </h3>

                            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                                <p className="text-sm">
                                    Context components are tagged with <InlineCode>retrieved_at</InlineCode> timestamps, enabling the LLM to assess information freshness and make temporally grounded decisions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                            <Package className="w-5 h-5 mr-2 text-purple-400" /> Context Truncation and Compression
                        </h3>

                        <p className="mb-4">Implements multi-stage, cognitively-informed truncation:</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-900/60 p-3 rounded-lg border border-purple-700/20 flex flex-col items-center text-center">
                                <div className="font-bold text-xl text-purple-300 mb-1">1</div>
                                <p className="text-xs">Initial JSON serialization</p>
                            </div>

                            <div className="bg-gray-900/60 p-3 rounded-lg border border-purple-700/20 flex flex-col items-center text-center">
                                <div className="font-bold text-xl text-purple-300 mb-1">2</div>
                                <p className="text-xs">Structure-aware prioritized truncation</p>
                            </div>

                            <div className="bg-gray-900/60 p-3 rounded-lg border border-purple-700/20 flex flex-col items-center text-center">
                                <div className="font-bold text-xl text-purple-300 mb-1">3</div>
                                <p className="text-xs">Prioritized component removal</p>
                            </div>

                            <div className="bg-gray-900/60 p-3 rounded-lg border border-purple-700/20 flex flex-col items-center text-center">
                                <div className="font-bold text-xl text-purple-300 mb-1">4</div>
                                <p className="text-xs">UTF-8 safe byte slice (last resort)</p>
                            </div>
                        </div>

                        <div className="mt-4 bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                            <p className="text-sm">
                                If limits still exceeded after truncation, uses LLM-based compression (via <InlineCode>TOOL_SUMMARIZE_TEXT</InlineCode>) targeting verbose parts first.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: UMS Tool Constants ---
const UmsToolConstants = () => (
    <section id="tool-constants" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Database className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Unified Memory System (UMS) Tool Constants
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-gray-700/50 shadow-lg">
                    <p>
                        Constants define UMS tool names for consistent interaction:
                    </p>
                    <CodeBlock language="python">{`# Core memory tools
TOOL_STORE_MEMORY = "unified_memory:store_memory"
TOOL_HYBRID_SEARCH = "unified_memory:hybrid_search_memories"
# ... other core tools

# Working memory tools
TOOL_GET_WORKING_MEMORY = "unified_memory:get_working_memory"
TOOL_OPTIMIZE_WM = "unified_memory:optimize_working_memory"
# ... other WM tools

# Meta-cognitive tools
TOOL_REFLECTION = "unified_memory:generate_reflection"
TOOL_CONSOLIDATION = "unified_memory:consolidate_memories"
# ... other meta-cog tools

# Goal stack tools
TOOL_PUSH_SUB_GOAL = "unified_memory:push_sub_goal"
TOOL_MARK_GOAL_STATUS = "unified_memory:mark_goal_status"
# ... other goal tools

# Workflow tools
TOOL_CREATE_WORKFLOW = "unified_memory:create_workflow"
# ... other workflow tools

# Internal agent tool
AGENT_TOOL_UPDATE_PLAN = "agent:update_plan"`}</CodeBlock>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="font-bold text-blue-300 mb-2 text-center">Memory Management</h4>
                            <div className="flex justify-center mb-3">
                                <Database className="w-8 h-8 text-blue-400" />
</div>
                            <p className="text-xs text-gray-300 text-center">
                                Core storage and retrieval operations
                            </p>
                        </div>

                        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                            <h4 className="font-bold text-purple-300 mb-2 text-center">Meta-Cognition</h4>
                            <div className="flex justify-center mb-3">
                                <Brain className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-xs text-gray-300 text-center">
                                Reflection and memory consolidation
                            </p>
                        </div>

                        <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-700/30">
                            <h4 className="font-bold text-emerald-300 mb-2 text-center">Process Control</h4>
                            <div className="flex justify-center mb-3">
                                <GitBranch className="w-8 h-8 text-emerald-400" />
                            </div>
                            <p className="text-xs text-gray-300 text-center">
                                Goals, workflows and planning
                            </p>
                        </div>
                    </div>
                </div>
</div>
</div>
</section>
);

// --- SECTION: Core Utility Functions ---
const CoreUtilityFunctions = () => (
    <section id="utilities-aml" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> Core Utility Functions
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-gray-700/50 shadow-lg">
                    <p>
                        Helper functions support core logic:
                    </p>
                    <CodeBlock language="python">{`def _fmt_id(val: Any, length: int = 8) -> str: ...
def _utf8_safe_slice(s: str, max_len: int) -> str: ...
def _truncate_context(context: Dict[str, Any], max_len: int = 25_000) -> str: ...
def _default_tool_stats() -> Dict[str, Dict[str, Union[int, float]]]: ...
def _detect_plan_cycle(self, plan: List[PlanStep]) -> bool: ...`}</CodeBlock>

                    <div className="mt-6">
                        <p>
                            Includes functions for ID formatting, safe slicing, structure-aware context truncation, initializing stats, and detecting plan cycles using DFS.
                        </p>

                        <div className="mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="font-bold text-blue-300 mb-2 flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-blue-400" /> Temporal Awareness
                            </h4>
                            <p className="text-sm text-gray-300">
                                A distinctive feature is the inclusion of <strong className="text-blue-200 font-semibold">temporal awareness</strong> via freshness indicators (<InlineCode>retrieval_timestamp</InlineCode>) tagged onto each retrieved context component. This allows the LLM to reason about potentially stale information and prioritize recent data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: AgentMasterLoop Core Implementation ---
const AgentMasterLoopCoreImplementation = () => (
    <section id="core-impl" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Cpu className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> AgentMasterLoop Core Implementation
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                {/* Sub-section: Initialization */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-700/30 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300 flex items-center">
                        <Zap className="w-6 h-6 mr-2 text-purple-400 flex-shrink-0" /> Initialization and Setup
                            </h3>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><InlineCode>__init__(...)</InlineCode>: Stores MCPClient, Anthropic client, sets up logger, state, sync primitives, cognitive parameters.</li>
                        <li><InlineCode>initialize()</InlineCode>: Loads state (<InlineCode>_load_agent_state</InlineCode>), fetches/filters tool schemas, verifies essential tools, validates workflow/goal stack (<InlineCode>_validate_goal_stack_on_load</InlineCode>), sets default thought chain (<InlineCode>_set_default_thought_chain_id</InlineCode>).</li>
                    </ul>
                </div>

                {/* Sub-section: Main Loop */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-700/30 shadow-lg mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300 flex items-center">
                        <RefreshCw className="w-6 h-6 mr-2 text-purple-400 flex-shrink-0" /> Main Agent Loop (<InlineCode>run</InlineCode>)
                    </h3>
                    <p>Orchestrates the agent lifecycle:</p>

                    <div className="mt-4 relative overflow-hidden">
                        {/* Flowchart visualization */}
                        <div className="flex flex-col items-center space-y-8">
                            {/* Setup Phase */}
                            <div className="w-full max-w-md bg-gray-900/80 p-4 rounded-lg border border-blue-700/30 relative">
                                <h4 className="text-blue-300 font-bold text-center mb-2">Setup Phase</h4>
                                <p className="text-sm text-gray-300 text-center">Initialize workflow/goal stack/thought chain if needed</p>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Main Loop */}
                            <div className="w-full max-w-md bg-purple-900/30 p-4 rounded-lg border border-purple-700/30 relative">
                                <h4 className="text-purple-300 font-bold text-center mb-2">Main Loop</h4>
                                <p className="text-sm text-gray-300 text-center">Run periodic tasks → gather context → call LLM → execute action → update plan → check errors → save state</p>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Termination */}
                            <div className="w-full max-w-md bg-gray-900/80 p-4 rounded-lg border border-red-700/30">
                                <h4 className="text-red-300 font-bold text-center mb-2">Termination</h4>
                                <p className="text-sm text-gray-300 text-center">Handle goal achievement, max loops, shutdown signal, errors</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-section: Context Gathering */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-700/30 shadow-lg mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center">
                        <Telescope className="w-6 h-6 mr-2 text-blue-400 flex-shrink-0" /> 
                        <span className="flex flex-col sm:flex-row sm:items-center">
                            <span>Context Gathering System</span>
                            <span className="text-sm mt-1 sm:mt-0 sm:ml-2 opacity-70">
                                (<InlineCode>_gather_context</InlineCode>)
                            </span>
                        </span>
                    </h3>

                    <p>Assembles multi-faceted context:</p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/60 p-4 rounded-lg border border-blue-700/20">
                            <h4 className="font-bold text-blue-300 mb-2 flex items-center">
                                <GitBranch className="w-4 h-4 mr-2 text-blue-400" /> Base Context
                            </h4>
                            <p className="text-xs text-gray-300">
                                Loop count, IDs, plan, errors, workflow stack
                                    </p>
                                </div>

                        <div className="bg-gray-900/60 p-4 rounded-lg border border-blue-700/20">
                            <h4 className="font-bold text-blue-300 mb-2 flex items-center">
                                <Target className="w-4 h-4 mr-2 text-blue-400" /> Goal Stack Context
                            </h4>
                            <p className="text-xs text-gray-300">
                                Current goal details, stack summary
                                    </p>
                                </div>

                        <div className="bg-gray-900/60 p-4 rounded-lg border border-blue-700/20">
                            <h4 className="font-bold text-blue-300 mb-2 flex items-center">
                                <GitCommit className="w-4 h-4 mr-2 text-blue-400" /> Core Context
                            </h4>
                            <p className="text-xs text-gray-300">
                                Recent actions, important memories, key thoughts (with freshness timestamp)
                            </p>
                        </div>

                        <div className="bg-gray-900/60 p-4 rounded-lg border border-blue-700/20">
                            <h4 className="font-bold text-blue-300 mb-2 flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-blue-400" /> Working Memory
                            </h4>
                            <p className="text-xs text-gray-300">
                                Active memories, focal point (with freshness timestamp)
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                        <h4 className="font-bold text-blue-300 mb-2 flex items-center">
                            <GitMerge className="w-5 h-5 mr-2 text-blue-400" /> Contextual Link Traversal Strategy
                        </h4>
                        <p className="text-sm text-gray-300">
                            Uses a sophisticated 3-tier fallback (Focal Memory → Working Memory → Important Memories) to mimic human associative memory traversal guided by attention.
                        </p>
                    </div>
                </div>

                {/* Sub-section: Plan Management */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-amber-700/30 shadow-lg mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-amber-300 flex items-center">
                        <GitMerge className="w-6 h-6 mr-2 text-amber-400 flex-shrink-0" />
                        <span className="flex flex-col sm:flex-row sm:items-center">
                            <span>Plan Management</span>
                            <span className="text-sm mt-1 sm:mt-0 sm:ml-2 opacity-70">
                                (<InlineCode>_apply_heuristic_plan_update</InlineCode>)
                            </span>
                        </span>
                    </h3>

                    <p>Updates plan heuristically if LLM doesn't explicitly replan:</p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-900/20 p-4 rounded-lg border border-green-700/30">
                            <h4 className="font-bold text-green-300 mb-2 text-center">Success</h4>
                            <p className="text-xs text-gray-300 text-center">
                                Marks step complete, removes from plan, generates summary, resets errors
                                    </p>
                                </div>

                                <div className="bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                            <h4 className="font-bold text-red-300 mb-2 text-center">Failure</h4>
                            <p className="text-xs text-gray-300 text-center">
                                Marks step failed, keeps in plan, inserts analysis step, sets replan flag, updates errors
                            </p>
                        </div>

                        <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
                            <h4 className="font-bold text-indigo-300 mb-2 text-center">Thought</h4>
                            <p className="text-xs text-gray-300 text-center">
                                Marks complete, uses thought as summary, updates counters at reduced weight
                                    </p>
                                </div>
                            </div>
                        </div>

                {/* Sub-sections continued with other components */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-700/30 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-purple-300 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-purple-400 flex-shrink-0" /> Goal Stack Management
                            </h3>

                        <p className="text-sm">Manages hierarchical goals within a workflow context:</p>

                        <ul className="mt-3 space-y-1 list-disc pl-5 text-sm">
                            <li>State includes <InlineCode>goal_stack</InlineCode> (list of goal dicts) and <InlineCode>current_goal_id</InlineCode>.</li>
                            <li>Context includes current goal details and stack summary.</li>
                            <li>LLM pushes sub-goals via UMS tool <InlineCode>push_sub_goal</InlineCode>.</li>
                            <li>LLM marks status via <InlineCode>mark_goal_status</InlineCode>; AML updates state and pops finished goals.</li>
                            <li>Root goal completion signals end of main loop.</li>
                        </ul>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-700/30 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" /> Adaptive Threshold System
                        </h3>

                        <p className="text-sm">Dynamically adjusts reflection/consolidation thresholds:</p>

                        <ul className="mt-3 space-y-1 list-disc pl-5 text-sm">
                            <li>Analyzes episodic memory ratio and tool failure rate against targets.</li>
                            <li>Adjusts thresholds based on deviation, applying dampening.</li>
                            <li><strong className="text-blue-200">Mental Momentum Bias:</strong> Applies positive bias (<InlineCode>MOMENTUM_THRESHOLD_BIAS_FACTOR</InlineCode>) to reflection threshold increases during stable progress (low error rate), reducing interruptions.</li>
                            <li>Ensures thresholds stay within MIN/MAX bounds.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Cognitive Engine Metaphor ---
const CognitiveEngineMetaphor = () => (
    <section id="cognitive-engine" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> The "Cognitive Engine" Metaphor
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-purple-700/30 shadow-lg">
                    <p className="mb-6">
                        The EideticEngine name references eidetic memory (exceptional recall ability), but the system functions
                        as a comprehensive cognitive engine with specialized components mirroring human mental faculties:
                    </p>

                    {/* Responsive Engine Visualization - Mobile first approach */}
                    <div className="relative w-full h-[24rem] md:h-[28rem] mb-8 bg-gray-900/70 rounded-xl overflow-hidden border border-purple-700/20">
                        {/* Central "Engine Core" */}
                        <div className="absolute inset-0">
                            {/* Rotating inner gears animation - reduced size on mobile */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 md:w-40 h-16 md:h-40">
                                <div className="absolute inset-0 border-2 md:border-4 border-dashed border-purple-500/30 rounded-full animate-spin-slow"></div>
                                <div className="absolute inset-1 md:inset-2 border-2 md:border-4 border-dashed border-blue-500/30 rounded-full animate-spin-reverse"></div>
                                <div className="absolute inset-3 md:inset-8 border-2 md:border-4 border-dashed border-indigo-500/30 rounded-full animate-spin-slow"></div>

                                {/* Central brain - smaller on mobile */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-12 md:w-24 h-12 md:h-24 bg-purple-900/70 rounded-full flex items-center justify-center border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                        <Brain className="w-6 md:w-12 h-6 md:h-12 text-purple-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Cognitive systems arranged in orbital fashion */}
                            <div className="absolute top-0 left-0 w-full h-full">
                                {/* Memory System */}
                                <div className="absolute top-[15%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-blue-900/70 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-500/50 cursor-pointer">
                                        <Database className="w-4 h-4 md:w-8 md:h-8 text-blue-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-blue-300 font-medium text-[10px] md:text-sm">
                                        Memory
                                    </div>
                                </div>

                                {/* Attention System */}
                                <div className="absolute top-[15%] right-[20%] transform translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-amber-900/70 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-500/50 cursor-pointer">
                                        <Eye className="w-4 h-4 md:w-8 md:h-8 text-amber-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-amber-300 font-medium text-[10px] md:text-sm">
                                        Attention
                                    </div>
                                </div>

                                {/* Executive Function */}
                                <div className="absolute top-[35%] right-[10%] transform translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-green-900/70 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 border border-green-500/50 cursor-pointer">
                                        <GitBranch className="w-4 h-4 md:w-8 md:h-8 text-green-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-green-300 font-medium text-[10px] md:text-sm">
                                        Executive
                                    </div>
                                </div>

                                {/* Metacognitive System */}
                                <div className="absolute top-[35%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-indigo-900/70 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-500/50 cursor-pointer">
                                        <Telescope className="w-4 h-4 md:w-8 md:h-8 text-indigo-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-indigo-300 font-medium text-[10px] md:text-sm">
                                        Metacog
                                    </div>
                                </div>

                                {/* Reasoning Engine */}
                                <div className="absolute bottom-[35%] left-[10%] transform -translate-x-1/2 translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-red-900/70 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 border border-red-500/50 cursor-pointer">
                                        <MessageCircle className="w-4 h-4 md:w-8 md:h-8 text-red-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-red-300 font-medium text-[10px] md:text-sm">
                                        Reasoning
                                    </div>
                                </div>

                                {/* Action System */}
                                <div className="absolute bottom-[35%] right-[10%] transform translate-x-1/2 translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-emerald-900/70 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-500/50 cursor-pointer">
                                        <Terminal className="w-4 h-4 md:w-8 md:h-8 text-emerald-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-emerald-300 font-medium text-[10px] md:text-sm">
                                        Action
                                    </div>
                                </div>

                                {/* Learning System */}
                                <div className="absolute bottom-[15%] left-[20%] transform -translate-x-1/2 translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-cyan-900/70 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-500/50 cursor-pointer">
                                        <GitMerge className="w-4 h-4 md:w-8 md:h-8 text-cyan-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 md:mt-2 whitespace-nowrap text-cyan-300 font-medium text-[10px] md:text-sm">
                                        Learning
                                    </div>
                                </div>

                                {/* Emotional System */}
                                <div className="absolute bottom-[15%] right-[20%] transform translate-x-1/2 translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-10 h-10 md:w-16 md:h-16 bg-pink-900/70 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/20 border border-pink-500/50 cursor-pointer">
                                        <Activity className="w-5 h-5 md:w-8 md:h-8 text-pink-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 md:mt-2 whitespace-nowrap text-pink-300 font-medium text-xs md:text-sm">
                                        Momentum System
                                    </div>
                                </div>

                                {/* Connection lines - would use SVG paths in production for better curves */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Placeholder for SVG connection lines */}
                                    <defs>
                                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* System Descriptions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-700/20">
                            <h3 className="text-lg font-bold mb-2 text-blue-300 flex items-center">
                                <Database className="w-4 h-4 mr-2 text-blue-400" /> Memory Systems
                            </h3>
                                    <p className="text-sm">
                                Multi-level memory implementation including episodic, semantic, and procedural memory
                                in the UMS, with working memory and context handling.
                                    </p>
                                </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-700/20">
                            <h3 className="text-lg font-bold mb-2 text-amber-300 flex items-center">
                                <Eye className="w-4 h-4 mr-2 text-amber-400" /> Attention Mechanism
                            </h3>
                                    <p className="text-sm">
                                Working memory with focal point optimization, prioritized context component truncation,
                                and contextual link traversal mirroring human attention.
                                    </p>
                                </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-green-700/20">
                            <h3 className="text-lg font-bold mb-2 text-green-300 flex items-center">
                                <GitBranch className="w-4 h-4 mr-2 text-green-400" /> Executive Function
                            </h3>
                                    <p className="text-sm">
                                Goal stack and plan management, hierarchical goal decomposition, and dependency
                                management for cognitive task control.
                                    </p>
                                </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-pink-700/20">
                            <h3 className="text-lg font-bold mb-2 text-pink-300 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-pink-400" /> Momentum System
                            </h3>
                                    <p className="text-sm">
                                Mental momentum bias, adaptive thresholds, and performance monitoring,
                                simulating human flow states and cognitive preferences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </section>
);

// --- SECTION: Practical Applications and Use Cases ---
const PracticalApplications = () => (
    <section id="applications" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Lightbulb className="w-8 h-8 mr-3 text-amber-400 flex-shrink-0" /> Practical Applications and Use Cases
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-amber-700/30 shadow-lg">
                    <p className="mb-6">
                        The EideticEngine architecture enables sophisticated applications that go beyond simple task automation:
                    </p>

                    {/* Interactive Application Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {/* Research Agent Card */}
                        <div className="group relative bg-gradient-to-br from-blue-900/30 to-blue-800/10 hover:from-blue-800/50 hover:to-blue-700/30 border border-blue-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-blue-900/70 rounded-lg mr-3">
                                        <Telescope className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-300">Research Agents</h3>
                                </div>
                                <ul className="text-sm space-y-2 text-gray-300 list-disc pl-5">
                                    <li>Long-running research with complex sub-tasks</li>
                                    <li>Persistent state across multiple sessions</li>
                                    <li>Goal-oriented literature analysis</li>
                                    <li>Knowledge summarization and synthesis</li>
                                </ul>
                            </div>
                        </div>

                        {/* Knowledge Worker Card */}
                        <div className="group relative bg-gradient-to-br from-purple-900/30 to-purple-800/10 hover:from-purple-800/50 hover:to-purple-700/30 border border-purple-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-purple-900/70 rounded-lg mr-3">
                                        <Brain className="w-6 h-6 text-purple-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-purple-300">Knowledge Workers</h3>
                                </div>
                                <ul className="text-sm space-y-2 text-gray-300 list-disc pl-5">
                                    <li>Information acquisition and organization</li>
                                    <li>Knowledge distillation and application</li>
                                    <li>Complex content creation</li>
                                    <li>Metacognitive learning</li>
                                </ul>
                            </div>
                        </div>

                        {/* Personal Assistant Card */}
                        <div className="group relative bg-gradient-to-br from-green-900/30 to-green-800/10 hover:from-green-800/50 hover:to-green-700/30 border border-green-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-900/30 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-green-900/70 rounded-lg mr-3">
                                        <Users className="w-6 h-6 text-green-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-green-300">Personal Assistants</h3>
                                </div>
                                <ul className="text-sm space-y-2 text-gray-300 list-disc pl-5">
                                    <li>Cross-session context maintenance</li>
                                    <li>User preference adaptation</li>
                                    <li>Task planning and management</li>
                                    <li>Personalized information retrieval</li>
                                </ul>
                            </div>
                        </div>

                        {/* Problem Solver Card */}
                        <div className="group relative bg-gradient-to-br from-amber-900/30 to-amber-800/10 hover:from-amber-800/50 hover:to-amber-700/30 border border-amber-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/30 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-bl-full"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-amber-900/70 rounded-lg mr-3">
                                        <Zap className="w-6 h-6 text-amber-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-amber-300">Problem Solvers</h3>
                                </div>
                                <ul className="text-sm space-y-2 text-gray-300 list-disc pl-5">
                                    <li>Structured solution space exploration</li>
                                    <li>Error recovery and adaptation</li>
                                    <li>Complex constraint management</li>
                                    <li>Incremental progress tracking</li>
                                </ul>
                            </div>
                        </div>

                        {/* Multi-Agent System Card */}
                        <div className="group relative bg-gradient-to-br from-red-900/30 to-red-800/10 hover:from-red-800/50 hover:to-red-700/30 border border-red-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-red-900/70 rounded-lg mr-3">
                                        <Share2 className="w-6 h-6 text-red-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-300">Multi-Agent Systems</h3>
                                </div>
                                <ul className="text-sm space-y-2 text-gray-300 list-disc pl-5">
                                    <li>Hierarchical agent collaboration</li>
                                    <li>Specialized agent orchestration</li>
                                    <li>Complex workflow management</li>
                                    <li>Task decomposition across agents</li>
                                </ul>
                            </div>
                        </div>

                        {/* Creative Assistant Card */}
                        <div className="group relative bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 hover:from-cyan-800/50 hover:to-cyan-700/30 border border-cyan-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/30 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-cyan-900/70 rounded-lg mr-3">
                                        <Lightbulb className="w-6 h-6 text-cyan-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-cyan-300">Creative Assistants</h3>
                                </div>
                                <ul className="text-sm space-y-2 text-gray-300 list-disc pl-5">
                                    <li>Extended creative context maintenance</li>
                                    <li>Iterative refinement with memory</li>
                                    <li>Style consistency across sessions</li>
                                    <li>Collaborative ideation support</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Integration Example Visualization */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/40">
                        <h3 className="text-xl font-bold mb-4 text-indigo-300 flex items-center">
                            <Terminal className="w-5 h-5 mr-2 text-indigo-400" /> Integration Example
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-800/60 p-4 rounded-lg border border-indigo-700/20">
                                <h4 className="font-bold text-indigo-300 mb-2 text-center text-sm">1. Environment Setup</h4>
                                <CodeBlock language="bash">{`export MCP_SERVER_URL="http://memory-server:8013"
export ANTHROPIC_API_KEY="sk-ant-api123xyz"
export AGENT_GOAL="Research quantum computing"
export MAX_ITERATIONS=50`}</CodeBlock>
                            </div>

                            <div className="bg-gray-800/60 p-4 rounded-lg border border-indigo-700/20">
                                <h4 className="font-bold text-indigo-300 mb-2 text-center text-sm">2. Execution & Monitoring</h4>
                                <div className="text-xs font-mono bg-gray-900/80 p-3 rounded border border-gray-700/40 text-gray-300 space-y-1 overflow-auto code-scrollbar max-h-32">
                                    <div><span className="text-green-400">✓</span> Initializing workflow "Quantum Research"</div>
                                    <div><span className="text-blue-400">→</span> Created goal: Understand quantum principles</div>
                                    <div><span className="text-amber-400">⚙</span> Searching memory: "quantum computing basics"</div>
                                    <div><span className="text-purple-400">✧</span> Reflection triggered after 7 actions</div>
                                    <div><span className="text-blue-400">→</span> Created sub-goal: Research quantum gates</div>
                                    <div><span className="text-gray-500">...</span></div>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 p-4 rounded-lg border border-indigo-700/20">
                                <h4 className="font-bold text-indigo-300 mb-2 text-center text-sm">3. Resume From State</h4>
                                <CodeBlock language="bash">{`# Different goal but same state file
export AGENT_GOAL="Focus on post-quantum crypto"
python agent_master_loop.py`}</CodeBlock>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Limitations and Future Directions ---
const LimitationsAndFuture = () => (
    <section id="limitations-future" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Compass className="w-8 h-8 mr-3 text-emerald-400 flex-shrink-0" /> Current Limitations and Future Directions
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-emerald-700/30 shadow-lg">
                    <p className="mb-6">
                        Despite its sophistication, the system has several limitations that point toward future development:
                    </p>

                    {/* Roadmap Visualization */}
                    <div className="relative w-full h-[22rem] md:h-[28rem] mb-8 bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/30">
                        {/* Coordinate system */}
                        <div className="absolute inset-0 p-4 md:p-6">
                            {/* Y-axis: Complexity */}
                            <div className="absolute top-6 bottom-6 left-6 md:left-10 w-px bg-gray-700/50"></div>
                            <div className="absolute left-6 md:left-10 top-6 -translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs text-gray-500">High</div>
                            <div className="absolute left-6 md:left-10 bottom-6 -translate-x-1/2 translate-y-1/2 text-[10px] md:text-xs text-gray-500">Low</div>
                            <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-[10px] md:text-xs text-gray-500">Complexity</div>

                            {/* X-axis: Time */}
                            <div className="absolute left-6 md:left-10 right-6 md:right-10 bottom-6 h-px bg-gray-700/50"></div>
                            <div className="absolute left-6 md:left-10 bottom-6 -translate-y-4 text-[10px] md:text-xs text-gray-500">Current</div>
                            <div className="absolute right-6 md:right-10 bottom-6 -translate-y-4 text-[10px] md:text-xs text-gray-500">Future</div>
                            <div className="absolute left-1/2 bottom-1 md:bottom-2 -translate-x-1/2 text-[10px] md:text-xs text-gray-500">Development Timeline</div>

                            {/* Current state point */}
                            <div className="absolute left-[15%] bottom-[25%] w-4 h-4 md:w-6 md:h-6 bg-blue-900/80 rounded-full border-2 border-blue-500 shadow-lg shadow-blue-900/30 flex items-center justify-center group cursor-pointer z-10">
                                <div className="text-[8px] md:text-xs text-white font-bold">1.0</div>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-2 bg-gray-900 text-blue-300 text-[8px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    Current Version
                                </div>
                            </div>

                            {/* Connection line */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M 60 250 C 180 230, 260 180, 320 110 C 380 70, 460 150, 540 210"
                                    stroke="url(#progress-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="6,3"
                                />
                                <defs>
                                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="50%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Future milestones */}
                            <div className="absolute left-[50%] bottom-[70%] w-4 h-4 md:w-6 md:h-6 bg-purple-900/80 rounded-full border-2 border-purple-500/70 shadow-lg shadow-purple-900/30 flex items-center justify-center group cursor-pointer z-10">
                                <div className="text-[8px] md:text-xs text-white font-bold">2.0</div>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-2 bg-gray-900 text-purple-300 text-[8px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    Enhanced Collaboration
                                </div>
                            </div>

                            <div className="absolute left-[80%] bottom-[35%] w-4 h-4 md:w-6 md:h-6 bg-emerald-900/80 rounded-full border-2 border-emerald-500/70 shadow-lg shadow-emerald-900/30 flex items-center justify-center group cursor-pointer z-10">
                                <div className="text-[8px] md:text-xs text-white font-bold">3.0</div>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-2 bg-gray-900 text-emerald-300 text-[8px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    Self-Modification
                                </div>
                            </div>

                            {/* Limitation Areas */}
                            <div className="absolute grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 left-10 top-10 right-4 bottom-10">
                                {/* LLM Dependence */}
                                <div className="relative bg-gray-800/50 rounded-lg border border-blue-700/20 p-2 md:p-3 overflow-hidden group hover:bg-gray-800/70 transition-colors">
                                    <div className="flex items-start mb-1 md:mb-2">
                                        <div className="p-1 md:p-1.5 bg-blue-900/70 rounded-lg mr-1 md:mr-2 flex-shrink-0">
                                            <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />
                                        </div>
                                        <div className="font-bold text-blue-300 text-[10px] md:text-sm">LLM Dependence</div>
                                    </div>
                                    <p className="text-[8px] md:text-xs text-gray-300">Relies heavily on underlying LLM reasoning quality, inheriting biases and limitations.</p>
                                    <div className="mt-1 md:mt-2 text-[8px] md:text-xs text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="font-bold">Future:</span> Multi-model orchestration
                                    </div>
                                </div>

                                {/* Tool-Based Action Space */}
                                <div className="relative bg-gray-800/50 rounded-lg border border-purple-700/20 p-2 md:p-3 overflow-hidden group hover:bg-gray-800/70 transition-colors">
                                    <div className="flex items-start mb-1 md:mb-2">
                                        <div className="p-1 md:p-1.5 bg-purple-900/70 rounded-lg mr-1 md:mr-2 flex-shrink-0">
                                            <Terminal className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
                                        </div>
                                        <div className="font-bold text-purple-300 text-[10px] md:text-sm">Tool-Based Action</div>
                                    </div>
                                    <p className="text-[8px] md:text-xs text-gray-300">Actions limited to available tools, constraining potential capabilities.</p>
                                    <div className="mt-1 md:mt-2 text-[8px] md:text-xs text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="font-bold">Future:</span> Dynamic tool discovery
                                    </div>
                                </div>

                                {/* Single-Agent Focus */}
                                <div className="relative bg-gray-800/50 rounded-lg border border-amber-700/20 p-2 md:p-3 overflow-hidden group hover:bg-gray-800/70 transition-colors">
                                    <div className="flex items-start mb-1 md:mb-2">
                                        <div className="p-1 md:p-1.5 bg-amber-900/70 rounded-lg mr-1 md:mr-2 flex-shrink-0">
                                            <Users className="w-3 h-3 md:w-4 md:h-4 text-amber-300" />
                                        </div>
                                        <div className="font-bold text-amber-300 text-[10px] md:text-sm">Single-Agent Focus</div>
                                    </div>
                                    <p className="text-[8px] md:text-xs text-gray-300">Multi-agent collaboration exists but is limited, sub-workflows lack true coordination.</p>
                                    <div className="mt-1 md:mt-2 text-[8px] md:text-xs text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="font-bold">Future:</span> Advanced coordination
                                    </div>
                                </div>

                                {/* Limited Self-Modification */}
                                <div className="relative bg-gray-800/50 rounded-lg border border-emerald-700/20 p-2 md:p-3 overflow-hidden group hover:bg-gray-800/70 transition-colors">
                                    <div className="flex items-start mb-1 md:mb-2">
                                        <div className="p-1 md:p-1.5 bg-emerald-900/70 rounded-lg mr-1 md:mr-2 flex-shrink-0">
                                            <Code className="w-3 h-3 md:w-4 md:h-4 text-emerald-300" />
                                        </div>
                                        <div className="font-bold text-emerald-300 text-[10px] md:text-sm">Limited Self-Modification</div>
                                    </div>
                                    <p className="text-[8px] md:text-xs text-gray-300">Cannot modify cognitive architecture or core processes, static prompt engineering.</p>
                                    <div className="mt-1 md:mt-2 text-[8px] md:text-xs text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="font-bold">Future:</span> Self-optimization
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future Directions */}
                    <div className="bg-gray-900/50 p-5 rounded-xl border border-emerald-700/30">
                        <h3 className="text-lg font-bold mb-4 text-emerald-300 flex items-center">
                            <FlaskConical className="w-5 h-5 mr-2 text-emerald-400" /> Research and Development Roadmap
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-800/50 p-3 rounded-lg border border-blue-700/20">
                                <h4 className="font-bold text-blue-300 mb-2 text-sm">Near Term (1-2 Versions)</h4>
                                <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                                    <li>Dynamic prompt optimization</li>
                                    <li>Enhanced multi-agent protocols</li>
                                    <li>Improved cross-model integration</li>
                                    <li>Expanded feedback mechanisms</li>
                                </ul>
                </div>

                            <div className="bg-gray-800/50 p-3 rounded-lg border border-purple-700/20">
                                <h4 className="font-bold text-purple-300 mb-2 text-sm">Medium Term (3-4 Versions)</h4>
                                <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                                    <li>Self-configuring architecture</li>
                                    <li>Tool creation capabilities</li>
                                    <li>Hybrid AI techniques integration</li>
                                    <li>Dynamic reasoning pathways</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/50 p-3 rounded-lg border border-emerald-700/20">
                                <h4 className="font-bold text-emerald-300 mb-2 text-sm">Long Term (5+ Versions)</h4>
                                <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                                    <li>Architectural self-modification</li>
                                    <li>Cognitive component evolution</li>
                                    <li>Full autonomy in complex domains</li>
                                    <li>Adaptive cognitive load balancing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Cognitive System Conclusion ---
const CognitiveSystemConclusion = () => (
    <section id="cognitive-system" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-indigo-400 flex-shrink-0" /> The Agent as a Cognitive System
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-indigo-700/30 shadow-lg">
                    <p className="mb-6">
                        When integrating all aspects of our analysis, the EideticEngine Agent Master Loop emerges not just as a
                        technical implementation but as a comprehensive cognitive system:
                    </p>

                    {/* Animated Brain Network Visualization */}
                    <div className="relative w-full h-auto aspect-[3/5] md:h-[30rem] mb-8 bg-gradient-to-b from-gray-900/90 to-indigo-900/10 rounded-xl overflow-hidden border border-indigo-700/20">
                        <div className="absolute inset-0">
                            {/* Brain network background */}
                            <div className="absolute inset-0 opacity-20 mix-blend-screen">
                                <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                        </radialGradient>
                                    </defs>

                                    {/* Abstract neural network pattern */}
                                    {/* This would be a more complex SVG in production */}
                                    <path
                                        d="M 100,400 C 200,200 300,500 400,400 C 500,200 600,500 700,400"
                                        stroke="#8b5cf6"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.3"
                                    />
                                    <path
                                        d="M 100,200 C 200,400 300,200 400,400 C 500,600 600,400 700,200"
                                        stroke="#3b82f6"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.3"
                                    />
                                    <path
                                        d="M 100,600 C 200,400 300,600 400,400 C 500,200 600,400 700,600"
                                        stroke="#a855f7"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.3"
                                    />
                                </svg>
                            </div>

                            {/* Animated pulse circles */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="absolute w-40 h-40 rounded-full border border-indigo-500/30 animate-pulse-slow"></div>
                                <div className="absolute w-60 h-60 rounded-full border border-indigo-500/20 animate-pulse-slower"></div>
                                <div className="absolute w-80 h-80 rounded-full border border-indigo-500/10 animate-pulse-slowest"></div>
                            </div>

                            {/* Core Capabilities */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-72 h-[80%] md:h-72">
                                {/* Memory and Context */}
                                <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-900/60 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-500/50">
                                        <Database className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 md:mt-2 whitespace-nowrap text-blue-300 font-medium text-xs md:text-sm">
                                        Contextual Memory
                                    </div>
                                </div>

                                {/* Adaptive Learning */}
                                <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-900/60 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 border border-green-500/50">
                                        <Activity className="w-6 h-6 md:w-8 md:h-8 text-green-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 md:mt-2 whitespace-nowrap text-green-300 font-medium text-xs md:text-sm">
                                        Adaptive Learning
                                    </div>
                                </div>

                                {/* Goal Decomposition */}
                                <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-900/60 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-500/50">
                                        <Target className="w-6 h-6 md:w-8 md:h-8 text-amber-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 md:mt-2 whitespace-nowrap text-amber-300 font-medium text-xs md:text-sm">
                                        Goal Decomposition
                                    </div>
                                </div>

                                {/* Resilient Execution */}
                                <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 transition-all duration-300 hover:scale-110">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-900/60 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 border border-red-500/50">
                                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-red-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 md:mt-2 whitespace-nowrap text-red-300 font-medium text-xs md:text-sm">
                                        Resilient Execution
                                    </div>
                                </div>

                                {/* Self-Reflection */}
                                <div className="absolute top-1/3 right-[20%] transition-all duration-300 hover:scale-110">
                                    <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-900/60 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-500/50">
                                        <Telescope className="w-5 h-5 md:w-7 md:h-7 text-purple-300" />
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 md:mt-2 whitespace-nowrap text-purple-300 font-medium text-xs md:text-sm">
                                        Self-Reflection
                                    </div>
                                </div>

                                {/* Central Core */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
                                        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-indigo-900/70 rounded-full flex items-center justify-center border-2 border-indigo-500/70 shadow-lg shadow-indigo-500/30">
                                            <Brain className="w-8 h-8 md:w-12 md:h-12 text-indigo-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Capabilities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-700/20">
                            <h3 className="text-lg font-bold mb-2 text-blue-300 flex items-center">
                                <Database className="w-4 h-4 mr-2 text-blue-400" /> Extended Context Maintenance
                            </h3>
                            <p className="text-sm">
                                Through sophisticated memory systems and state persistence, maintains contextual understanding
                                across sessions, enabling truly long-term tasks and coherent goal pursuit.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-green-700/20">
                            <h3 className="text-lg font-bold mb-2 text-green-300 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-green-400" /> Experience-Based Learning
                            </h3>
                            <p className="text-sm">
                                Via metacognitive feedback loops and memory consolidation, demonstrates ability to
                                learn from past interactions and improve performance on similar tasks.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-700/20">
                            <h3 className="text-lg font-bold mb-2 text-amber-300 flex items-center">
                                <Target className="w-4 h-4 mr-2 text-amber-400" /> Adaptive Problem Solving
                            </h3>
                            <p className="text-sm">
                                Through goal decomposition and flexible planning, handles complex tasks requiring
                                multiple levels of abstraction and adaptation to changing environments.
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-4 rounded-lg border border-red-700/20">
                            <h3 className="text-lg font-bold mb-2 text-red-300 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-red-400" /> Resilient Execution
                            </h3>
                            <p className="text-sm">
                                With sophisticated error handling and recovery, maintains progress despite
                                failures, adapting strategies and employing fallbacks to achieve goals.
                            </p>
                        </div>
                    </div>

                    {/* System Architecture Benefits */}
                    <div className="bg-indigo-900/20 p-5 rounded-xl border border-indigo-700/30">
                        <h3 className="text-xl font-bold mb-4 text-indigo-300 flex items-center">
                            <Layers className="w-5 h-5 mr-2 text-indigo-400" /> Beyond the Foundation Model
                        </h3>

                        <p className="text-sm mb-4">
                            While fundamentally powered by an LLM, the EideticEngine creates an <strong>execution context</strong> that dramatically enhances
                            the model's capabilities, enabling more reliable, contextual, and goal-directed behavior:
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-indigo-900/60 rounded-lg mt-0.5 flex-shrink-0">
                                    <Telescope className="w-4 h-4 text-indigo-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-indigo-300">Persistent Context</h4>
                                    <p className="text-xs text-gray-300">Overcomes LLM context limitations through memory systems</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-indigo-900/60 rounded-lg mt-0.5 flex-shrink-0">
                                    <Target className="w-4 h-4 text-indigo-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-indigo-300">Goal Coherence</h4>
                                    <p className="text-xs text-gray-300">Maintains focus despite distractions and complexities</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-indigo-900/60 rounded-lg mt-0.5 flex-shrink-0">
                                    <GitMerge className="w-4 h-4 text-indigo-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-indigo-300">Experience Accumulation</h4>
                                    <p className="text-xs text-gray-300">Builds knowledge over time through reflective practices</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-indigo-900/60 rounded-lg mt-0.5 flex-shrink-0">
                                    <CheckCircle className="w-4 h-4 text-indigo-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-indigo-300">Executability</h4>
                                    <p className="text-xs text-gray-300">Translates LLM reasoning into reliable actions</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-center text-sm text-indigo-200 font-medium italic">
                            "A cognitive engine greater than the sum of its parts"
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Unified Architectural Overview ---
const ArchitecturalOverviewSection = () => (
    <section id="summary" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-purple-400 flex-shrink-0" /> Unified Architectural Overview and Design Philosophy
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-purple-700/30 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/40 p-5 rounded-lg border border-purple-700/20">
                            <h3 className="text-xl font-bold mb-3 text-purple-300 flex items-center">
                                <Brain className="w-5 h-5 mr-2 text-purple-400" /> Cognitive Science Foundations
                            </h3>
                            <p className="text-sm">
                                Draws inspiration from human memory (multi-level UMS integration), attention (working memory/focus),
                                goal decomposition (goal stack), cognitive flow (mental momentum), and metacognition (reflection/consolidation).
                            </p>
                        </div>

                        <div className="bg-gray-900/40 p-5 rounded-lg border border-blue-700/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-300 flex items-center">
                                <MessageCircle className="w-5 h-5 mr-2 text-blue-400" /> LLM Integration Strategy
                            </h3>
                            <p className="text-sm">
                                Uses advanced prompt engineering (<InlineCode>_construct_agent_prompt</InlineCode>) as cognitive scaffolding,
                                guiding analysis, providing recovery frameworks, and structuring decisions.
                            </p>
                            </div>
                        </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4 text-indigo-300 flex items-center">
                            <GitMerge className="w-5 h-5 mr-2 text-indigo-400" /> Architectural Integration and Information Flow
                        </h3>

                        <p className="mb-4 text-sm">
                            Highlights the core loop (Memory → Context → LLM → Decision → Action → Memory) and feedback loops involving goals,
                            background tasks, meta-cognition, and errors.
                        </p>

                        {/* Provide more horizontal space for the flow diagram on mobile */}
                        <div className="overflow-hidden -mx-4 sm:mx-0">
                            <div className="px-1 sm:px-0">
                                <Suspense fallback={<div className="w-full h-120 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 shadow-xl flex items-center justify-center">
  <div className="text-white">Loading Visualization...</div>
</div>}>
  <AgentLoopFlow />
</Suspense>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional details about core concepts can be added here */}
            </div>
        </div>
    </section>
);

// --- SECTION: Core Data Structures ---
const CoreDataStructures = () => (
    <section id="data-structures" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <List className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> Core Data Structures
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-blue-700/30 shadow-lg">
                    <p className="mb-4">
                        The EideticEngine's Agent Master Loop is built on several key data structures that maintain state,
                        plans, goals, and system configuration:
                    </p>

                    {/* Agent State */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Settings className="w-5 h-5 mr-2 text-blue-400" /> AgentState
                        </h3>
                        <p className="mb-4 text-sm">
                            Core dataclass that tracks the agent's runtime state, including goals, plans,
                            memory indicators, and performance metrics.
                        </p>

                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-blue-700/20">
                            <CodeBlock language="python">
                                {`@dataclass
class AgentState:
    """Runtime state of the agent master loop."""
    
    # Core state
    goal_stack: List[str] = field(default_factory=list)
    current_plan: List[PlanStep] = field(default_factory=list)
    completed_steps: List[PlanStep] = field(default_factory=list)
    
    # Memory indicators
    memory_access_count: int = 0
    last_reflection_time: float = 0
    last_consolidation_time: float = 0
    
    # Performance metrics
    mental_momentum: float = 0.0  # 0.0 to 1.0 scale
    error_count: Dict[str, int] = field(default_factory=lambda: defaultdict(int))
    
    # Background tasks
    background_tasks: Dict[str, Any] = field(default_factory=dict)
    
    # Persistence
    should_save: bool = False
    state_modified: bool = False`}
                            </CodeBlock>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-700/20">
                                <h4 className="text-lg font-bold mb-2 text-blue-300 flex items-center">
                                    <Target className="w-4 h-4 mr-2 text-blue-400" /> Goal Management
                                </h4>
                                <p className="text-sm">
                                    Maintains a stack of goals with proper hierarchical relationships.
                                    The current goal is always at the top of the stack.
                                </p>
                            </div>

                            <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-700/20">
                                <h4 className="text-lg font-bold mb-2 text-blue-300 flex items-center">
                                    <Activity className="w-4 h-4 mr-2 text-blue-400" /> Mental Momentum
                                </h4>
                                <p className="text-sm">
                                    Tracks completion bias metric (0.0-1.0) to encourage follow-through
                                    on tasks before switching focus.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Plan Step */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <GitBranch className="w-5 h-5 mr-2 text-blue-400" /> PlanStep
                        </h3>
                        <p className="mb-4 text-sm">
                            Pydantic model representing a single step in the agent's execution plan,
                            with validation and structured representation.
                        </p>

                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-blue-700/20">
                            <CodeBlock language="python">
                                {`class PlanStep(BaseModel):
    """A step in the agent's plan."""
    
    description: str
    is_completed: bool = False
    requires_tool: Optional[str] = None
    expected_outcome: Optional[str] = None
    actual_outcome: Optional[str] = None
    start_time: Optional[float] = None
    end_time: Optional[float] = None
    
    # Dependency management
    depends_on: List[int] = Field(default_factory=list)
    blocking: List[int] = Field(default_factory=list)
    
    # Progress tracking
    progress: float = 0.0  # 0.0 to 1.0
    
    def mark_completed(self, outcome: str = None) -> None:
        """Mark this step as completed with the given outcome."""
        self.is_completed = True
        self.actual_outcome = outcome
        self.end_time = time.time()
        self.progress = 1.0`}
                            </CodeBlock>
                        </div>

                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                            <h4 className="text-md font-bold mb-2 text-blue-300">Key Capabilities</h4>
                            <ul className="text-sm list-disc list-inside space-y-1">
                                <li>Dependency tracking via <InlineCode>depends_on</InlineCode> and <InlineCode>blocking</InlineCode> fields</li>
                                <li>Tool usage identification through <InlineCode>requires_tool</InlineCode></li>
                                <li>Progress measurement with fractional <InlineCode>progress</InlineCode> value</li>
                                <li>Outcome validation comparing <InlineCode>expected_outcome</InlineCode> vs <InlineCode>actual_outcome</InlineCode></li>
                            </ul>
                        </div>
                    </div>

                    {/* Context Components */}
                        <div>
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Package className="w-5 h-5 mr-2 text-blue-400" /> ContextComponent
                            </h3>
                        <p className="mb-4 text-sm">
                            Structure for memory and context elements that feed into LLM prompts,
                            with priority, freshness and size management.
                        </p>

                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-blue-700/20">
                            <CodeBlock language="python">
                                {`@dataclass
class ContextComponent:
    """A component of the agent's context."""
    
    name: str
    content: str
    priority: int = 0  # Higher values = higher priority
    created_at: float = field(default_factory=time.time)
    last_accessed: float = field(default_factory=time.time)
    access_count: int = 0
    token_estimate: Optional[int] = None
    
    @property
    def freshness(self) -> float:
        """Return a freshness score (0.0-1.0) based on recency and access frequency."""
        recency = 1.0 / (1.0 + (time.time() - self.last_accessed) / 3600)
        frequency = min(1.0, self.access_count / 10)
        return (recency * 0.7) + (frequency * 0.3)
        
    def access(self) -> None:
        """Mark this component as accessed."""
        self.last_accessed = time.time()
        self.access_count += 1`}
                            </CodeBlock>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-700/20">
                                <h4 className="text-lg font-bold mb-2 text-blue-300 flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-blue-400" /> Context Prioritization
                                </h4>
                            <p className="text-sm">
                                    Uses both explicit priority setting and implicit freshness scoring
                                    to optimize context window utilization.
                                </p>
                            </div>

                            <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-700/20">
                                <h4 className="text-lg font-bold mb-2 text-blue-300 flex items-center">
                                    <Database className="w-4 h-4 mr-2 text-blue-400" /> Memory Integration
                                </h4>
                                <p className="text-sm">
                                    Components act as containers for memory elements, contextual
                                    data, tool results, and agent state information.
                                </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Key Constants and Configuration ---
const KeyConstantsAndConfiguration = () => (
    <section id="constants" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-green-400 flex-shrink-0" /> Key Constants and Configuration
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-green-700/30 shadow-lg">
                    <p className="mb-4">
                        The AML system utilizes carefully tuned parameters and constants to control its behavior,
                        memory management, and cognitive processes:
                    </p>

                    {/* Threshold Constants */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-green-300 flex items-center">
                            <Settings className="w-5 h-5 mr-2 text-green-400" /> Threshold Constants
                    </h3>
                        <p className="mb-4 text-sm">
                            Key parameters that control when various cognitive processes are triggered.
                        </p>

                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-green-700/20">
                            <CodeBlock language="python">
                                {`# Reflection thresholds
REFLECTION_INTERVAL_SECONDS = 300  # How often to trigger reflection
MIN_STEPS_BEFORE_REFLECTION = 5    # Minimum steps before reflecting
ERROR_REFLECTION_THRESHOLD = 3     # Errors before reflecting

# Mental momentum thresholds
MENTAL_MOMENTUM_DECAY = 0.1        # Rate of decay per cycle
MOMENTUM_THRESHOLD_HIGH = 0.7      # Threshold to maintain current approach
MOMENTUM_THRESHOLD_LOW = 0.3       # Threshold to consider approach change

# Context management
CONTEXT_TOKEN_TARGET = 6000        # Target token count for prompt context
CONTEXT_TOKEN_MAX = 8000           # Maximum token count before truncation
CONTEXT_PRIORITY_DEFAULT = 5       # Default priority for context components`}
                            </CodeBlock>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-900/40 p-4 rounded-lg border border-green-700/20">
                                <h4 className="text-lg font-bold mb-2 text-green-300 flex items-center">
                                    <Activity className="w-4 h-4 mr-2 text-green-400" /> Mental Momentum Parameters
                                </h4>
                                <p className="text-sm">
                                    Controls the agent's tendency to maintain focus on current goals vs. switching
                                    to different approaches through decay rates and thresholds.
                                </p>
                            </div>

                            <div className="bg-gray-900/40 p-4 rounded-lg border border-green-700/20">
                                <h4 className="text-lg font-bold mb-2 text-green-300 flex items-center">
                                    <Telescope className="w-4 h-4 mr-2 text-green-400" /> Reflection Triggers
                                </h4>
                                <p className="text-sm">
                                    Determines when the agent performs metacognitive operations based on
                                    time intervals, step counts, and error frequencies.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Prompt Sizing Constants */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-green-300 flex items-center">
                            <FileCode className="w-5 h-5 mr-2 text-green-400" /> Prompt Control Parameters
                        </h3>
                        <p className="mb-4 text-sm">
                            Constants that manage prompt composition, token allocation, and template selection.
                        </p>

                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-green-700/20">
                            <CodeBlock language="python">
                                {`# Prompt composition
SYSTEM_PROMPT_TOKENS = 1200         # Approx tokens for system prompt
AGENT_STATE_TOKENS = 800            # Tokens reserved for agent state
WORKING_MEMORY_TOKENS = 3000        # Tokens for working memory components
TOOL_RESULT_TOKENS = 1500           # Tokens for recent tool results
EPISODIC_MEMORY_TOKENS = 1500       # Tokens for episodic memories

# Template selections
STANDARD_LOOP_TEMPLATE = "agent_loop_standard"
ERROR_RECOVERY_TEMPLATE = "agent_loop_error_recovery"
REFLECTION_TEMPLATE = "agent_loop_reflection"
PLANNING_TEMPLATE = "agent_loop_planning"`}
                            </CodeBlock>
                        </div>

                        <div className="bg-green-900/20 p-4 rounded-lg border border-green-700/30">
                            <h4 className="text-md font-bold mb-2 text-green-300 flex items-center">
                                <Scale className="w-4 h-4 mr-2 text-green-400" /> Token Budget Allocation
                            </h4>
                            <p className="text-sm mb-3">
                                The AML carefully allocates its token budget across different categories of information:
                            </p>

                            <div className="relative h-12 bg-gray-800/70 rounded-lg overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-blue-800/60 w-[15%]" style={{ width: '15%' }}>
                                    <div className="h-full flex items-center justify-center text-xs font-medium text-blue-100">System</div>
                                </div>
                                <div className="absolute inset-y-0 left-[15%] bg-green-800/60" style={{ width: '10%' }}>
                                    <div className="h-full flex items-center justify-center text-xs font-medium text-green-100">State</div>
                                </div>
                                <div className="absolute inset-y-0 left-[25%] bg-purple-800/60" style={{ width: '37.5%' }}>
                                    <div className="h-full flex items-center justify-center text-xs font-medium text-purple-100">Working Memory</div>
                                </div>
                                <div className="absolute inset-y-0 left-[62.5%] bg-amber-800/60" style={{ width: '18.75%' }}>
                                    <div className="h-full flex items-center justify-center text-xs font-medium text-amber-100">Tool Results</div>
                                </div>
                                <div className="absolute inset-y-0 left-[81.25%] bg-red-800/60" style={{ width: '18.75%' }}>
                                    <div className="h-full flex items-center justify-center text-xs font-medium text-red-100">Episodic</div>
                                </div>
                            </div>

                            <p className="text-xs text-green-200/70 mt-2 text-center">
                                Approximate token allocation in a standard 8,000 token context window
                            </p>
                        </div>
                    </div>

                    {/* Error Classification */}
                            <div>
                        <h3 className="text-xl font-bold mb-4 text-green-300 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-green-400" /> Error Classification
                        </h3>
                        <p className="mb-4 text-sm">
                            Detailed error typing system for tracking, diagnosing, and recovering from different error types.
                        </p>

                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-green-700/20">
                            <CodeBlock language="python">
                                {`# Error classifications
ERROR_CATEGORIES = {
    "tool_execution": {
        "description": "Errors related to tool execution",
        "recovery_strategy": "retry_with_alternate_tool"
    },
    "parsing": {
        "description": "Errors parsing tool output or agent responses",
        "recovery_strategy": "structured_reprompt"
    },
    "context_limit": {
        "description": "Errors related to context size limits",
        "recovery_strategy": "aggressive_context_pruning"
    },
    "goal_conflict": {
        "description": "Errors due to conflicting goals",
        "recovery_strategy": "goal_stack_reorganization"
    },
    "external_api": {
        "description": "Errors from external API calls",
        "recovery_strategy": "exponential_backoff"
    },
    "memory_access": {
        "description": "Errors accessing memory systems",
        "recovery_strategy": "memory_system_reconnect"
    }
}`}
                            </CodeBlock>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-900/40 p-4 rounded-lg border border-green-700/20">
                                <h4 className="text-lg font-bold mb-2 text-green-300 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Recovery Strategies
                                </h4>
                                <p className="text-sm">
                                    Each error category has an associated recovery strategy that guides the
                                    agent's response to that particular failure mode.
                                </p>
                            </div>

                            <div className="bg-gray-900/40 p-4 rounded-lg border border-green-700/20">
                                <h4 className="text-lg font-bold mb-2 text-green-300 flex items-center">
                                    <GitMerge className="w-4 h-4 mr-2 text-green-400" /> Error Tracking
                                </h4>
                                <p className="text-sm">
                                    Errors are counted by category, triggering reflection and strategy
                                    adjustment when certain thresholds are reached.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Comprehensive Error Handling System ---
const ErrorHandling = () => (
    <section id="error-handling" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <AlertTriangle className="w-8 h-8 mr-3 text-red-400 flex-shrink-0" /> Comprehensive Error Handling System
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-red-700/30 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-300 flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" /> Error Categorization
                            </h3>
                            <p className="text-sm">
                                Maintains structured error info in <InlineCode>state.last_error_details</InlineCode> (tool name, args, message, status code, categorized type) allowing targeted recovery.
                            </p>

                            <div className="mt-4 bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                                <h4 className="font-bold text-red-300 mb-2">Error Types</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-xs bg-gray-900/50 p-2 rounded">InvalidInputError</div>
                                    <div className="text-xs bg-gray-900/50 p-2 rounded">DependencyNotMetError</div>
                                    <div className="text-xs bg-gray-900/50 p-2 rounded">ServerUnavailable</div>
                                    <div className="text-xs bg-gray-900/50 p-2 rounded">PlanUpdateError</div>
                                    <div className="text-xs bg-gray-900/50 p-2 rounded">GoalManagementError</div>
                                    <div className="text-xs bg-gray-900/50 p-2 rounded">ResourceError</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-300 flex items-center">
                                <Layers className="w-5 h-5 mr-2 text-red-400" /> Multi-Layered Handling
                            </h3>

                            <ul className="space-y-2 list-disc pl-5 text-sm">
                                <li>Tool Call Level: Categorizes errors, updates state, sets replan flag.</li>
                                <li>LLM Level: Handles API errors, retries transients.</li>
                                <li>Plan Update Level: Marks steps failed, inserts analysis steps.</li>
                                <li>Main Loop Level: Checks consecutive error limit.</li>
                                <li>Background Task Level: Handles timeouts/exceptions without disruption.</li>
                                <li>Prompt Integration: Error details highlighted in LLM prompt.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                            <h3 className="text-lg font-bold mb-2 text-red-300">Retry Mechanism</h3>
                            <p className="text-xs text-gray-300">
                                Generic wrapper (<InlineCode>_with_retries</InlineCode>) provides exponential backoff, jitter, selective retry based on exception type and idempotency, cancellation detection.
                            </p>
                        </div>

                        <div className="bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                            <h3 className="text-lg font-bold mb-2 text-red-300">Dynamic Tool Availability</h3>
                            <p className="text-xs text-gray-300">
                                Handles unavailable tools by checking server status, implementing fallbacks (e.g., semantic-only search), and allowing graceful degradation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: State Persistence System ---
const StatePersistence = () => (
    <section id="persistence" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Database className="w-8 h-8 mr-3 text-blue-400 flex-shrink-0" /> State Persistence System
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-blue-700/30 shadow-lg h-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Database className="w-5 h-5 mr-2 text-blue-400" /> State Saving
                        </h3>

                        <p className="text-sm mb-4">
                            Implements atomically reliable saving to survive crashes:
                        </p>

                        <ul className="space-y-2 list-disc pl-5 text-sm">
                            <li>Serializes state (handling non-serializable fields)</li>
                            <li>Writes to process-specific temp file</li>
                            <li>Ensures disk write with <InlineCode>os.fsync</InlineCode></li>
                            <li>Atomically replaces old file with <InlineCode>os.replace</InlineCode></li>
                            <li>Handles errors gracefully, preserving original file on failure</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-blue-700/30 shadow-lg h-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                            <Database className="w-5 h-5 mr-2 text-blue-400" /> State Loading
                        </h3>

                        <p className="text-sm mb-4">
                            Handles robust restoration:
                        </p>

                        <ul className="space-y-2 list-disc pl-5 text-sm">
                            <li>Reads/parses JSON</li>
                            <li>Handles field conversions (PlanStep, defaultdict, etc.)</li>
                            <li>Validates/corrects data (threshold bounds, goal stack consistency)</li>
                            <li>Recovers from errors (file not found, decode errors, structure mismatch)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Shutdown Mechanisms ---
const ShutdownMechanisms = () => (
    <section id="shutdown" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Zap className="w-8 h-8 mr-3 text-red-400 flex-shrink-0" /> Shutdown Mechanisms
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-red-700/30 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-300 flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-red-400" /> Graceful Shutdown
                            </h3>

                            <p className="text-sm mb-4">
                                <InlineCode>shutdown</InlineCode> method:
                            </p>

                            <div className="bg-gray-900/60 p-4 rounded-lg border border-red-700/20">
                                <ol className="space-y-1 list-decimal pl-5 text-xs">
                                    <li>Sets shutdown event</li>
                                    <li>Waits for background tasks</li>
                                    <li>Saves final state</li>
                                    <li>Logs completion</li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-300 flex items-center">
                                <RefreshCw className="w-5 h-5 mr-2 text-red-400" /> Signal Propagation
                            </h3>

                            <div className="bg-gray-900/60 p-4 rounded-lg border border-red-700/20">
                                <ul className="space-y-1 list-disc pl-5 text-xs">
                                    <li>Main loop checks event</li>
                                    <li>Background tasks cancelled via <InlineCode>_cleanup_background_tasks</InlineCode></li>
                                    <li>Retries aborted if event set</li>
                                    <li>Periodic tasks check event and break</li>
                                </ul>
                            </div>

                            <div className="mt-4 bg-red-900/20 p-3 rounded-lg border border-red-700/30">
                                <p className="text-xs">
                                    OS signals (SIGINT, SIGTERM) caught by asyncio signal handlers, triggering the internal shutdown sequence.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                        <h3 className="text-lg font-bold mb-2 text-red-300">Race Mechanism</h3>
                        <p className="text-sm">
                            Uses <InlineCode>asyncio.wait</InlineCode> with <InlineCode>FIRST_COMPLETED</InlineCode> to race the main run task against the stop event task, ensuring prompt response.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- SECTION: Driver and Entry Point Functionality ---
const DriverEntryPoint = () => (
    <section id="driver" className="mb-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
                <Terminal className="w-8 h-8 mr-3 text-emerald-400 flex-shrink-0" /> Driver and Entry Point Functionality
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6 text-gray-300">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 p-6 rounded-xl border border-emerald-700/30 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-emerald-300 flex items-center">
                                <Terminal className="w-5 h-5 mr-2 text-emerald-400" /> Main Driver Function
                            </h3>

                            <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-700/30">
                                <p className="text-sm">
                                    <InlineCode>run_agent_process</InlineCode> manages the complete agent lifecycle:
                                </p>

                                <ul className="mt-3 space-y-1 list-disc pl-5 text-xs">
                                    <li>Setup (MCPClient, Anthropic, signals)</li>
                                    <li>Initialization</li>
                                    <li>Execution (racing run/stop tasks)</li>
                                    <li>Termination (shutdown, close connections, set exit code)</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-emerald-300 flex items-center">
                                <Code className="w-5 h-5 mr-2 text-emerald-400" /> Entry Point
                            </h3>

                            <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-700/30">
                                <p className="text-sm">
                                    <InlineCode>if __name__ == "__main__":</InlineCode> block:
                                </p>

                                <ul className="mt-3 space-y-1 list-disc pl-5 text-xs">
                                    <li>Configuration via environment variables</li>
                                    <li>Validation</li>
                                    <li>Config display</li>
                                    <li>Clean asyncio execution</li>
                                    <li>Initial interrupt handling</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Define section components
const OverviewAndArchitectureSection = OverviewAndArchitecture;
const CognitiveEngineMetaphorSection = CognitiveEngineMetaphor;
const AgentMasterLoopCoreImplementationSection = AgentMasterLoopCoreImplementation;
const PromptEngineeringSection = PromptEngineering;
const IntegrationArchitectureSection = IntegrationArchitecture;
const TokenEstimationAndContextManagementSection = TokenEstimationAndContextManagement;
const PracticalApplicationsSection = PracticalApplications;
const CognitiveSystemConclusionSection = CognitiveSystemConclusion;
const CoreDataStructuresSection = CoreDataStructures;
const CoreUtilityFunctionsSection = CoreUtilityFunctions;
const KeyConstantsAndConfigurationSection = KeyConstantsAndConfiguration;
const UmsToolConstantsSection = UmsToolConstants;
const ErrorHandlingSection = ErrorHandling;
const StatePersistenceSection = StatePersistence;
const ShutdownMechanismsSection = ShutdownMechanisms;
const DriverEntryPointSection = DriverEntryPoint;
const ArchitecturalOverviewSectionSection = ArchitecturalOverviewSection;
const LimitationsAndFutureSection = LimitationsAndFuture;

// Define the order and components for each section
const sections = [
    { id: 'overview', component: OverviewAndArchitectureSection },
    { id: 'cognitive-engine', component: CognitiveEngineMetaphorSection },
    { id: 'summary', component: ArchitecturalOverviewSectionSection }, 
    { id: 'core-impl', component: AgentMasterLoopCoreImplementationSection },
    { id: 'prompting', component: PromptEngineeringSection },
    { id: 'integration', component: IntegrationArchitectureSection },
    { id: 'context-management', component: TokenEstimationAndContextManagementSection },
    { id: 'applications', component: PracticalApplicationsSection },
    { id: 'cognitive-system', component: CognitiveSystemConclusionSection },
    { id: 'data-structures', component: CoreDataStructuresSection },
    { id: 'utilities-aml', component: CoreUtilityFunctionsSection },
    { id: 'constants', component: KeyConstantsAndConfigurationSection },
    { id: 'tool-constants', component: UmsToolConstantsSection },
    { id: 'error-handling', component: ErrorHandlingSection },
    { id: 'persistence', component: StatePersistenceSection },
    { id: 'shutdown', component: ShutdownMechanismsSection },
    { id: 'driver', component: DriverEntryPointSection },
    { id: 'limitations-future', component: LimitationsAndFutureSection },
];

// Main component to display the AML Technical Analysis
const AmlTechnicalAnalysis = () => {
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth < 768);
    const [showNavigation, setShowNavigation] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth >= 768);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const mainContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const mobile = window.innerWidth < 768;
                setIsMobile(mobile);
                setShowNavigation(window.innerWidth >= 768);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle scroll for progress bar and active section
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
            setScrollProgress(currentProgress);

            // Update active section based on scroll position
            const sections = [
                'overview',
                'cognitive-engine',
                'summary',
                'data-structures',
                'core-impl',
                'prompting',
                'integration',
                'context-management',
                'applications',
                'cognitive-system',
                'utilities-aml',
                'constants',
                'tool-constants',
                'error-handling',
                'persistence',
                'shutdown',
                'driver',
                'limitations-future'
            ];

            const scrollOffset = window.innerHeight * 0.4;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element && element.offsetTop <= window.scrollY + scrollOffset) {
                    setActiveSection(sectionId);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
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

    // Define navigation items for this page
    const navItems = [
        { id: 'overview', name: 'Overview', icon: <Eye className="w-4 h-4" /> },
        { id: 'cognitive-engine', name: 'Cognitive Engine Metaphor', icon: <Brain className="w-4 h-4" /> },
        { id: 'summary', name: 'Architectural Overview', icon: <Brain className="w-4 h-4" /> },
        { id: 'core-impl', name: 'Core Implementation', icon: <Cpu className="w-4 h-4" /> },
        { id: 'prompting', name: 'Prompt Engineering', icon: <FileCode className="w-4 h-4" /> },
        { id: 'integration', name: 'Integration Architecture', icon: <GitMerge className="w-4 h-4" /> },
        { id: 'context-management', name: 'Context Management', icon: <Package className="w-4 h-4" /> },
        { id: 'applications', name: 'Practical Applications', icon: <Lightbulb className="w-4 h-4" /> },
        { id: 'cognitive-system', name: 'Cognitive System', icon: <Server className="w-4 h-4" /> },
        { id: 'data-structures', name: 'Data Structures', icon: <List className="w-4 h-4" /> },
        { id: 'utilities-aml', name: 'Core Utilities', icon: <Settings className="w-4 h-4" /> },
        { id: 'constants', name: 'Constants & Config', icon: <Settings className="w-4 h-4" /> },
        { id: 'tool-constants', name: 'UMS Tool Constants', icon: <Database className="w-4 h-4" /> },
        { id: 'error-handling', name: 'Error Handling', icon: <AlertTriangle className="w-4 h-4" /> },
        { id: 'persistence', name: 'State Persistence', icon: <Database className="w-4 h-4" /> },
        { id: 'shutdown', name: 'Shutdown Mechanisms', icon: <Zap className="w-4 h-4" /> },
        { id: 'driver', name: 'Driver & Entry Point', icon: <Terminal className="w-4 h-4" /> },
        { id: 'limitations-future', name: 'Limitations & Future', icon: <Compass className="w-4 h-4" /> },
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
            href: "/",
            title: "Back to Main",
            description: "EideticEngine Overview",
            icon: <Brain className="w-5 h-5 text-purple-300" />,
            bgColorClass: "from-purple-900/50 to-purple-800/30 hover:from-purple-800/60 hover:to-purple-700/40",
            textColorClass: "text-purple-300"
        }
    ];

    // Add swipe-to-open useEffect hook
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
            
            // NOTE: No section swipe logic in this component, so we don't need the second part
        };
        
        // Attach event listeners
        content.addEventListener('touchstart', handleTouchStart, { passive: true });
        content.addEventListener('touchmove', handleTouchMove, { passive: false }); // Keep false in case other move logic is added
        
        return () => {
          content.removeEventListener('touchstart', handleTouchStart);
          content.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isMobile, showNavigation, setShowNavigation]); // Dependencies for the swipe logic

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
                <main 
                    ref={mainContentRef}
                    className="flex-1 transition-all duration-300 ease-in-out ml-0 md:ml-64 overflow-x-hidden"
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                        {/* Title Section */}
                        <section className="py-16 mb-16">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <RefreshCw className="w-20 h-20 text-purple-500" />
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                        Agent Master Loop (AML)
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                                    Technical Analysis and Implementation Details
                                </p>
                            </div>
                        </section>

                        {/* Render sections dynamically */}
                        {sections.map(({ id, component: Component }) => (
                            <Component key={id} />
                        ))}

                        {/* NOTE: Other sections mentioned in the user's list (Driver)
                             were not defined as separate components in the provided code and thus cannot be reordered here.
                             Their content might be within other components or the main AmlTechnicalAnalysis component itself. */}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AmlTechnicalAnalysis;