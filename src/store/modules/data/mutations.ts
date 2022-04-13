import { MutationTree } from 'vuex';
import { DataMutationTypes } from './mutation-types';
import { DataState } from './state';

export type Mutations<S = DataState> = {
	[DataMutationTypes.SET_LAYOUT](state: S, data: Pick<DataState, 'layout'>): void;
};

export const mutations: MutationTree<DataState> & Mutations = {
	[DataMutationTypes.SET_LAYOUT](state, { layout }) {
		state.layout = layout;
	}
};
