import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        laravel([
            "resources/css/app.css",
            "resources/js/app.js",
        ]),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@inertiajs-tables': resolve(__dirname, '../js'),
        },
    },
    server: {
        watch: {
            // Exclude folders that can cause memory issues
            ignored: [
                '**/node_modules/**',
                '**/vendor/**',
                '**/storage/**',
                '**/bootstrap/cache/**',
                '**/.git/**',
                '../node_modules/**',
                '../vendor/**'
            ]
        },
        fs: {
            // Limit folder access to avoid recursive inclusions
            allow: [
                // Dossier courant
                '.',
                // Dossier parent pour les composants
                '../js'
            ]
        }
    },
    optimizeDeps: {
        // Limit dependencies to optimize to reduce memory usage
        include: [
            'vue',
            '@inertiajs/vue3',
            'lodash-es',
            'qs'
        ]
    }
});
