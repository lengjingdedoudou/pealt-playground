import { AppConfig } from '@/app/core/config/app.config';
import { cacheSrv } from '@core/services/cache/cache.service';

export interface SystemState {
	info: {
		sys_app_name: string;
		sys_app_logo: string;
	};
}

export const state: SystemState = {
	info: {
		sys_app_name: '',
		sys_app_logo: ''
	}
};
