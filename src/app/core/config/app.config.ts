import { environment } from '@env/environment';

const CONFIG_FACTORY = () => {
	const config = {
		/** 緩存key */
		storageKey: {
			/** layout */
			localKeyLayout: '__App_Layout__',
			/** 记住账号 */
			localKeyRemember: '__Account__',
			/** admin */
			localKeyAppCfg: '__App_Cfg__'
		}
	};

	return {
		...config,
		...environment
	};
};

export const AppConfig = CONFIG_FACTORY();
