import { AppConfig } from '@core/config/app.config';
import { cacheSrv } from '@core/services/cache/cache.service';

export interface DataState {
	layout: {
		/** 侧边菜单是否展开 */
		sidebarExpanded: boolean;
	};
}

export const state: DataState = {
	layout: { sidebarExpanded: true }
};
