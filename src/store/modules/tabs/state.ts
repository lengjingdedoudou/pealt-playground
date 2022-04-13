import { RouteLocationNormalizedLoaded } from '@/app/shared/types/route';

export interface TabsState {
	visitedViews: RouteLocationNormalizedLoaded[];
	cachedViews: string[];
	/** 需要多开的页面，维护计数 */
	counter: {
		[name: string]: {
			/** 是否开启当前路由计数 `true`开启 (将计算当前所开页数)，并在view中返回*/
			isCounter: boolean;
			/** 所开页计数 */
			count: number;
			/** 所有多开页的路径 */
			paths: string[];
		};
	};
}

export const state: TabsState = {
	visitedViews: [],
	cachedViews: [],
	counter: {}
};
