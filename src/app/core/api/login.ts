import { map, Observable } from 'rxjs';
import { httpSrv } from '../services/http/http.service';
import { HttpItems } from './http.config';

/** 获取验证码 */
export function getCodeImg(): Observable<{ url: string; id: string }> {
	return httpSrv.sendRequest(HttpItems.getCodeImg).pipe(
		map(({ data, id }) => {
			return { url: data, id };
		})
	);
}

/** 查询 此接口不在验证数据权限 */
export function getSetting() {
	return httpSrv.sendRequest(HttpItems.getSetting).pipe(
		map(({ data }) => {
			return data || {};
		})
	);
}
