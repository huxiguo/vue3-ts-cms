import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// 自动导入
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ['vue', 'pinia', 'vue-router'],
			eslintrc: {
				enabled: true
			}
		}),
		// 组件
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
