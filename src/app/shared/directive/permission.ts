import { Directive } from 'vue';
import { useStore } from '@/store';

export const permission: Directive = function (el, binding, vnode) {
	const store = useStore();
	const { value } = binding;
	const roles = store && store.state.user.roles;

	if (value && value instanceof Array && value.length > 0) {
		const permissionRoles = value;

		const hasPermission = roles.some(role => {
			return permissionRoles.includes(role);
		});

		if (!hasPermission) {
			el.parentNode && el.parentNode.removeChild(el);
		}
	} else {
		throw new Error(`need roles! Like v-permission="['admin','editor']"`);
	}
};

export const permisaction: Directive = function (el, binding, vnode) {
	const store = useStore();
	const { value } = binding;
	const all_permission = '*:*:*';
	const permissions = store && store.state.user.permisaction;

	if (value && value instanceof Array && value.length > 0) {
		const permissionFlag = value;

		const hasPermissions = permissions.some(permission => {
			return all_permission === permission || permissionFlag.includes(permission);
		});

		if (!hasPermissions) {
			el.parentNode && el.parentNode.removeChild(el);
		}
	} else {
		throw new Error(`请设置操作权限标签值`);
	}
};
