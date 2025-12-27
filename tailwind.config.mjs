/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Core Cyber-Industrial palette
                obsidian: '#050505',
                void: '#0A0A0A',
                carbon: '#121212',
                graphite: '#1A1A1A',
                slate: '#2A2A2A',

                // Neon accents
                'cyber-lime': '#00FF9D',
                'electric-indigo': '#6366F1',
                'terminal-green': '#00FF41',
                'electric-purple': '#BF00FF',
                'warning-yellow': '#FFD700',
                'hot-pink': '#FF006E',

                // Glass effects
                'glass-white': 'rgba(255, 255, 255, 0.05)',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            fontSize: {
                'display-xl': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
                'display-lg': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
                'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
            },
            boxShadow: {
                'brutal': '4px 4px 0px 0px currentColor',
                'brutal-sm': '2px 2px 0px 0px currentColor',
                'brutal-lg': '8px 8px 0px 0px currentColor',
                'glow-lime': '0 0 20px rgba(0, 255, 157, 0.3)',
                'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
                'glow-purple': '0 0 20px rgba(191, 0, 255, 0.3)',
                'inner-glow': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            },
            borderWidth: {
                '3': '3px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'marquee': 'marquee 30s linear infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            backdropBlur: {
                'xs': '2px',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [],
};
