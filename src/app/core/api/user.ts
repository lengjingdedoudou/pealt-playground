import { map, Observable } from 'rxjs';
import { httpSrv } from '../services/http/http.service';
import { HttpItems } from './http.config';
import { LoginParams } from './types/user';

/** 登录 */
export function login(params: LoginParams): Observable<string> {
	return httpSrv.sendRequest(HttpItems.login, params).pipe(
		map(({ token }) => {
			return token;
		})
	);
}

/** 登出 */
export function logout() {
	return httpSrv.sendRequest(HttpItems.logout);
}

/** 获取用户基本信息 */
export function getInfo() {
	return httpSrv.sendRequest(HttpItems.getInfo);
}

/** 刷新token */
export function refreshtoken(token: string): Observable<string> {
	return httpSrv.sendRequest(HttpItems.refreshtoken, { token }).pipe(
		map(({ data }) => {
			return data;
		})
	);
}
