import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SafeAny } from '@shared/types/yacommon';

export type HttpResponseBase = AxiosResponse;

export type HttpOptions = AxiosRequestConfig;

/** Response */
export interface HttpRes {
	[key: string]: SafeAny;
	/** 错误码 */
	code: number;
}

export interface HttpParams {
	[key: string]: SafeAny;
	/** 超时毫秒 */
	timeout?: number;
}

export interface HttpOption {
	/** 请求路由 */
	router: string;
	/** request method */
	type: 'get' | 'post' | 'put' | 'delete';
	/** 超时时间 毫秒 */
	timeout?: number;
	/** 重试次数 */
	retry?: number;
	/** 不打印入参出参 */
	isConsoleInvisible?: boolean;
	/** 不显示错误提示 */
	isErrorInvisible?: boolean;
}

export interface ReqParam {
	[key: string]: SafeAny;
}

export interface RspParam {
	[key: string]: SafeAny;
	data?: SafeAny;
}
