// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
    ],
    vite: {
        plugins: [tailwindcss()],
        build: {
            chunkSizeWarningLimit: 750,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules/three/')) {
                            return 'three';
                        }
                        if (id.includes('node_modules/@react-three/')) {
                            return 'react-three';
                        }
                    },
                },
            },
        },
    },
    // Enable View Transitions for seamless page navigation
    prefetch: true,
});
