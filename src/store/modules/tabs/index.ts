import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex';
import { RootState } from '@/store';
import { actions, Actions } from './actions';
import { mutations, Mutations } from './mutations';
import type { TabsState } from './state';
import { state } from './state';

export { TabsState };

export type TabsStore<S = TabsState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>;
} & {
	dispatch<K extends keyof Actions>(key: K, payload: Parameters<Actions[K]>[1], options?: DispatchOptions): ReturnType<Actions[K]>;
};
export const store: Module<TabsState, RootState> = {
	// namespaced: true,
	state,
	mutations,
	actions
};
