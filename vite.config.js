import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'path';

import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    visualizer({open: true})
  ],

  // 配置别名
  resolve: {
    alias: {
      "@": resolve(__dirname, './src')
    }
  }
})




