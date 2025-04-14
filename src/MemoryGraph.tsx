import React, { useEffect } from 'react';

const MemoryGraph = () => {
    useEffect(() => {
        // Load anime.js dynamically
        import('animejs').then((animeModule) => {
            const anime = animeModule as any;
            
            // Animate arcs
            anime({
                targets: '.arc',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1500,
                delay: (el, i) => i * 250,
            });
    
            // Animate labels
            anime({
                targets: '.label',
                opacity: [0, 1],
                translateY: [20, 0],
                easing: 'easeOutQuad',
                duration: 800,
                delay: anime.stagger(200, { start: 1500 }),
            });
        });
    }, []);

    return (
        <div className="relative w-full md:w-96 h-64 md:h-96 bg-gray-900 rounded-2xl p-4 md:p-8 shadow-xl mx-auto">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                {/* Central Node */}
                <circle className="central-node" cx="200" cy="200" r="30" fill="#2563eb" />
                <text x="200" y="205" textAnchor="middle" className="fill-white font-bold text-sm">Fact</text>

                {/* Surrounding Nodes */}
                <circle className="node-event" cx="200" cy="100" r="20" fill="#16a34a" />
                <text x="200" y="105" textAnchor="middle" className="fill-white font-bold text-xs">Event</text>

                <circle className="node-insight" cx="290" cy="150" r="20" fill="#9333ea" />
                <text x="290" y="155" textAnchor="middle" className="fill-white font-bold text-xs">Insight</text>

                <circle className="node-action" cx="200" cy="300" r="20" fill="#ca8a04" />
                <text x="200" y="305" textAnchor="middle" className="fill-white font-bold text-xs">Action</text>

                <circle className="node-profile" cx="110" cy="150" r="20" fill="#dc2626" />
                <text x="110" y="155" textAnchor="middle" className="fill-white font-bold text-xs">Profile</text>

                {/* Connecting Arcs */}
                <path className="arc" d="M200 170 L200 120" stroke="#4da6ff" strokeWidth="3" />
                <path className="arc" d="M226.2 185.4 L272.5 159.7" stroke="#9f7aea" strokeWidth="3" />
                <path className="arc" d="M200 230 L200 280" stroke="#eab308" strokeWidth="3" />
                <path className="arc" d="M173.8 185.4 L127.5 159.7" stroke="#ef4444" strokeWidth="3" />

                {/* Relationship Labels */}
                <text className="label fill-blue-300 font-semibold text-xs" x="200" y="80" textAnchor="middle">CAUSAL</text>
                <text className="label fill-purple-300 font-semibold text-xs" x="330" y="150" textAnchor="middle">SUPPORTS</text>
                <text className="label fill-yellow-300 font-semibold text-xs" x="200" y="340" textAnchor="middle">SOURCE</text>
                <text className="label fill-red-300 font-semibold text-xs" x="70" y="150" textAnchor="middle">ABOUT</text>
            </svg>
        </div>
    );
};

export default MemoryGraph;