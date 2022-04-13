import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import { RouterActionTypes } from './action-types';
import { RouterMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { RouteState } from './state';
import { getRoutes } from '@/app/core/api/admin/sys-menu';
import { RouteItemOption, Routes } from '@/app/shared/types/route';
import { generaMenu } from '@/app/shared/utils/route';
import { constantRoutes } from '@/app/routes/routes.module';

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RouteState, RootState>, 'commit'>;

export interface Actions {
	[RouterActionTypes.ACTION_GET_ROUTES]({ commit }: AugmentedActionContext): Promise<Routes>;
}

export const actions: ActionTree<RouteState, RootState> & Actions = {
	[RouterActionTypes.ACTION_GET_ROUTES]({ commit }) {
		return new Promise(resolve => {
			getRoutes().subscribe(data => {
				const loadMenuData: RouteItemOption[] = [];
				Object.assign(loadMenuData, data);

				const asyncRoutes: Routes = [];
				generaMenu(asyncRoutes, loadMenuData);
				commit(RouterMutationTypes.SET_ROUTES, asyncRoutes);

				const sidebarRoutes: Routes = [];
				generaMenu(sidebarRoutes, loadMenuData);
				commit(RouterMutationTypes.SET_SIDEBAR_ROUTERS, constantRoutes.concat(sidebarRoutes));
				commit(RouterMutationTypes.SET_DEFAULT_ROUTES, sidebarRoutes);
				commit(RouterMutationTypes.SET_TOPBAR_ROUTES, sidebarRoutes);
				resolve(asyncRoutes);
			});
		});
	}
};
