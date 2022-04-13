import { MutationTree } from 'vuex';
import { UserMutationTypes } from './mutation-types';
import { UserState } from './state';

export type Mutations<S = UserState> = {
	[UserMutationTypes.SET_TOKEN](state: S, token: string): void;
	[UserMutationTypes.SET_INTRODUCTION](state: S, introduction: string): void;
	[UserMutationTypes.SET_NAME](state: S, name: string): void;
	[UserMutationTypes.SET_AVATAR](state: S, avatar: string): void;
	[UserMutationTypes.SET_ROLES](state: S, roles: string[]): void;
	[UserMutationTypes.SET_PERMISSIONS](state: S, permisaction: string[]): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
	[UserMutationTypes.SET_TOKEN](state, token) {
		state.token = token;
	},
	[UserMutationTypes.SET_INTRODUCTION](state, introduction) {
		state.introduction = introduction;
	},
	[UserMutationTypes.SET_NAME](state, name) {
		state.name = name;
	},
	[UserMutationTypes.SET_AVATAR](state, avatar) {
		state.avatar = avatar;
	},
	[UserMutationTypes.SET_ROLES](state, roles) {
		state.roles = roles;
	},
	[UserMutationTypes.SET_PERMISSIONS](state, permisaction) {
		state.permisaction = permisaction;
	}
};
