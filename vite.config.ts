import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [AntDesignVueResolver()]
		})
	],
	server: {
		port: 3000,
		open: false,
		proxy: {
			'/api': {
				target: 'http://47.96.36.207:8000',
				changeOrigin: true,
				secure: false
			},
			'/v1': {
				target: 'http://47.96.36.207:18080',
				changeOrigin: true,
				secure: false
			}
		}
	},
	root: 'src',
	base: './',
	envDir: '../',
	publicDir: '../public',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		assetsInlineLimit: 4 * 1024,
		chunkSizeWarningLimit: 2 * 1024
	},
	resolve: {
		alias: [
			{ find: /^~/, replacement: resolve(__dirname, '') },
			{
				find: /@core\//,
				replacement: pathResolve('src/app/core') + '/'
			},
			{
				find: /@shared\//,
				replacement: pathResolve('src/app/shared') + '/'
			},
			{
				find: /@components\//,
				replacement: pathResolve('src/app/components') + '/'
			},
			{
				find: /@env\//,
				replacement: pathResolve('src/environments') + '/'
			},
			{
				find: /@\//,
				replacement: pathResolve('src') + '/'
			}
		]
	}
});
