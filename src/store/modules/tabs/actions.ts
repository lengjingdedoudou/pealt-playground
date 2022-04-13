import { ActionContext, ActionTree } from 'vuex';
import { RouteLocationNormalizedLoaded } from '@/app/shared/types/route';
import { RootState } from '@/store';
import { TabsActionTypes } from './action-types';
import { TabsMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { TabsState } from './state';

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TabsState, RootState>, 'commit'>;

export interface Actions {
	[TabsActionTypes.ACTION_ADD_VIEW]({ dispatch }: AugmentedActionContext, view: RouteLocationNormalizedLoaded): void;
	[TabsActionTypes.ACTION_ADD_VISITED_VIEW]({ commit }: AugmentedActionContext, view: RouteLocationNormalizedLoaded): void;
	[TabsActionTypes.ACTION_ADD_CACHED_VIEW]({ commit }: AugmentedActionContext, view: RouteLocationNormalizedLoaded): void;

	[TabsActionTypes.ACTION_DEL_VIEW](
		{ dispatch, state }: AugmentedActionContext,
		view: RouteLocationNormalizedLoaded
	): Promise<{ visitedViews: RouteLocationNormalizedLoaded[]; cachedViews: string[] }>;
	[TabsActionTypes.ACTION_DEL_VISITED_VIEW](
		{ commit, state }: AugmentedActionContext,
		view: RouteLocationNormalizedLoaded
	): Promise<RouteLocationNormalizedLoaded[]>;
	[TabsActionTypes.ACTION_DEL_CACHED_VIEW](
		{ commit, state }: AugmentedActionContext,
		view: RouteLocationNormalizedLoaded
	): Promise<string[]>;

	[TabsActionTypes.ACTION_DEL_OTHERS_VIEWS](
		{ dispatch, state }: AugmentedActionContext,
		view: RouteLocationNormalizedLoaded
	): Promise<{ visitedViews: RouteLocationNormalizedLoaded[]; cachedViews: string[] }>;
	[TabsActionTypes.ACTION_DEL_OTHERS_VISITED_VIEWS](
		{ commit, state }: AugmentedActionContext,
		view: RouteLocationNormalizedLoaded
	): Promise<RouteLocationNormalizedLoaded[]>;
	[TabsActionTypes.ACTION_DEL_OTHERS_CACHED_VIEWS](
		{ commit, state }: AugmentedActionContext,
		view: RouteLocationNormalizedLoaded
	): Promise<string[]>;

	[TabsActionTypes.ACTION_DEL_ALL_VIEWS]({
		dispatch,
		state
	}: AugmentedActionContext): Promise<{ visitedViews: RouteLocationNormalizedLoaded[]; cachedViews: string[] }>;
	[TabsActionTypes.ACTION_DEL_ALL_VISITED_VIEWS]({ commit, state }: AugmentedActionContext): Promise<RouteLocationNormalizedLoaded[]>;
	[TabsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS]({ commit, state }: AugmentedActionContext): Promise<string[]>;

	[TabsActionTypes.ACTION_UPDATE_VISITED_VIEW]({ commit }: AugmentedActionContext, view: RouteLocationNormalizedLoaded): void;
}

export const actions: ActionTree<TabsState, RootState> & Actions = {
	[TabsActionTypes.ACTION_ADD_VIEW]({ dispatch }, view) {
		dispatch(TabsActionTypes.ACTION_ADD_VISITED_VIEW, view);
		dispatch(TabsActionTypes.ACTION_ADD_CACHED_VIEW, view);
	},
	[TabsActionTypes.ACTION_ADD_VISITED_VIEW]({ commit }, view) {
		commit(TabsMutationTypes.SET_ADD_VISITED_VIEW, view);
	},
	[TabsActionTypes.ACTION_ADD_CACHED_VIEW]({ commit }, view) {
		commit(TabsMutationTypes.SET_ADD_CACHED_VIEW, view);
	},

	[TabsActionTypes.ACTION_DEL_VIEW]({ dispatch, state }, view) {
		return new Promise(resolve => {
			dispatch(TabsActionTypes.ACTION_DEL_VISITED_VIEW, view);
			dispatch(TabsActionTypes.ACTION_DEL_CACHED_VIEW, view);
			resolve({
				visitedViews: [...state.visitedViews],
				cachedViews: [...state.cachedViews]
			});
		});
	},
	[TabsActionTypes.ACTION_DEL_VISITED_VIEW]({ commit, state }, view) {
		return new Promise(resolve => {
			commit(TabsMutationTypes.SET_DEL_VISITED_VIEW, view);
			resolve([...state.visitedViews]);
		});
	},
	[TabsActionTypes.ACTION_DEL_CACHED_VIEW]({ commit, state }, view) {
		return new Promise(resolve => {
			commit(TabsMutationTypes.SET_ADD_CACHED_VIEW, view);
			resolve([...state.cachedViews]);
		});
	},

	[TabsActionTypes.ACTION_DEL_OTHERS_VIEWS]({ dispatch, state }, view) {
		return new Promise(resolve => {
			dispatch(TabsActionTypes.ACTION_DEL_OTHERS_VISITED_VIEWS, view);
			dispatch(TabsActionTypes.ACTION_DEL_OTHERS_CACHED_VIEWS, view);
			resolve({
				visitedViews: [...state.visitedViews],
				cachedViews: [...state.cachedViews]
			});
		});
	},
	[TabsActionTypes.ACTION_DEL_OTHERS_VISITED_VIEWS]({ commit, state }, view) {
		return new Promise(resolve => {
			commit(TabsMutationTypes.SET_DEL_OTHERS_VISITED_VIEWS, view);
			resolve([...state.visitedViews]);
		});
	},
	[TabsActionTypes.ACTION_DEL_OTHERS_CACHED_VIEWS]({ commit, state }, view) {
		return new Promise(resolve => {
			commit(TabsMutationTypes.SET_DEL_OTHERS_CACHED_VIEWS, view);
			resolve([...state.cachedViews]);
		});
	},

	[TabsActionTypes.ACTION_DEL_ALL_VIEWS]({ dispatch, state }) {
		return new Promise(resolve => {
			dispatch(TabsActionTypes.ACTION_DEL_ALL_VISITED_VIEWS);
			dispatch(TabsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS);
			resolve({
				visitedViews: [...state.visitedViews],
				cachedViews: [...state.cachedViews]
			});
		});
	},
	[TabsActionTypes.ACTION_DEL_ALL_VISITED_VIEWS]({ commit, state }) {
		return new Promise(resolve => {
			commit(TabsMutationTypes.SET_DEL_ALL_VISITED_VIEWS, undefined);
			resolve([...state.visitedViews]);
		});
	},
	[TabsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS]({ commit, state }) {
		return new Promise(resolve => {
			commit(TabsMutationTypes.SET_DEL_ALL_CACHED_VIEWS, undefined);
			resolve([...state.cachedViews]);
		});
	},

	[TabsActionTypes.ACTION_UPDATE_VISITED_VIEW]({ commit }, view) {
		commit(TabsMutationTypes.SET_UPDATE_VISITED_VIEW, view);
	}
};
