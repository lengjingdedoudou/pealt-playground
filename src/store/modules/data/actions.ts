import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import { DataActionTypes } from './action-types';
import { DataMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { DataState } from './state';

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<DataState, RootState>, 'commit'>;

export interface Actions {
	[DataActionTypes.ACTION_SET_LAYOUT]({ commit, state }: AugmentedActionContext, data: Pick<DataState, 'layout'>): void;
}

export const actions: ActionTree<DataState, RootState> & Actions = {
	[DataActionTypes.ACTION_SET_LAYOUT]({ commit, state }, { layout = {} }) {
		commit(DataMutationTypes.SET_LAYOUT, { layout: { ...state.layout, ...layout } });
	}
};
