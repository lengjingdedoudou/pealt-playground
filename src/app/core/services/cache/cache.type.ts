import { Observable } from 'rxjs';
import { SafeAny } from '@/app/shared/types/yacommon';

export interface ICache {
	v: SafeAny;
	/** 过期时间戳，`0` 表示不过期 */
	e: number;
}

export interface ICacheStore {
	get(key: string): ICache | null;

	set(key: string, value: ICache): boolean;

	remove(key: string): void;
}

export type CacheNotifyType = 'set' | 'remove' | 'expire';

export interface CacheNotifyResult {
	type: CacheNotifyType;
	value?: SafeAny;
}

export interface CacheConfig {
	/**
	 * Cache mode, default: `promise`
	 * - `promise` Convention mode, allowing `key` to get data as http
	 * - `none` Normal mode
	 */
	mode?: 'promise' | 'none';
	/**
	 * Rename the return parameters, default: ``, for example:
	 * - `null` The response body is content
	 * - `list` The response body should be `{ list: [] }`
	 * - `result.list` The response body should be `{ result: { list: [] } }`
	 */
	reName?: string | string[];
	/**
	 * Set the default storage type
	 * - `m` Storage via memory
	 * - `s` Storage via `localStorage`
	 */
	type?: 'm' | 's';
	/**
	 * Set the default expire time (Unit: second)
	 */
	expire?: number;
	/**
	 * Key prefix of persistent data, default: ``
	 */
	prefix?: string;
	/**
	 * Key name of persistent data metadata storage, default: `__cache_meta`
	 */
	meta_key?: string;
	/**
	 * 自定义请求体
	 *
	 * Custom request
	 */
	request?: (key: string) => Observable<unknown>;
}
