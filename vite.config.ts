import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
          @use '@/styles/mixins' as *;
          @use '@/styles/breakpoints' as *;
        `,
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
