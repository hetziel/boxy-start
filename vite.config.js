import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const version = '0.25.4.1';

export default defineConfig({
    build: {
        outDir: 'dist', // Carpeta de salida principal
        emptyOutDir: true, // Limpia la carpeta de salida antes de compilar
        rollupOptions: {
            input: {
                index: './index.html', // Entrada para index.html
                'boxy': './src/scss/boxy.scss', // Entrada para boxy.scss
                'boxy-grid': './src/scss/boxy-grid.scss', // Entrada para boxy-grid.scss
                'boxy-script': './src/js/boxy.js', // Entrada para boxy.js
            },
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.includes('boxy')) {
                        return `cdn/[name]-${version}[extname]`; // Envía los archivos "boxy" a /cdn/ con versión
                    }
                    return `assets/[name][extname]`; // Envía los demás a /assets/ sin versión
                },
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name.includes('boxy')) {
                        return `cdn/[name]-${version}.js`; // Envía los archivos "boxy" a /cdn/ con versión
                    }
                    return `assets/[name].js`; // Envía los demás a /assets/ sin versión
                },
                chunkFileNames: (chunkInfo) => {
                    if (chunkInfo.name.includes('boxy')) {
                        return `cdn/[name]-${version}.js`; // Envía los chunks "boxy" a /cdn/ con versión
                    }
                    return `assets/[name].js`; // Envía los demás chunks a /assets/ sin versión
                },
            },
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'dist/cdn',
                    dest: '../projects'
                }
            ],
            watch: true
        })
    ],
    server: {
        open: false,
    },
});