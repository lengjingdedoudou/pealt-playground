export interface LoginParams {
	username: string;
	password: string;
	code: string;
	uuid: string;
}

/** 查询用户参数 */
export interface QueryUserParams {
	page?: number;
	pageIndex: number;
	pageSize: number;
	username?: string;
	phone?: string;
	status?: string;
	depId?: string | number;
	beginTime?: string;
	endTime?: string;
}

export enum DictType {
	SYS_NORMAL_DISABLE = 'sys_normal_disable',
	SYS_USER_SEX = 'sys_user_sex'
}

export enum ConfigKey {
	SYS_USER_INITPASSWORD = 'sys_user_initPassword'
}
