import { MutationTree } from 'vuex';
import { RouteLocationNormalizedLoaded } from '@/app/shared/types/route';
import { TabsMutationTypes } from './mutation-types';
import { TabsState } from './state';

export type Mutations<S = TabsState> = {
	[TabsMutationTypes.SET_ADD_VISITED_VIEW](state: S, view: RouteLocationNormalizedLoaded): void;
	[TabsMutationTypes.SET_ADD_CACHED_VIEW](state: S, view: RouteLocationNormalizedLoaded): void;
	[TabsMutationTypes.SET_DEL_VISITED_VIEW](state: S, view: RouteLocationNormalizedLoaded): void;
	[TabsMutationTypes.SET_DEL_CACHED_VIEW](state: S, view: RouteLocationNormalizedLoaded): void;
	[TabsMutationTypes.SET_DEL_OTHERS_VISITED_VIEWS](state: S, view: RouteLocationNormalizedLoaded): void;
	[TabsMutationTypes.SET_DEL_OTHERS_CACHED_VIEWS](state: S, view: RouteLocationNormalizedLoaded): void;
	[TabsMutationTypes.SET_DEL_ALL_VISITED_VIEWS](state: S): void;
	[TabsMutationTypes.SET_DEL_ALL_CACHED_VIEWS](state: S): void;
	[TabsMutationTypes.SET_UPDATE_VISITED_VIEW](state: S, view: RouteLocationNormalizedLoaded): void;
};

export const mutations: MutationTree<TabsState> & Mutations = {
	[TabsMutationTypes.SET_ADD_VISITED_VIEW](state, view) {
		if (state.visitedViews.some(v => v.path === view.path)) return;
		const viewName = view.name as string;
		state.visitedViews.push(
			Object.assign({}, view, {
				title: view.meta.title || '未命名',
				count: state.counter[viewName] && state.counter[viewName].isCounter ? state.counter[viewName].count : ''
			})
		);
	},

	[TabsMutationTypes.SET_ADD_CACHED_VIEW](state, view) {
		const viewName = view.name as string;
		if (!view.meta.noCache && state.counter[viewName] !== undefined) {
			if (!state.counter[viewName].paths.includes(view.path)) {
				state.counter[viewName].count++;
				state.counter[viewName].paths.push(view.path);
			}
		}

		if (state.cachedViews.includes(viewName)) return;
		if (!view.meta.noCache) {
			state.cachedViews.push(viewName);
		}
	},

	[TabsMutationTypes.SET_DEL_VISITED_VIEW](state, view) {
		for (const [i, v] of state.visitedViews.entries()) {
			if (v.path === view.path) {
				state.visitedViews.splice(i, 1);
				break;
			}
		}
	},

	[TabsMutationTypes.SET_DEL_CACHED_VIEW](state, view) {
		const viewName = view.name as string;
		if (state.counter[viewName] !== undefined && state.counter[viewName].count > 0) {
			const index = state.counter[viewName].paths.indexOf(view.path);
			state.counter[viewName].count--;
			state.counter[viewName].paths.splice(index, 1);

			if (state.counter[viewName].count > 0) {
				return;
			}
		}

		const index = state.cachedViews.indexOf(viewName);
		index > -1 && state.cachedViews.splice(index, 1);
	},

	[TabsMutationTypes.SET_DEL_OTHERS_VISITED_VIEWS](state, view) {
		state.visitedViews = state.visitedViews.filter(v => {
			return v.meta.affix || v.path === view.path;
		});
	},

	[TabsMutationTypes.SET_DEL_OTHERS_CACHED_VIEWS](state, view) {
		const viewName = view.name as string;
		if (state.cachedViews.length > 0) {
			const index = state.cachedViews.indexOf(viewName);
			if (index > -1) {
				state.cachedViews = state.cachedViews.slice(index, index + 1);
			} else {
				// if index = -1, there is no cached tags
				state.cachedViews = [];
			}
		}
	},

	[TabsMutationTypes.SET_DEL_ALL_VISITED_VIEWS](state) {
		// keep affix tags
		const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
		state.visitedViews = affixTags;
	},

	[TabsMutationTypes.SET_DEL_ALL_CACHED_VIEWS](state) {
		state.cachedViews = [];
	},

	[TabsMutationTypes.SET_UPDATE_VISITED_VIEW](state, view) {
		for (let v of state.visitedViews) {
			if (v.path === view.path) {
				v = Object.assign(v, view, {
					title: view.meta._title || '未命名',
					refresh: view.meta._refresh
				});
				break;
			}
		}
	}
};
