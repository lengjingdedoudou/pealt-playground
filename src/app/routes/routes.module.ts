import { createRouter, createWebHistory } from 'vue-router';
import { Routes } from '@/app/shared/types/route';

// layout
import LayoutBasic from '@/app/layout/basic/index.vue';
import LayoutBlank from '@/app/layout/blank/index.vue';
import LayoutPassport from '@/app/layout/passport/index.vue';

// views
import LoginView from '@/app/routes/login/index.vue';
import HomeView from '@/app/routes/home/index.vue';

// 注意，以 / 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。

export const constantRoutes: Routes = [
	{
		path: '/',
		redirect: '/home',
		component: LayoutBasic,
		hidden: true,
		children: [
			{
				path: 'home',
				component: HomeView,
				name: 'Home',
				meta: { title: '首页', affix: true }
			},
			{
				path: '/403',
				component: () => import('@/app/routes/error/403.vue'),
				hidden: true
			},
			{
				path: '/404',
				component: () => import('@/app/routes/error/404.vue'),
				hidden: true
			},
			{
				path: '/500',
				component: () => import('@/app/routes/error/500.vue'),
				hidden: true
			}
		]
	},
	{
		path: '/passport',
		component: LayoutPassport,
		hidden: true,
		children: [
			{
				path: 'login',
				component: LoginView,
				meta: { title: '登录', noCache: true }
			}
		]
	},
	{
		path: '/redirect',
		component: LayoutBasic,
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: () => import('@/app/routes/redirect/index.vue')
			}
		]
	},
	{
		path: '/blank',
		hidden: true,
		component: LayoutBlank
	}
];

const _createRouter = () => {
	return createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: constantRoutes,
		scrollBehavior(to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition;
			} else {
				return { top: 0 };
			}
		}
	});
};

const router = _createRouter();

export function resetRouter() {
	const newRouter = _createRouter();
	router.resolve = newRouter.resolve;
}

export default router;
