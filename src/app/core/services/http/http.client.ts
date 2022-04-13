import axios, { Axios, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { Observable } from 'rxjs';
import { SafeAny } from '@shared/types/yacommon';
import { HttpOptions, HttpResponseBase } from './http.type';
import httpInterceptor from './http.interceptor';

class HttpClient {
	static instance: HttpClient;
	static getInstance() {
		if (!this.instance) {
			this.instance = new HttpClient();
		}
		return this.instance;
	}

	constructor() {}

	get(url: string, options?: HttpOptions) {
		return httpInterceptor.intercept(this._get(url, options));
	}

	post(url: string, data: SafeAny, options?: HttpOptions) {
		return httpInterceptor.intercept(this._post(url, data, options));
	}

	put(url: string, data?: SafeAny, options?: HttpOptions) {
		return httpInterceptor.intercept(this._put(url, data, options));
	}

	delete(url: string, options?: HttpOptions) {
		return httpInterceptor.intercept(this._delet(url, options));
	}

	private _get(url: string, config?: AxiosRequestConfig<SafeAny>) {
		return this.makeObservable(axios.get, url, config);
	}

	private _post(url: string, data?: SafeAny, config?: AxiosRequestConfig<SafeAny>) {
		return this.makeObservable(axios.post, url, data, config);
	}

	private _put(url: string, data?: SafeAny, config?: AxiosRequestConfig<SafeAny>) {
		return this.makeObservable(axios.put, url, data, config);
	}

	private _delet(url: string, config?: AxiosRequestConfig<SafeAny>) {
		return this.makeObservable(axios.delete, url, config);
	}

	private makeObservable(
		axiosMethod: Axios['get'] | Axios['post'] | Axios['put'] | Axios['delete'],
		...args: SafeAny[]
	): Observable<HttpResponseBase> {
		return new Observable(subscriber => {
			const config = Object.assign({}, args[args.length - 1] || {});
			let cancelSource: CancelTokenSource;
			if (!config.cancelToken) {
				cancelSource = axios.CancelToken.source();
				config.cancelToken = cancelSource.token;
			}
			// @ts-ignore
			axiosMethod(...args)
				.then(res => {
					subscriber.next(res);
				})
				.catch(err => {
					subscriber.error(err);
				})
				.finally(() => {
					subscriber.complete();
				});

			return () => {
				if (config.responseType === 'stream') {
					return;
				}
				if (cancelSource) {
					cancelSource.cancel();
				}
			};
		});
	}
}

export default HttpClient.getInstance();
