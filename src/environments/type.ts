import { SafeAny } from '@/app/shared/types/yacommon';

export interface Environment {
	[key: string]: SafeAny;

	/**
	 * 是否生产环境
	 *
	 * `true`生产  `false`非生产
	 */
	production: boolean;

	/**
	 * API配置，域名优先级 从上至下依次匹配
	 */
	server: ServerConfig;

	/**
	 * 是否打印console
	 *
	 * `true`编译保留console
	 */
	logger?: boolean;

	/**
	 * 是否debug
	 *
	 * `true`打印store
	 */
	debug?: boolean;
}

export interface ServerConfig {
	[prefix: string]: {
		/** 指定API域名 */
		domain: string;
	};
}
