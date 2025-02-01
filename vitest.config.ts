import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
    plugins: [svelte({ hot: !process.env.VITEST })],
    test: {
        globals: true,
        environment: 'jsdom',
        include: [
            'src/**/*.{test,spec}.{js,ts}',
            'test/**/*.{test,spec}.{js,ts}',
        ],
        setupFiles: ['./vitest-setup.ts'],
        environmentOptions: {
            jsdom: {
                resources: 'usable',
            },
        },
    },
    resolve: {
        alias: {
            $lib: path.resolve('./src/lib'),
            $app: path.resolve('./node_modules/@sveltejs/kit/src/runtime/app'),
        },
    },
})
