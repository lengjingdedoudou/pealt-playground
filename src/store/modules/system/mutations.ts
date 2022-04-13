import { MutationTree } from 'vuex';
import { SystemMutationTypes } from './mutation-types';
import { SystemState } from './state';
import { cacheSrv } from '@core/services/cache/cache.service';
import { AppConfig } from '@/app/core/config/app.config';

export type Mutations<S = SystemState> = {
	[SystemMutationTypes.SET_SETTING_DETAIL](state: S, { info }: Pick<SystemState, 'info'>): void;
};

export const mutations: MutationTree<SystemState> & Mutations = {
	[SystemMutationTypes.SET_SETTING_DETAIL](state, { info }) {
		state.info = info;
		cacheSrv.set(AppConfig.storageKey.localKeyAppCfg, info);
	}
};
