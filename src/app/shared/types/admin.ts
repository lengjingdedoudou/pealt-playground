/** 部门下拉树结构 */
export interface DeptTree {
	label?: string;
	id: number | string;
	children?: DeptTree[];
}

/** 格式化后的 TreeNode 结构 */
export interface TreeNode {
	title?: string;
	key: number | string;
	children?: TreeNode[] | undefined;
}
/** 用户管理结构 */
export interface User {
	avatar: string;
	createBy: number;
	createdAt: string;
	dept: Dept;
	deptId: number;
	deptIds: number[];
	email: string;
	nickName: string;
	phone: string;
	postId: number;
	postIds: number[];
	remark: string;
	roleId: number;
	roleIds: number[];
	sex: string | number;
	status: string;
	updateBy: number;
	updateAt: string;
	userId: number;
	username: string;
}

export interface UserListWithMeta {
	list: User[];
	count: number;
	pageIndex: number;
	pageSize: number;
}

/** 部门结构 */
export interface Dept {
	children: Dept[];
	createBy: number;
	createdAt: string;
	dataScope: string;
	deptId: number;
	deptName: string;
	deptPath: string;
	email: string;
	leader: string;
	params: string;
	parentId: number;
	phone: string;
	sort: number;
	status: number;
	updateBy: number;
	updateAt: string;
}

/** 获取状态数据字典 */
export interface StatusOptions {
	label: string;
	value: string | number;
}
