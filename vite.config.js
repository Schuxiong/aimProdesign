import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/aimProdesign/',  // 修改为实际的仓库名
  plugins: [vue()],
}) 