/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  // 添加公共目录配置
  publicDir: 'public',
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    // 启用代码分割
    rollupOptions: {
      output: {
        // 分割 vendor 代码
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'sonner', 'recharts'],
          utils: ['clsx', 'tailwind-merge', 'zod']
        }
      }
    }
  },
  // 服务器配置（开发环境）
  server: {
    port: 3000,
    open: true,
    // 代理配置（如果需要）
    proxy: {
      // 示例：'/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      // }
    }
  }
});