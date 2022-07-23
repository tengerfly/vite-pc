const path = require("path");
import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import legacyPlugin from '@vitejs/plugin-legacy';
// import qiankun from 'vite-plugin-qiankun';
/*
* 本地环境：base:''
* daily环境：base：https://qzz-static.forwe.store/okr-assets/
* gray环境：base：https://qzz-static.forwe.store/okr-assets-gray/
* prod环境：base：https://qzz-static.forwe.store/okr-assets-online/
* */
const envResolve = (mode) => {
	return loadEnv(mode, process.cwd());
};
const getEnv = function (env) {
	return envResolve(process.argv.pop())[env];
}
// useDevMode 开启时与热更新插件冲突
// 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响
const useDevMode = false;
let url = '';
let type = getEnv('VITE_PROJECT_ENV');
switch (type) {
	case 'dev':
		url = '/';
		break;
	case 'daily':
		url = 'https://qzz-static.forwe.store/okr-assets/';
		break;
	case 'gray':
		url = 'https://qzz-static.forwe.store/okr-assets-gray/';
		break;
	case 'prod':
		url = 'https://qzz-static.forwe.store/okr-assets-online/';
		break;
	default:
		url = '/';
}
export default defineConfig({
	base: url,
	server: {
		cors: true,
		proxy: {
			"/api": {
				target: "https://daily-okr.forwe.store",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: [{
			find: "@",
			replacement: path.resolve(__dirname, "src")
		}
		]
	},
	css: {
		postcss: {
			plugins: [
				{
					postcssPlugin: "internal:charset-removal",
					AtRule: {
						charset: (atRule) => {
							if (atRule.name === "charset") {
								atRule.remove();
							}
						},
					},
				},
			],
		},
	},
    build: {
        target: ['es2015']
    },
	plugins: [
		vue(),
		// qiankun('okr', {useDevMode}),
        // 兼容问题处理
        legacyPlugin({
            // 兼容的目标
            targets: ['chrome 52']
        }),
	],
});
