import { defineConfig } from 'vite';

export default defineConfig({
  // ... other configurations
  resolve: {
    alias: {
      '@': '/src', // Adjust the alias based on your project structure
    },
  },
});
