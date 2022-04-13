import axios from 'axios';
import { catchError, finalize, mergeMap, Observable, of, retryWhen, throwError, timeout, timer } from 'rxjs';
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { SafeAny } from '@shared/types/yacommon';
import { useStore } from '@/store';
import { getToken } from '@shared/utils/auth';
import { HttpRes, HttpResponseBase } from './http.type';
import { UserActionTypes } from '@/store/modules/user/action-types';

class HttpInterceptor {
	static instance: HttpInterceptor;
	static getInstance() {
		if (!this.instance) {
			this.instance = new HttpInterceptor();
		}
		return this.instance;
	}

	private store = useStore();
	/** 默认配置 */
	private default = { maxRetryAttempts: 1, maxTimeout: 10000 };

	constructor() {
		this.initInterceptors();
	}

	intercept(handler: Observable<HttpResponseBase>) {
		const { maxRetryAttempts, maxTimeout } = this.default;

		return handler.pipe(
			retryWhen(this.genericRetryStrategy({ maxRetryAttempts })),
			timeout(maxTimeout),
			mergeMap(event => {
				// 若一切都正常，则后续操作
				return this.handleData(event);
			}),
			catchError(err => this.handleData(err))
		);
	}

	private checkCustomError(code: number, data: { [key: string]: SafeAny }) {
		let success = false;
		switch (code) {
			case 200:
				success = true;
				break;
			case 400:
			case 403:
				message.error(data.msg, 5);
				break;
			case 401:
				this.store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined);
				if (location.href.indexOf('login') !== -1) {
					location.reload(); // 为了重新实例化vue-router对象 避免bug
				} else {
					Modal.confirm({
						title: '系统提示',
						content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
						type: 'warning',
						okText: '重新登录',
						cancelText: '取消',
						onOk() {
							location.reload(); // 为了重新实例化vue-router对象 避免bug
						}
					});
				}
				break;
			default:
				message.error(data.msg);
				break;
		}

		return success;
	}

	/*eslint no-case-declarations: "off"*/
	private handleData(event: HttpResponseBase): Observable<SafeAny> {
		const status = event.status || ((event as SafeAny).response ? (event as SafeAny).response.status : -1);
		switch (status) {
			case 200:
			case 201:
			case 204:
				const code = event.data ? (event.data as HttpRes).code || -1 : -1;
				if (code === -1 || this.checkCustomError(code, event.data)) {
					return of(event.data);
				} else {
					return throwError(() => event.data);
				}
			case 401:
				break;
			case 403:
			case 404:
			case 500:
				break;
			default:
				break;
		}

		return throwError(() => event);
	}

	private genericRetryStrategy =
		({
			maxRetryAttempts = 0,
			scalingDuration = 1000,
			excludedStatusCodes = [401, 404]
		}: {
			maxRetryAttempts?: number;
			scalingDuration?: number;
			excludedStatusCodes?: number[];
		} = {}) =>
		(attempts: Observable<SafeAny>) => {
			return attempts.pipe(
				mergeMap((error, i) => {
					const retryAttempt = i + 1;
					// 如果达到最大重试次数或响应的状态码
					// 不是我们想重试的，就抛出错误
					if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
						return throwError(() => error);
					}

					// 重试的时间间隔不断增长: 1秒、2秒，以此类推
					return timer(retryAttempt * scalingDuration);
				}),
				finalize(() => (maxRetryAttempts ? console.warn('[http]', 'request maximum retries!') : ''))
			);
		};

	private initInterceptors() {
		// axios.defaults.baseURL = AppConfig.env.domainApi;
		// axios.defaults.withCredentials = true;

		// 添加请求拦截器
		axios.interceptors.request.use(
			config => {
				// 在发送请求之前做些什么
				if (this.store.state.user.token) {
					config.headers!['Content-Type'] = 'application/json';
					config.headers!['Authorization'] = 'Bearer ' + getToken();
				}

				return config;
			},
			error => {
				// 对请求错误做些什么
				return Promise.reject(error);
			}
		);

		// 添加响应拦截器
		axios.interceptors.response.use(
			response => {
				// 对响应数据做点什么
				const { status, data } = response;
				return { status, data };
			},
			error => {
				// 对响应错误做点什么
				const { status, data } = error.response;
				return Promise.reject({ status, data });
			}
		);
	}
}

export default HttpInterceptor.getInstance();
