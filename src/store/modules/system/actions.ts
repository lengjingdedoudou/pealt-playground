import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import { SystemActionTypes } from './action-types';
import { SystemMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { SystemState } from './state';
import { getSetting } from '@/app/core/api/login';

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<SystemState, RootState>, 'commit'>;

export interface Actions {
	[SystemActionTypes.ACTION_GET_SETTING_DETAIL]({ commit }: AugmentedActionContext): Promise<Pick<SystemState, 'info'>>;
}

export const actions: ActionTree<SystemState, RootState> & Actions = {
	[SystemActionTypes.ACTION_GET_SETTING_DETAIL]({ commit }) {
		return new Promise(resolve => {
			getSetting().subscribe(info => {
				commit(SystemMutationTypes.SET_SETTING_DETAIL, { info });
				resolve({ info });
			});
		});
	}
};
