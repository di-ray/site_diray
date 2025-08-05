import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@udecode/plate-common/server',
      'zustand/traditional'
    ]
  },
  resolve: {
    alias: {
      '@udecode/plate-common/server': '@udecode/plate-common',
      'zustand/traditional': 'zustand'
    }
  }
});