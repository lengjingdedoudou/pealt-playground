import type { RouteMeta as VueRouteMeta, RouteRecordRaw, _RouteLocationBase } from 'vue-router';

export declare interface RouteMeta extends VueRouteMeta {
	/** 页面标题 */
	title?: string;
	/** 图标 */
	icon?: string;
	/** 不需要缓存 */
	noCache?: boolean;
	/** 如果设置为true，标签将会被粘贴到标签视图中 */
	affix?: boolean;
	/** 如果设置了path，侧边栏将突出显示您设置的路径 */
	activeMenu?: string;
	/** 控制页面角色(您可以设置多个角色) */
	roles?: string[];

	/** 更新tabs标题用 */
	_title?: string;
	/** 刷新时间戳 */
	_refresh?: number;
}

export declare type Route = RouteRecordRaw & { meta?: RouteMeta } & { children?: Routes } & {
	name?: string;
	title?: string;
	refresh?: number;

	parentPath?: string;
	/** 如果设置为true, item将不会显示在侧边栏中(默认为false) */
	hidden?: boolean;
	/** 如果设置为true，将始终显示根菜单 */
	alwaysShow?: boolean;
};

export declare type Routes = Route[];

export declare interface RouteLocationNormalizedLoaded extends _RouteLocationBase {
	meta: RouteMeta;
	title: string;
	refresh?: number;
	count?: number | string;
}

/** 配置菜单数据 */
export interface RouteItemOption {
	RoleId: number;
	action: string;
	apis: string[];
	breadcrumb: string;
	children: RouteItemOption[];
	component: string;
	createBy: number;
	createdAt: string;
	dataScope: string;
	icon: string;
	isFrame: string;
	is_select: boolean;
	menuId: number;
	menuName: string;
	menuType: string;
	noCache: boolean;
	params: string;
	parentId: number;
	path: string;
	paths: string;
	permission: string;
	sort: number;
	sysApi: string[];
	title: string;
	updateBy: number;
	updatedAt: number;
	visible: string;
}
