import { getToken } from '@/app/shared/utils/auth';

export interface UserState {
	/** 用户token */
	token: string;
	/** 用户昵称 */
	name: string;
	/** 用户头像 */
	avatar: string;
	/** 用户简介 */
	introduction: string;
	/** 角色 */
	roles: string[];
	/** 权限 */
	permissions: string[];
	permisaction: string[];
}

export const state: UserState = {
	token: getToken(),
	name: '',
	avatar: '',
	introduction: '',
	roles: [],
	permissions: [],
	permisaction: []
};
