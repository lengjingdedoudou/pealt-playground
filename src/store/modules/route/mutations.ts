import { MutationTree } from 'vuex';
import { Routes } from '@/app/shared/types/route';
import { constantRoutes } from '@/app/routes/routes.module';
import { RouterMutationTypes } from './mutation-types';
import { RouteState } from './state';

export type Mutations<S = RouteState> = {
	[RouterMutationTypes.SET_ROUTES](state: S, routes: Routes): void;
	[RouterMutationTypes.SET_DEFAULT_ROUTES](state: S, routes: Routes): void;
	[RouterMutationTypes.SET_TOPBAR_ROUTES](state: S, routes: Routes): void;
	[RouterMutationTypes.SET_SIDEBAR_ROUTERS](state: S, routes: Routes): void;
};

export const mutations: MutationTree<RouteState> & Mutations = {
	[RouterMutationTypes.SET_ROUTES](state, routes) {
		state.addRoutes = routes;
		state.routes = constantRoutes.concat(routes);
	},
	[RouterMutationTypes.SET_DEFAULT_ROUTES](state, routes) {
		state.defaultRoutes = constantRoutes.concat(routes);
	},
	[RouterMutationTypes.SET_TOPBAR_ROUTES](state, routes) {
		state.topbarRouters = routes;
	},
	[RouterMutationTypes.SET_SIDEBAR_ROUTERS](state, routes) {
		state.sidebarRouters = routes;
	}
};
