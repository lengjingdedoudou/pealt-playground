import { map, Observable, tap } from 'rxjs';
import _http from './http.client';
import { HttpOption, HttpParams, HttpRes, ReqParam, RspParam } from './http.type';
import { SafeAny } from '@shared/types/yacommon';
import { AppConfig } from '../../config/app.config';

class HttpService {
	static instance: HttpService;
	static getInstance() {
		if (!this.instance) {
			this.instance = new HttpService();
		}
		return this.instance;
	}

	sendRequest(options: HttpOption, data: HttpParams = {}): Observable<RspParam> {
		// 默认携带的参数
		const defaultData = {};
		// 组成新参数
		const params = JSON.parse(JSON.stringify({ ...defaultData, ...data }).replace(/\\n/g, '\\\\n'));

		this.printParams('[http req] --> ', params, options);

		return this.request(options, params).pipe(
			tap(event => {
				this.printParams('[http rsp] --> ', event, options);
			}),
			map(res => {
				return { ...res };
			})
		);
	}

	private request(options: HttpOption, params: SafeAny): Observable<HttpRes> {
		let domain = '';
		const serverCfg = new Map(Object.entries(AppConfig.server));
		if (serverCfg.size > 0) {
			const cfg = Array.from(serverCfg).filter(([prefix, cfg]) => prefix.startsWith(prefix))[0];
			domain = cfg ? cfg[1].domain : '';
		}

		const url =
			options.router.startsWith('http://') || options.router.startsWith('https://')
				? options.router
				: `${domain}${options.router}`.replace('//', '/');

		switch (options.type) {
			case 'post':
				return this.post(url, params);
			case 'get':
				return this.get(url, params);
			case 'put':
				return this.put(url, params);
			case 'delete':
				return this.delete(url, params);
		}
	}

	private post(url: string, data: ReqParam) {
		return _http.post(url, data);
	}

	private put(url: string, data: ReqParam) {
		return _http.put(url, data);
	}

	private delete(url: string, data: ReqParam) {
		return _http.delete(url, { data });
	}

	private get(url: string, params: ReqParam) {
		return _http.get(url, { params });
	}

	private printParams(tag: string, params: SafeAny, options: HttpOption) {
		if (AppConfig.logger && !options.isConsoleInvisible) {
			console.groupCollapsed(`%c ${tag}${options.router}`, 'color:green;font-size:12px;font-weight:bold;');
			console.log(params);
			console.groupEnd();
		}
	}
}

export const httpSrv = HttpService.getInstance();
