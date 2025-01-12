import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: './my-craftcms-app/web',
        emptyOutDir: true, 
    },
    root: 'src',
});