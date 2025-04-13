import React, { useState, useEffect } from 'react';
import { Aperture, Brain, Cpu, Database, GitBranch, GitMerge, Layers, MessageCircle, Server, UserPlus, Zap, Clock, FileText, RefreshCw, GitCommit, Eye, Award, Bookmark, BarChart2, Map, Code } from 'lucide-react';

// Main App Component
const EideticEngineWebsite = () => {
  const [activeSection, setActiveSection] = useState('abstract');
  const [showNavigation, setShowNavigation] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 font-sans relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 z-40 shadow-xl border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="w-7 md:w-8 h-7 md:h-8 text-blue-500 mr-2 md:mr-3" />
            <h1 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              EideticEngine
            </h1>
          </div>
          <div className="flex">
            <button
              onClick={() => setShowNavigation(!showNavigation)}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center"
            >
              {showNavigation ? 'Hide' : 'Show'} <span className="hidden sm:inline ml-1">Navigation</span> <Map className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex pt-16">
        {/* Side Navigation */}
        <aside className={`fixed h-screen overflow-auto bg-gray-900 border-r border-gray-800 w-72 md:w-64 transition-all duration-300 ease-in-out z-30 ${showNavigation ? 'left-0' : '-left-72 md:-left-64'} md:left-0`}>
          {/* Mobile close button */}
          <div className="absolute top-4 right-4 md:hidden">
            <button
              onClick={() => setShowNavigation(false)}
              className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Close navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-4">
            <div className="mb-8">
              <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Navigation</h2>
              {[
                { id: 'abstract', name: 'Abstract', icon: <FileText className="w-4 h-4" /> },
                { id: 'introduction', name: 'Introduction', icon: <MessageCircle className="w-4 h-4" /> },
                { id: 'related-work', name: 'Related Work', icon: <GitBranch className="w-4 h-4" /> },
                { id: 'ums', name: 'Unified Memory System', icon: <Database className="w-4 h-4" /> },
                { id: 'aml', name: 'Agent Master Loop', icon: <RefreshCw className="w-4 h-4" /> },
                { id: 'mcp-client', name: 'MCP Client', icon: <UserPlus className="w-4 h-4" /> },
                { id: 'llm-gateway', name: 'LLM Gateway Server', icon: <Server className="w-4 h-4" /> },
                { id: 'evaluation', name: 'Evaluation & Cases', icon: <BarChart2 className="w-4 h-4" /> },
                { id: 'discussion', name: 'Discussion', icon: <GitCommit className="w-4 h-4" /> },
                { id: 'conclusion', name: 'Conclusion', icon: <Award className="w-4 h-4" /> },
                { id: 'future-work', name: 'Future Work', icon: <Zap className="w-4 h-4" /> },
                { id: 'addendum', name: 'Addendum', icon: <Bookmark className="w-4 h-4" /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    // Close navigation on mobile after clicking
                    if (window.innerWidth < 768) {
                      setShowNavigation(false);
                    }
                  }}
                  className={`flex items-center space-x-2 w-full text-left px-4 py-3.5 md:py-3 rounded-lg mb-2 md:mb-1 hover:bg-gray-800 transition-colors ${activeSection === item.id ? 'bg-blue-900 bg-opacity-40 text-blue-300' : 'text-gray-300'}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Mobile Navigation Toggle Button (Fixed at bottom) */}
        <div className="fixed bottom-6 left-4 z-40 md:hidden">
          <button
            onClick={() => setShowNavigation(!showNavigation)}
            className={`p-3.5 rounded-full shadow-xl ${showNavigation ? 'bg-blue-600' : 'bg-gray-800'} transition-colors border border-gray-700`}
            aria-label="Toggle navigation menu"
          >
            <Map className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${showNavigation ? 'md:ml-64' : 'ml-0'}`}>
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="py-10 md:py-24 mb-16">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Brain className="w-16 md:w-24 h-16 md:h-24 text-blue-500" />
                    <div className="absolute -top-2 -right-2 w-4 md:w-6 h-4 md:h-6 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 md:w-6 h-4 md:h-6 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                  </div>
                </div>
                <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    EideticEngine
                  </span>
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 mb-8">
                  An Adaptive Cognitive Architecture Integrating Multi-Level Memory,<br className="hidden md:block" />
                  Structured Orchestration, and Meta-Cognition for Advanced LLM Agents
                </p>
                <p className="text-gray-400 italic">By Jeffrey Emanuel, 4/13/2025</p>

                <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => window.open('https://github.com/Dicklesworthstone/ultimate_mcp_client/blob/main/eidetic_engine_paper.md', '_blank')}
                    className="px-4 md:px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium flex items-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Read Paper
                  </button>
                  <button
                    onClick={() => scrollToSection('architecture-visual')}
                    className="px-4 md:px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white font-medium flex items-center"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Architecture
                  </button>
                </div>
              </div>
            </section>

            {/* Architecture Visual */}
            <section id="architecture-visual" className="mb-16 md:mb-20 py-8 md:py-12 bg-gray-800 bg-opacity-30 rounded-xl mx-4 md:mx-auto">
              <div className="max-w-5xl mx-auto px-3 md:px-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  EideticEngine Architecture Overview
                </h2>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center md:items-stretch mb-10 md:mb-12">
                  <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700 flex-1 max-w-full md:max-w-md">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-blue-900 bg-opacity-40 rounded-full">
                        <Database className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-blue-300 text-center">Unified Memory System (UMS)</h3>
                    <p className="text-gray-300 mb-4">A persistent, multi-layered cognitive substrate with distinct memory types:</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <Clock className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-blue-300">Working Memory:</span> Active attention focus</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-blue-300">Episodic Memory:</span> Experience records</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <Brain className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-blue-300">Semantic Memory:</span> General knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <Code className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-blue-300">Procedural Memory:</span> Skills & procedures</span>
                      </li>
                    </ul>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-xs text-gray-400"><a href="https://github.com/Dicklesworthstone/llm_gateway_mcp_server/blob/main/llm_gateway/tools/cognitive_and_agent_memory.py" target="_blank" rel="noopener noreferrer">Implemented</a> with optimized SQLite, featuring hybrid search, explicit typing, metadata, and associative linking.</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700 flex-1 max-w-full md:max-w-md">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-purple-900 bg-opacity-40 rounded-full">
                        <RefreshCw className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-purple-300 text-center">Agent Master Loop (AML)</h3>
                    <p className="text-gray-300 mb-4">An adaptive control loop orchestrating perception-cognition-action:</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <GitBranch className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-purple-300">Structured Planning:</span> Dependency-aware steps</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <Layers className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-purple-300">Context Assembly:</span> Multi-faceted retrieval</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <GitCommit className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-purple-300">Meta-Cognition:</span> Reflection, consolidation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                          <Aperture className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300"><span className="font-medium text-purple-300">Adaptive Control:</span> Dynamic thresholds</span>
                      </li>
                    </ul>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-xs text-gray-400">Directs LLM reasoning, manages dependencies, recovers from errors, and orchestrates self-improvement cycles. Find implementation <a href="https://github.com/Dicklesworthstone/ultimate_mcp_client/blob/main/agent_master_loop.py" target="_blank" rel="noopener noreferrer">here</a>.</p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-12 md:mt-16 mb-8">
                  <div className="hidden md:block absolute w-3/4 h-1 bg-gradient-to-r from-blue-600 to-purple-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-32 relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="p-3 md:p-4 bg-blue-900 bg-opacity-40 rounded-full mb-4">
                        <Cpu className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                      </div>
                      <p className="font-bold text-blue-300">LLM Core</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-3 md:p-4 bg-purple-900 bg-opacity-40 rounded-full mb-4">
                        <Server className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
                      </div>
                      <p className="font-bold text-purple-300">Tool Ecosystem</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-3 md:p-4 bg-blue-900 bg-opacity-40 rounded-full mb-4">
                        <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                      </div>
                      <p className="font-bold text-blue-300">MCP Client</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700 max-w-3xl mx-auto mt-8 md:mt-12">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Key Innovation: Meta-Cognitive Cycle
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-xs md:max-w-md h-28 md:h-32 relative">
                      {/* Meta-cognitive cycle visualization */}
                      <div className="absolute w-24 md:w-32 h-24 md:h-32 rounded-full border-3 md:border-4 border-dashed border-blue-500 top-0 left-1/2 transform -translate-x-1/2 animate-spin" style={{ animationDuration: '20s' }}></div>
                      <div className="absolute w-16 md:w-24 h-16 md:h-24 rounded-full border-3 md:border-4 border-purple-500 top-4 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full p-2 md:p-3">
                        <Brain className="w-6 h-6 md:w-10 md:h-10 text-white" />
                      </div>

                      {/* Labels with better visibility for mobile */}
                      <div className="absolute top-0 left-1/4 -translate-x-6 md:-translate-x-4 bg-gray-900 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs text-blue-300">Reflection</div>
                      <div className="absolute bottom-0 left-1/4 -translate-x-6 md:-translate-x-4 bg-gray-900 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs text-purple-300">Consolidation</div>
                      <div className="absolute top-0 right-1/4 translate-x-6 md:translate-x-4 bg-gray-900 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs text-blue-300">Promotion</div>
                      <div className="absolute bottom-0 right-1/4 translate-x-6 md:translate-x-4 bg-gray-900 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs text-purple-300">Adaptation</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-center mt-6 md:mt-8 text-sm md:text-base">
                    The agent actively improves its cognitive operation through reflection, knowledge consolidation,
                    memory promotion, and adaptive threshold adjustment based on performance metrics.
                  </p>
                </div>
              </div>
            </section>

            {/* Abstract Section */}
            <section id="abstract" className="mb-12 md:mb-16 scroll-mt-24 md:scroll-mt-32 px-4 md:px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                  Abstract
                </h2>
                <div className="prose prose-sm md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6">
                  <p>
                    Large Language Models (LLMs) form the reasoning core of increasingly sophisticated autonomous agents.
                    However, unlocking their full potential for complex, long-horizon tasks requires architectures that
                    transcend reactive loops and shallow memory.
                  </p>

                  <p>
                    We present <strong className="text-blue-300">EideticEngine</strong>, a novel cognitive architecture designed to
                    imbue LLM agents with robust memory, structured planning, and adaptive self-management capabilities
                    inspired by cognitive science.
                  </p>

                  <p>
                    EideticEngine integrates two key components:
                  </p>

                  <ol>
                    <li>
                      <strong className="text-blue-300">Unified Memory System (UMS)</strong>: A persistent, multi-level
                      cognitive workspace implemented on an optimized asynchronous database, featuring distinct memory types
                      (working, episodic, semantic, procedural), rich metadata (importance, confidence, TTL), explicit typed
                      linking, hybrid search (semantic, keyword, relational), and integrated workflow tracking.
                      <br />
                      <br />

                    </li>

                    <li>
                      <strong className="text-purple-300">Agent Master Loop (AML)</strong>: An adaptive orchestrator that
                      directs an LLM using the UMS. The AML manages structured, dependency-aware plans, dynamically assembles
                      comprehensive context, handles errors resiliently, and crucially, orchestrates agent-driven meta-cognition.
                    </li>
                  </ol>

                  <p>
                    Through specific UMS tools, the agent actively reflects on its performance, consolidates knowledge,
                    promotes memories between cognitive levels, manages its attentional focus, and even manages distinct
                    reasoning threads. Furthermore, EideticEngine incorporates an adaptive control layer where meta-cognitive
                    parameters are dynamically adjusted based on real-time operational statistics.
                  </p>

                  <p>
                    We provide detailed simulations and analysis demonstrating EideticEngine's ability to autonomously navigate
                    complex analytical and creative tasks, exhibiting structured learning, error recovery, and adaptive
                    behavior.
                  </p>
                </div>
              </div>
            </section>

            {/* Introduction Section */}
            <section id="introduction" className="mb-12 md:mb-16 scroll-mt-24 md:scroll-mt-32 px-4 md:px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  1. Introduction: Towards Cognitive Autonomy in LLM Agents
                </h2>
                <div className="prose prose-sm md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6">
                  <p>
                    The remarkable generative and reasoning abilities of Large Language Models (LLMs) have catalyzed the
                    development of autonomous agents aimed at complex problem-solving. Yet, the transition from impressive
                    demonstrations to robust, reliable agents capable of sustained, adaptive operation across diverse,
                    long-horizon tasks remains a formidable challenge.
                  </p>

                  <p>Current agent frameworks often grapple with fundamental limitations:</p>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2">
                        <div className="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center">
                          <span className="text-red-300 text-xs">✕</span>
                        </div>
                      </div>
                      <span><strong className="text-red-300">Memory Persistence & Structure:</strong> Reliance on ephemeral prompt
                        context or simplistic memory buffers hinders long-term learning, recall of structured knowledge, and
                        understanding of temporal or causal relationships.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2">
                        <div className="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center">
                          <span className="text-red-300 text-xs">✕</span>
                        </div>
                      </div>
                      <span><strong className="text-red-300">Planning & Execution:</strong> Ad-hoc or reactive planning struggles
                        with complex sequences, interdependencies, and resource management. Lack of explicit dependency tracking
                        leads to brittleness and execution failures.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2">
                        <div className="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center">
                          <span className="text-red-300 text-xs">✕</span>
                        </div>
                      </div>
                      <span><strong className="text-red-300">Adaptation & Learning:</strong> Most agents lack mechanisms for
                        reflecting on past actions, learning from errors, synthesizing experiences into general knowledge, or
                        adapting their strategies based on performance.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-2">
                        <div className="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center">
                          <span className="text-red-300 text-xs">✕</span>
                        </div>
                      </div>
                      <span><strong className="text-red-300">Cognitive Coherence:</strong> Agents often lack a unified internal
                        state representation that integrates perception, memory, reasoning, planning, and action within a
                        consistent framework.</span>
                    </li>
                  </ul>

                  <p>
                    To address these critical gaps, we introduce <strong className="text-blue-300">EideticEngine</strong>, a
                    comprehensive cognitive architecture designed explicitly for orchestrating advanced LLM agents. EideticEngine
                    is not merely an LLM wrapper or a collection of tools; it is an integrated system built upon two deeply
                    interconnected components.
                  </p>

                  <p>
                    EideticEngine's core hypothesis is that by tightly integrating a structured, cognitive-inspired memory system
                    with an adaptive, meta-cognitively capable control loop, we can create LLM agents that exhibit
                    significantly greater autonomy, robustness, learning capability, and effectiveness on complex, real-world
                    tasks.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Work Section */}
            <section id="related-work" className="mb-12 md:mb-16 scroll-mt-24 md:scroll-mt-32 px-4 md:px-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  2. Related Work: Building on and Departing From Existing Paradigms
                </h2>
                <div className="prose prose-sm md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6">
                  <p>EideticEngine differentiates itself from several established lines of research:</p>

                  <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-2 text-blue-300">Standard LLM Agent Frameworks</h3>
                      <p className="text-gray-300">
                        While providing valuable abstractions for tool use and basic memory, these frameworks typically lack a deeply integrated,
                        multi-level cognitive memory model with explicit linking and dynamic evolution; structured planning with
                        robust dependency checking; agent-driven meta-cognitive tools; and adaptive control mechanisms.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        <em>Examples: LangChain, LlamaIndex</em>
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-2 text-blue-300">Early Autonomous Agents</h3>
                      <p className="text-gray-300">
                        These pioneering efforts demonstrated the potential of LLM loops but suffered from unreliable planning,
                        simplistic memory, lack of error recovery, and significant coherence issues over longer runs. EideticEngine
                        addresses these directly with structured UMS, planning, dependency checks, and meta-cognition.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        <em>Examples: AutoGPT, BabyAGI</em>
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-2 text-blue-300">Memory-Augmented LLMs</h3>
                      <p className="text-gray-300">
                        These focus on enhancing LLM capabilities by providing access to external or specialized memory during
                        generation. EideticEngine complements this by providing a persistent, structured internal memory system that
                        tracks the agent's own experiences, thoughts, actions, and synthesized knowledge.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        <em>Examples: MemGPT, RAG systems</em>
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-2 text-blue-300">LLM Planning & Reasoning Techniques</h3>
                      <p className="text-gray-300">
                        These enhance the LLM's internal reasoning process, often within a single prompt or short interaction
                        sequence. EideticEngine operates at a higher architectural level, orchestrating these reasoning steps within
                        a persistent framework.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        <em>Examples: ReAct, Chain-of-Thought, Tree-of-Thoughts</em>
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-2 text-blue-300">Classical Cognitive Architectures</h3>
                      <p className="text-gray-300">
                        These offer rich, theoretically grounded models of cognition, often based on symbolic rule systems or
                        specialized memory structures. EideticEngine adopts key principles from cognitive architectures but implements
                        them within a practical, LLM-native framework.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        <em>Examples: SOAR, ACT-R, OpenCog</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* UMS Section */}
            <section id="ums" className="mb-12 md:mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  3. The Unified Memory System (UMS): A Cognitive Substrate for Agents
                </h2>

                <div className="bg-blue-900 bg-opacity-20 rounded-xl p-4 md:p-6 border border-blue-800 shadow-lg mb-6 md:mb-8">
                  <div className="flex items-center mb-3 md:mb-4">
                    <Database className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2 md:mr-3" />
                    <h3 className="text-lg md:text-xl font-bold text-blue-300">Memory System Overview</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300">
                    The foundation of the EideticEngine architecture is the Unified Memory System (UMS), a persistent and structured
                    cognitive workspace designed to move beyond the limitations of simple memory buffers or isolated vector
                    stores. It serves not just as a repository of information, but as an active substrate for the agent's
                    learning, reasoning, and operational history.
                  </p>
                </div>

                <div className="prose prose-sm md:prose-lg prose-invert max-w-none space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-300">3.1. Multi-Level Cognitive Memory Hierarchy</h3>

                  <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="border border-blue-800 rounded-lg p-3 md:p-4 bg-blue-900 bg-opacity-20">
                        <h4 className="font-bold text-blue-300 mb-1 md:mb-2">Working Memory</h4>
                        <p className="text-xs md:text-sm text-gray-300">Explicitly managed outside the main memories table, capacity-constrained and dynamically optimized to maintain a focused attentional set.</p>
                      </div>

                      <div className="border border-blue-800 rounded-lg p-3 md:p-4 bg-blue-900 bg-opacity-20">
                        <h4 className="font-bold text-blue-300 mb-1 md:mb-2">Episodic Memory</h4>
                        <p className="text-xs md:text-sm text-gray-300">Directly captures agent experiences, records associated with specific actions, thoughts, or artifacts, often with shorter default TTL values.</p>
                      </div>

                      <div className="border border-blue-800 rounded-lg p-3 md:p-4 bg-blue-900 bg-opacity-20">
                        <h4 className="font-bold text-blue-300 mb-1 md:mb-2">Semantic Memory</h4>
                        <p className="text-xs md:text-sm text-gray-300">Represents generalized knowledge, facts, insights, summaries, or stable profiles, often resulting from consolidation or promotion processes.</p>
                      </div>

                      <div className="border border-blue-800 rounded-lg p-3 md:p-4 bg-blue-900 bg-opacity-20">
                        <h4 className="font-bold text-blue-300 mb-1 md:mb-2">Procedural Memory</h4>
                        <p className="text-xs md:text-sm text-gray-300">Encodes learned skills or multi-step procedures, primarily populated via promotion from highly accessed, high-confidence semantic memories.</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-300">3.2. Rich Metadata and Cognitive Attributes</h3>

                  <p className="text-sm md:text-base">
                    Each memory entry carries crucial metadata enabling cognitive processing:
                  </p>

                  <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                    <li>
                      <strong className="text-blue-300">Importance & Confidence:</strong> Explicit fields allow the agent to assign
                      subjective value and certainty to information, critical for prioritization and belief revision.
                    </li>
                    <li>
                      <strong className="text-blue-300">Temporal Dynamics:</strong> Timestamps combined with access counts and
                      TTL enable relevance calculations and automatic expiration, giving the memory system temporal dynamics.
                    </li>
                    <li>
                      <strong className="text-blue-300">Provenance & Context:</strong> Foreign keys directly link memories to
                      their operational origins, providing rich contextual grounding.
                    </li>
                    <li>
                      <strong className="text-blue-300">Flexible Categorization:</strong> Besides memory levels and types,
                      memories have a JSON tags field, allowing for multi-dimensional categorization and retrieval.
                    </li>
                  </ul>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 mt-6 md:mt-8 text-blue-300">3.3. Structured Associative Memory Graph</h3>

                  <div className="bg-gray-800 rounded-xl p-8 mb-8 mx-auto max-w-3xl">
                    <div className="flex flex-col items-center">
                      {/* Memory graph container */}
                      <div className="relative w-full md:w-96 h-64 md:h-96 bg-gray-900 rounded-2xl p-4 md:p-8 mb-6 md:mb-8 shadow-xl">
                        {/* Central node - Fact */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         w-16 md:w-20 h-16 md:h-20 rounded-full bg-blue-600 border-4 border-blue-300 shadow-2xl
                         flex items-center justify-center z-20 transition-transform hover:scale-110">
                          <span className="text-xs md:text-sm font-bold text-blue-50">Fact</span>
                        </div>

                        {/* Satellite nodes with improved positioning */}
                        {[
                          { name: "Event", position: "top-8 md:top-12 left-1/2 -translate-x-1/2", color: "green", bgClass: "bg-green-600", borderClass: "border-green-300" },
                          { name: "Insight", position: "top-1/3 right-6 md:right-12", color: "purple", bgClass: "bg-purple-600", borderClass: "border-purple-300" },
                          { name: "Action", position: "bottom-8 md:bottom-12 left-1/2 -translate-x-1/2", color: "yellow", bgClass: "bg-yellow-600", borderClass: "border-yellow-300" },
                          { name: "Profile", position: "top-1/3 left-6 md:left-12", color: "red", bgClass: "bg-red-600", borderClass: "border-red-300" }
                        ].map((node, index) => (
                          <div key={index}
                            className={`absolute ${node.position} w-12 md:w-16 h-12 md:h-16 rounded-full 
                            ${node.bgClass} border-4 ${node.borderClass} shadow-lg
                            flex items-center justify-center z-10 transition-all
                            hover:scale-110 hover:shadow-2xl`}>
                            <span className="text-xs font-semibold text-white">{node.name}</span>
                          </div>
                        ))}

                        {/* Connection lines and labels */}
                        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 400">
                          {/* Connection paths with curved lines */}
                          <path d="M200 200 Q200 100 200 100" stroke="#4da6ff" strokeWidth="3" fill="none" />
                          <path d="M200 200 Q250 150 300 150" stroke="#9f7aea" strokeWidth="3" fill="none" />
                          <path d="M200 200 Q200 300 200 300" stroke="#eab308" strokeWidth="3" fill="none" />
                          <path d="M200 200 Q150 150 100 150" stroke="#ef4444" strokeWidth="3" fill="none" />

                          {/* Labels with better positioning */}
                          <g className="font-semibold text-xs md:text-sm">
                            <text x="180" y="40" className="fill-blue-300">CAUSAL</text>
                            <text x="280" y="120" className="fill-purple-300">SUPPORTS</text>
                            <text x="180" y="370" className="fill-yellow-300">SOURCE</text>
                            <text x="40" y="120" className="fill-red-300">ABOUT</text>
                          </g>
                        </svg>
                      </div>

                      {/* Description box */}
                      <div className="bg-gray-900 p-4 md:p-6 rounded-xl w-full space-y-3 md:space-y-4 border border-gray-700">
                        <h3 className="text-base md:text-lg font-bold text-center text-blue-400 mb-1 md:mb-2">
                          Memory Graph Structure
                        </h3>
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed text-center">
                          The UMS constructs a strongly-typed knowledge graph through the
                          <code className="mx-1 px-1 md:px-2 py-0.5 md:py-1 bg-gray-800 rounded-md text-blue-200">memory_links</code>
                          table, supporting multiple relationship types:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 mt-2 md:mt-4">
                          {['RELATED', 'CAUSAL', 'SUPPORTS', 'CONTRADICTS', 'HIERARCHICAL', 'SEQUENTIAL', 'REFERENCES'].map((type, index) => (
                            <span key={type}
                              className={`px-2 md:px-3 py-1 bg-gray-800 rounded-full text-xs md:text-sm text-center text-cyan-300
                           ${index === 6 ? 'md:col-start-2' : ''}`}>
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-blue-300">3.4-3.7. Advanced UMS Features</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold text-blue-300 mb-2">Deep Workflow Integration</h4>
                      <p className="text-sm text-gray-300">Actions, thoughts, and artifacts are automatically linked to corresponding memories, providing comprehensive traceability.</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold text-blue-300 mb-2">Hybrid & Configurable Retrieval</h4>
                      <p className="text-sm text-gray-300">Multiple, complementary search mechanisms: semantic, keyword & attribute, hybrid, and relational, optimized for different information needs.</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold text-blue-300 mb-2">Knowledge Evolution</h4>
                      <p className="text-sm text-gray-300">Active processes for consolidation, promotion, and reflection integration refine and structure knowledge over time.</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold text-blue-300 mb-2">Robust Implementation</h4>
                      <p className="text-sm text-gray-300">Asynchronous design, optimized SQL, structured data handling, and comprehensive auditing ensure reliability and performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AML Section */}
            <section id="aml" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  4. The Agent Master Loop (AML): Adaptive Orchestration and Meta-Cognition
                </h2>

                <div className="bg-purple-900 bg-opacity-20 rounded-xl p-6 border border-purple-800 shadow-lg mb-8">
                  <div className="flex items-center mb-4">
                    <RefreshCw className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Loop Overview</h3>
                  </div>
                  <p className="text-gray-300">
                    While the UMS provides the cognitive substrate, the Agent Master Loop (AML) acts as the central executive,
                    orchestrating the agent's perception-cognition-action cycle to achieve complex goals. It transcends simple
                    reactive loops by implementing structured planning, sophisticated context management, robust error handling,
                    and, critically, adaptive meta-cognitive control.
                  </p>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">4.1. Structured, Dependency-Aware Planning</h3>

                  <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex items-start mb-4">
                      <div className="p-2 bg-purple-900 bg-opacity-40 rounded-lg mr-4 flex-shrink-0">
                        <GitBranch className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-300 mb-2">Plan Management</h4>
                        <p className="text-sm text-gray-300">
                          The AML manages an explicit, dynamic plan within its state, represented as a list of PlanStep objects
                          with status tracking, tool assignments, and crucially, dependency management.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono text-gray-300 mb-4 overflow-auto">
                      <pre>{`PlanStep(
  description="Analyze market sentiment from recent reports",
  status="planned",
  assigned_tool="corpus_search",
  tool_args={"query": "market sentiment reports Q2 2025"},
  depends_on=["action_12345", "action_67890"],
  result_summary=None
)`}</pre>
                    </div>

                    <p className="text-sm text-gray-300">
                      Before executing any PlanStep, the AML verifies that all listed prerequisites have been successfully
                      completed. If dependencies are unmet, execution is blocked and the agent is forced to reconsider
                      the plan. This mechanism prevents cascading failures common in agents without dependency management.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-purple-300">4.2. Multi-Faceted Context Assembly</h3>

                  <p>
                    The AML recognizes that effective LLM reasoning requires rich context beyond simple chat history.
                    The _gather_context function actively probes the UMS to construct a comprehensive snapshot:
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        <span className="font-medium text-purple-300">Operational State:</span> Current loop count, error details, workflow ID
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        <span className="font-medium text-purple-300">Working Memory:</span> Current attentional focus
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        <span className="font-medium text-purple-300">Proactive Goal-Relevant Memory:</span> Task-related information
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        <span className="font-medium text-purple-300">Procedural Knowledge:</span> How-to information
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        <span className="font-medium text-purple-300">Core History Summary:</span> Recent actions, important memories
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-900 bg-opacity-30 p-1 rounded-full mr-2 mt-1">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        <span className="font-medium text-purple-300">Meta-Cognitive Feedback:</span> Last reflection insights
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-bold mb-4 mt-8 text-purple-300">4.3. Adaptive Meta-Cognitive Control</h3>

                  <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <p className="text-gray-300 mb-4">
                      This is perhaps the most innovative aspect of the AML. It doesn't just execute tasks; it monitors and
                      regulates its own cognitive processes:
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-purple-300 mb-3">The Meta-Cognitive Cycle</h4>
                      <div className="relative py-6">
                        <div className="absolute left-0 w-full h-0.5 bg-gray-700"></div>

                        {/* Meta-cognitive steps */}
                        <div className="flex justify-between relative">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mb-2"></div>
                            <div className="w-24 text-center">
                              <span className="text-xs font-medium text-purple-300">Reflection</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mb-2"></div>
                            <div className="w-24 text-center">
                              <span className="text-xs font-medium text-purple-300">Consolidation</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mb-2"></div>
                            <div className="w-24 text-center">
                              <span className="text-xs font-medium text-purple-300">Memory Optimization</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mb-2"></div>
                            <div className="w-24 text-center">
                              <span className="text-xs font-medium text-purple-300">Threshold Adaptation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-purple-300">Triggering Meta-Cognition</h5>
                        <p className="text-sm text-gray-300">
                          The AML checks various conditions: action counts vs. dynamic thresholds, state flags, and periodic intervals.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-purple-300">Meta-Cognitive Tools</h5>
                        <p className="text-sm text-gray-300">
                          The agent can generate reflections, consolidate memories, optimize working memory, update focus, and promote memories.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-purple-300">Adaptive Threshold Adjustment</h5>
                        <p className="text-sm text-gray-300">
                          The system dynamically adjusts the frequency of reflection and consolidation based on runtime statistics, enabling self-regulation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-purple-300">4.4-4.5. Additional AML Features</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold text-purple-300 mb-2">Robust Execution & Error Handling</h4>
                      <p className="text-sm text-gray-300">Comprehensive tool server discovery, automatic action recording, dependency tracking, error classification, and background task management.</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold text-purple-300 mb-2">Thought Chain Management</h4>
                      <p className="text-sm text-gray-300">Tracks and manages multiple reasoning threads, allowing the agent to switch context and organize complex reasoning paths.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MCP Client Section */}
            <section id="mcp-client" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  5. The Ultimate MCP Client: Facilitating Cognitive Orchestration
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p>
                    The EideticEngine architecture, while powerful conceptually, relies on a robust communication and interaction
                    layer to bridge the Agent Master Loop (AML) with the Unified Memory System (UMS) and other potential
                    external tools. The <a href="https://github.com/Dicklesworthstone/ultimate_mcp_client" target="_blank" rel="noopener noreferrer"><strong className="text-blue-300">Ultimate MCP Client</strong></a> provides this critical "glue,"
                    offering a feature-rich environment specifically designed to support the complex needs of advanced
                    cognitive agents like EideticEngine.
                  </p>

                  <div className="bg-gray-800 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-bold mb-4 text-center text-blue-300">Key MCP Client Features</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <Server className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-sm mb-1">Unified Access</h4>
                          <p className="text-xs text-gray-300">Discovers, connects, and manages multiple MCP servers through a single interface</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <RefreshCw className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-sm mb-1">Robust Communication</h4>
                          <p className="text-xs text-gray-300">Asynchronous architecture, specialized handling, retry logic, circuit breaking</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <GitBranch className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-sm mb-1">Conversation Management</h4>
                          <p className="text-xs text-gray-300">Branching structure, forking, context optimization</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <Database className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-sm mb-1">Tool Result Caching</h4>
                          <p className="text-xs text-gray-300">In-memory and disk-based caching with configurable TTLs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <BarChart2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-sm mb-1">Observability</h4>
                          <p className="text-xs text-gray-300">OpenTelemetry integration, detailed monitoring, performance metrics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg mr-3 flex-shrink-0">
                          <Layers className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-300 text-sm mb-1">Interactive Interfaces</h4>
                          <p className="text-xs text-gray-300">CLI, Web UI, and API endpoints for diverse interaction patterns</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>
                    The client abstracts the complexity of distributed tools through a unified interface, routing requests to
                    the appropriate servers. Its robust error handling, caching, and observability features significantly
                    enhance the stability and performance of the EideticEngine agent during operation.
                  </p>
                </div>
              </div>
            </section>

            {/* LLM Gateway Section */}
            <section id="llm-gateway" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  6. The LLM Gateway Server: An Ecosystem of Tools for Cognitive Agents
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p>
                    The EideticEngine architecture relies not only on its internal logic (AML) and its cognitive substrate (UMS) but also
                    on a rich ecosystem of external capabilities accessible via the Model Context Protocol (MCP). The <a href="https://github.com/Dicklesworthstone/llm_gateway_mcp_server" target="_blank" rel="noopener noreferrer"><strong className="text-purple-300">LLM Gateway Server</strong></a>
                    hosts the UMS tools alongside a powerful suite of complementary tools, significantly expanding the agent's operational repertoire.
                  </p>

                  <div className="bg-gray-800 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-bold mb-6 text-center text-purple-300">Tool Ecosystem</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-center mb-3">
                          <div className="p-2 bg-purple-900 bg-opacity-40 rounded-full">
                            <Cpu className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                        <h4 className="text-center font-medium text-purple-300 mb-2">Core Capabilities</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>• Multi-Provider LLM Access</li>
                          <li>• Embedding Services</li>
                          <li>• Vector Database Services</li>
                          <li>• Caching Infrastructure</li>
                          <li>• Prompt Management</li>
                        </ul>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-center mb-3">
                          <div className="p-2 bg-purple-900 bg-opacity-40 rounded-full">
                            <FileText className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                        <h4 className="text-center font-medium text-purple-300 mb-2">Document & Data Tools</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>• Advanced Extraction Tools</li>
                          <li>• Document Processing</li>
                          <li>• Secure Filesystem Access</li>
                          <li>• Local Text Processing</li>
                          <li>• RAG & Knowledge Base Tools</li>
                        </ul>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-center mb-3">
                          <div className="p-2 bg-purple-900 bg-opacity-40 rounded-full">
                            <Zap className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                        <h4 className="text-center font-medium text-purple-300 mb-2">Advanced Capabilities</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>• Web Browser Automation</li>
                          <li>• Optimization & Meta Tools</li>
                          <li>• Tournament Evaluation</li>
                          <li>• Model Comparison</li>
                          <li>• Workflow Orchestration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p>
                    It's crucial to understand that the UMS is implemented as a collection of tools within the broader LLM Gateway
                    MCP Server. The AML, via the Ultimate MCP Client, interacts with the UMS not through direct database calls,
                    but by invoking specific unified_memory:* tools registered on the Gateway server. This modular design offers
                    several advantages:
                  </p>

                  <ul>
                    <li><strong className="text-purple-300">Decoupling:</strong> The agent's core logic is decoupled from the specific implementation details of the memory system.</li>
                    <li><strong className="text-purple-300">Extensibility:</strong> New memory features can be added without requiring changes to the AML itself.</li>
                    <li><strong className="text-purple-300">Standardized Interaction:</strong> All interactions occur through the unified MCP interface.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Evaluation Section */}
            <section id="evaluation" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  7. Evaluation & Case Studies: Demonstrating Cognitive Capabilities
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p>
                    We evaluated EideticEngine's architecture through detailed simulations of two distinct, complex tasks, tracing
                    the agent's internal state and UMS interactions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-bold mb-4 text-blue-300">Case Study 1: Financial Market Analysis</h3>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <GitBranch className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Structure:</span> Created separate thought chains for distinct analysis streams
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <Layers className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Plan & Depend:</span> Generated multi-step plans with explicit dependencies
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <Database className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Remember & Retrieve:</span> Stored key facts, searched corpus, retrieved for synthesis
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <GitMerge className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Link:</span> Explicitly connected related concepts and leveraged auto-linking
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <RefreshCw className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Reflect & Adapt:</span> Identified gaps and adjusted thresholds based on metrics
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-blue-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <Brain className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-blue-300">Synthesize:</span> Generated high-level insights connecting disparate facts
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-bold mb-4 text-purple-300">Case Study 2: Creative Concept Development</h3>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <MessageCircle className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Ideate & Structure:</span> Brainstormed concepts, selected one, checked novelty
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <FileText className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Develop & Persist:</span> Created character profiles and story arcs in semantic memory
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <Layers className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Iterate & Track:</span> Generated script scenes with incremental artifact updates
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <Database className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Utilize Context:</span> Retrieved profiles when generating subsequent scenes
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="p-1 bg-purple-900 bg-opacity-30 rounded-full mr-2 mt-1">
                            <Award className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-purple-300">Finalize:</span> Retrieved draft, performed final formatting, saved output
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>
                    Across both studies, the EideticEngine architecture facilitated successful completion of complex, multi-phase tasks.
                    The UMS provided the necessary persistence and structure, while the AML successfully orchestrated the LLM,
                    managed dependencies, recovered from simulated errors, and utilized meta-cognitive tools. The adaptive
                    thresholds demonstrated self-regulation of cognitive overhead.
                  </p>
                </div>
              </div>
            </section>

            {/* Discussion Section */}
            <section id="discussion" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  8. Discussion: Implications of the EideticEngine Architecture
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p>
                    EideticEngine demonstrates a path towards more capable and autonomous LLM agents by integrating principles from
                    cognitive science with robust software engineering. Key implications include:
                  </p>

                  <div className="bg-gray-800 rounded-lg p-6 my-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-900 bg-opacity-40 mr-3 flex-shrink-0">
                          <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-blue-300 mb-1">Beyond Reactive Agents</h3>
                          <p className="text-sm text-gray-300">
                            EideticEngine moves agents from simple stimulus-response loops towards goal-directed, reflective, and adaptive
                            behavior based on persistent internal state.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-purple-900 bg-opacity-40 mr-3 flex-shrink-0">
                          <GitBranch className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-purple-300 mb-1">Scalability for Complex Tasks</h3>
                          <p className="text-sm text-gray-300">
                            Structured planning, dependency management, and modular thought chains enable tackling problems that
                            overwhelm simpler architectures due to context limitations or lack of coherence.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-900 bg-opacity-40 mr-3 flex-shrink-0">
                          <RefreshCw className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-blue-300 mb-1">Emergent Learning and Adaptation</h3>
                          <p className="text-sm text-gray-300">
                            The combination of reflection, consolidation, memory promotion, and adaptive thresholds allows the
                            agent to refine its knowledge base and operational strategy over time based on its experience.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-purple-900 bg-opacity-40 mr-3 flex-shrink-0">
                          <Eye className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-purple-300 mb-1">Introspection and Explainability</h3>
                          <p className="text-sm text-gray-300">
                            The detailed logging in the UMS and visualization tools provide unprecedented insight into the agent's
                            "reasoning" process, aiding debugging and analysis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-red-300">Limitations</h3>

                  <p>
                    EideticEngine still relies heavily on the quality of the core LLM's reasoning, planning, and tool-use abilities.
                    The overhead of UMS interaction could be significant for highly real-time tasks (though optimizations mitigate
                    this). The heuristics for memory promotion and threshold adaptation are currently rule-based and could be
                    further refined.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion Section */}
            <section id="conclusion" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  9. Conclusion: A Cognitive Leap for Agent Architectures
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p>
                    We introduced EideticEngine, an adaptive cognitive architecture enabling LLM agents to manage complex tasks through
                    the tight integration of a Unified Memory System (UMS) and an Agent Master Loop (AML). By incorporating
                    multi-level memory, structured planning with dependency checking, agent-driven meta-cognition, and adaptive
                    self-regulation of cognitive processes, EideticEngine demonstrates a significant advance over existing agent paradigms.
                  </p>

                  <p>
                    Our simulations highlight its ability to support sustained, goal-directed, and introspective behavior on
                    challenging analytical and creative tasks. EideticEngine offers a robust and extensible blueprint for the next
                    generation of autonomous AI systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Future Work Section */}
            <section id="future-work" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  10. Future Work
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-3">
                        <BarChart2 className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-bold text-blue-300">Quantitative Benchmarking</h3>
                      </div>
                      <p className="text-sm text-gray-300">
                        Rigorous evaluation against state-of-the-art baselines on complex, multi-step agent benchmarks.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-3">
                        <Brain className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-bold text-blue-300">Advanced Adaptation & Learning</h3>
                      </div>
                      <p className="text-sm text-gray-300">
                        Exploring reinforcement learning or other ML techniques to optimize adaptive thresholds, meta-cognitive strategy selection, and procedural skill derivation.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-3">
                        <UserPlus className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-bold text-blue-300">Multi-Agent Systems</h3>
                      </div>
                      <p className="text-sm text-gray-300">
                        Extending EideticEngine to support collaborative tasks with shared UMS spaces and coordinated planning protocols.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-3">
                        <Clock className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-bold text-blue-300">Real-Time Interaction</h3>
                      </div>
                      <p className="text-sm text-gray-300">
                        Investigating architectural adaptations for tighter perception-action loops in dynamic environments.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-3">
                        <GitMerge className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-bold text-blue-300">Theoretical Grounding</h3>
                      </div>
                      <p className="text-sm text-gray-300">
                        Further formalizing the EideticEngine loop and memory dynamics in relation to established cognitive science models and decision theory.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-3">
                        <Aperture className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-bold text-blue-300">Hybrid Reasoning</h3>
                      </div>
                      <p className="text-sm text-gray-300">
                        Integrating symbolic planners or knowledge graph reasoning engines that can interact with the UMS and the LLM via the AML.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Addendum Section */}
            <section id="addendum" className="mb-16 scroll-mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Addendum: Additional Technical Insights
                </h2>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p>
                    This addendum provides additional technical insights and practical implementation details that complement
                    the main paper by focusing on aspects not previously covered in depth.
                  </p>

                  <div className="space-y-6 my-8">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3 text-blue-300">1. Low-Level Implementation Considerations</h3>
                      <p className="text-gray-300 text-sm">
                        While the main paper details the architectural design, these additional implementation considerations are
                        crucial for real-world deployment: transaction management, memory compression strategies, embedding caching,
                        retry logic patterns, and memory garbage collection.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3 text-blue-300">2. Operational Statistics and Telemetry</h3>
                      <p className="text-gray-300 text-sm">
                        The EideticEngine implementation includes comprehensive telemetry options: performance metrics, memory usage patterns,
                        tool usage heat maps, reflection effectiveness measures, and detailed token consumption tracking.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3 text-blue-300">3. Micro-Level Decision Handling</h3>
                      <p className="text-gray-300 text-sm">
                        Beyond the AML's general flow, these micro-level decision processes provide additional insight: response
                        parsing strategy, tool selection orchestration, error classification system, conversation management,
                        and LLM-specific optimizations.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3 text-blue-300">4. Advanced Meta-Cognitive Mechanisms</h3>
                      <p className="text-gray-300 text-sm">
                        Beyond basic reflection and consolidation: self-directed learning, context switching costs modeling,
                        emotional simulation for creative tasks, counterfactual exploration, and memory confidence calibration.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3 text-blue-300">5. Micro-Task Case Studies</h3>
                      <p className="text-gray-300 text-sm">
                        Detailed micro-task examples revealing EideticEngine's operation at a granular level: knowledge integration
                        challenge, dynamic planning adaptation, and long-duration task management.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3 text-blue-300">6. Implementation Architecture Variants</h3>
                      <p className="text-gray-300 text-sm">
                        EideticEngine's architecture allows for specialized variants: distributed UMS for high-throughput, multimodal
                        extension for non-text modalities, resource-constrained variant for edge devices, multi-agent configuration,
                        and human-in-the-loop orchestration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-24 mb-8 text-center">
              <p className="text-gray-400">© 2025 Jeffrey Emanuel. EideticEngine: An Adaptive Cognitive Architecture for LLM Agents.</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button className="text-gray-400 hover:text-gray-200 transition-colors">
                  <GitBranch className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-200 transition-colors">
                  <Award className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-200 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EideticEngineWebsite;
