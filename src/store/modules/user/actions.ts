import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import { UserActionTypes } from './action-types';
import { UserMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { UserState } from './state';
import { TabsActionTypes } from '../tabs/action-types';
import { RouterActionTypes } from '../route/action-types';
import { getInfo, login, logout, refreshtoken } from '@core/api/user';
import { LoginParams } from '@core/api/types/user';
import { cacheSrv } from '@core/services/cache/cache.service';
import { removeToken, setToken } from '@shared/utils/auth';
import { Routes } from '@shared/types/route';
import router, { resetRouter } from '@/app/routes/routes.module';

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit'>;

export interface Actions {
	[UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext, params: LoginParams): Promise<boolean>;
	[UserActionTypes.ACTION_LOGOUT]({ commit }: AugmentedActionContext): Promise<boolean>;
	[UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): Promise<Omit<UserState, 'token' | 'permisaction'>>;
	[UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<boolean>;
	[UserActionTypes.ACTION_REFRESH_TOKEN]({ commit, state }: AugmentedActionContext): Promise<boolean>;
	[UserActionTypes.ACTION_CHANGE_ROLES]({ commit, dispatch }: AugmentedActionContext, role: string): Promise<boolean>;
}

export const actions: ActionTree<UserState, RootState> & Actions = {
	[UserActionTypes.ACTION_LOGIN]({ commit }, params) {
		return new Promise((resolve, reject) => {
			login(params).subscribe({
				next: token => {
					commit(UserMutationTypes.SET_TOKEN, token);
					setToken(token);
					resolve(true);
				},
				error: err => {
					reject(err);
				}
			});
		});
	},
	[UserActionTypes.ACTION_LOGOUT]({ commit }) {
		return new Promise((resolve, reject) => {
			logout().subscribe({
				next: () => {
					commit(UserMutationTypes.SET_TOKEN, '');
					commit(UserMutationTypes.SET_ROLES, []);
					commit(UserMutationTypes.SET_PERMISSIONS, []);
					removeToken();
					cacheSrv.clear();
					resolve(true);
				},
				error: err => {
					reject(err);
				}
			});
		});
	},

	[UserActionTypes.ACTION_GET_USER_INFO]({ commit }) {
		return new Promise((resolve, reject) => {
			getInfo().subscribe({
				next: ({ data: { roles, name, avatar, introduction, permissions } }) => {
					// roles must be a non-empty array
					if (!roles || roles.length <= 0) {
						reject('getInfo: roles must be a non-null array!');
					}
					commit(UserMutationTypes.SET_PERMISSIONS, permissions);
					commit(UserMutationTypes.SET_ROLES, roles);
					commit(UserMutationTypes.SET_NAME, name);
					commit(UserMutationTypes.SET_AVATAR, avatar);
					commit(UserMutationTypes.SET_INTRODUCTION, introduction);
					resolve({ roles, name, avatar, introduction, permissions });
				},
				error: err => {
					commit(UserMutationTypes.SET_TOKEN, '');
					removeToken();
					reject(err);
				}
			});
		});
	},
	[UserActionTypes.ACTION_CHANGE_ROLES]({ commit, dispatch }, role) {
		return new Promise(resolve => {
			const token = role + '-token';

			commit(UserMutationTypes.SET_TOKEN, token);
			setToken(token);

			dispatch(UserActionTypes.ACTION_GET_USER_INFO).then(({ roles }) => {
				resetRouter();
				dispatch(RouterActionTypes.ACTION_GET_ROUTES, roles, { root: true }).then((accessRoutes: Routes) => {
					accessRoutes.forEach(item => {
						router.addRoute(item);
					});

					dispatch(TabsActionTypes.ACTION_DEL_ALL_VIEWS, null, { root: true });
					resolve(true);
				});
			});
		});
	},
	[UserActionTypes.ACTION_RESET_TOKEN]({ commit }) {
		return new Promise(resolve => {
			commit(UserMutationTypes.SET_TOKEN, '');
			removeToken();
			resolve(true);
		});
	},
	[UserActionTypes.ACTION_REFRESH_TOKEN]({ commit, state }) {
		return new Promise((resolve, reject) => {
			refreshtoken(state.token).subscribe({
				next: token => {
					commit(UserMutationTypes.SET_TOKEN, token);
					setToken(token);
					resolve(true);
				},
				error: err => {
					reject(err);
				}
			});
		});
	}
};
