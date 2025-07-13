// frontend/vite.config.ts

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const VITE_BASE_URL = process.env.VITE_BASE_URL || '/';

export default defineConfig({
  plugins: [react()],
  base: VITE_BASE_URL, 
})