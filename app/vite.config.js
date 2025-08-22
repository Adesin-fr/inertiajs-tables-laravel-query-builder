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
            // Exclure les dossiers qui peuvent causer des problèmes de mémoire
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
            // Limiter l'accès aux dossiers pour éviter les inclusions récursives
            allow: [
                // Dossier courant
                '.',
                // Dossier parent pour les composants
                '../js'
            ]
        }
    },
    optimizeDeps: {
        // Limiter les dépendances à optimiser pour réduire l'usage mémoire
        include: [
            'vue',
            '@inertiajs/vue3',
            'lodash-es',
            'qs'
        ]
    }
});
