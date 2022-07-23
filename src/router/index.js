/**
 * Info:router模块
 * Author：yizui
 * Description:{
 *     1.redirect: '/objective/hello' 使用redirect解决主路由没有匹配的具体页面的问题
 *     2.meta: { requireLogin: true }, 只有经过身份验证的用户才能访问
 * }
 */
import {createRouter, createWebHistory} from "vue-router";
const routeConfig = [
	{
		path: '/',
		component: () => import("../pages/index.vue")
	}
];
//要匹配主应用路由
const history = createWebHistory('/');
const router = createRouter({
	history: history,
	routes: routeConfig,
});
export default router;
