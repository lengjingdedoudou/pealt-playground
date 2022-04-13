import { HttpOption } from '../services/http/http.type';

export const HttpItems = {
	/** 获取登录验证码图片 */
	getCodeImg: {
		router: '/api/v1/captcha',
		type: 'get'
	} as HttpOption,
	/** 获取admin配置 */
	getSetting: {
		router: '/api/v1/app-config',
		type: 'get'
	} as HttpOption,
	/** 登录 */
	login: {
		router: '/api/v1/login',
		type: 'post'
	} as HttpOption,
	/** 登出 */
	logout: {
		router: '/api/v1/logout',
		type: 'post'
	} as HttpOption,
	/** 获取用户基本信息 */
	getInfo: {
		router: '/api/v1/getinfo',
		type: 'get'
	} as HttpOption,
	/** 刷新token */
	refreshtoken: {
		router: '/refreshtoken',
		type: 'post'
	} as HttpOption,
	getRoutes: {
		router: '/api/v1/menurole',
		type: 'get'
	} as HttpOption,
	/** 查询部门下拉树结构 */
	treeSelect: {
		router: '/api/v1/deptTree',
		type: 'get'
	} as HttpOption,
	/** 查询用户列表 */
	listUser: {
		router: '/api/v1/sys-user',
		type: 'get'
	} as HttpOption,
	/** 根据字典类型查询字典数据信息 */
	getDicts: {
		router: '/api/v1/dict-data/option-select',
		type: 'get'
	} as HttpOption
};
