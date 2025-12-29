
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Fate_Locked_Test/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
