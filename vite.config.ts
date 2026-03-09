import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // Automatically injects SCSS mixins and breakpoint variables globally into all SCSS files
        additionalData: `
          @use '@styles/mixins' as *;
          @use '@styles/breakpoints' as *;
        `,
      },
    },
  },
});
