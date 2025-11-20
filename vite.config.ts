import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 重要：这里设置 GitHub 仓库名称作为基础路径
  // 如果你的仓库名不是 freight-forwarder-sim，请修改这里
  base: '/freight-forwarder-sim/',
});