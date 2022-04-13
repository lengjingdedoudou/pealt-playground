import BasicLayout from '@/app/layout/basic/index.vue';
import { Route, RouteItemOption, Routes } from '../types/route';
import { cacheSrv } from '@core/services/cache/cache.service';
import { AppConfig } from '@/app/core/config/app.config';

/** 后台查询的菜单数据拼装成路由格式的数据 */
export function generaMenu(routes: Routes, data: RouteItemOption[]) {
	data.forEach(({ path, visible, menuName, title, icon, noCache, component, children }) => {
		const menu: Route = {
			path,
			component: component === 'Layout' ? BasicLayout : loadView(component),
			hidden: visible !== '0',
			children: [],
			name: menuName,
			meta: {
				title,
				icon,
				noCache
			}
		};
		if (children) {
			generaMenu(menu.children as Routes, children);
		}
		routes.push(menu);
	});
}

/**  路由懒加载 */
export const loadView = (view: string) => {
	return () => import(`../../routes${view}.vue`);
};

export function getPageTitle(title: string) {
	const { sys_app_name } = cacheSrv.getNone(AppConfig.storageKey.localKeyAppCfg) || {};
	const suffix = sys_app_name || 'Playground';
	return title ? `${title} - ${suffix}` : title;
}
