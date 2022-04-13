import { AppConfig } from '@core/config/app.config';
import { createLogger, createStore } from 'vuex';
import { store as data, DataState, DataStore } from './modules/data';
import { store as route, RouteState, RouteStore } from './modules/route';
import { store as sys, SystemState, SystemStore } from './modules/system';
import { store as tabs, TabsState, TabsStore } from './modules/tabs';
import { store as user, UserState, UserStore } from './modules/user';

export interface RootState {
	data: DataState;
	route: RouteState;
	sys: SystemState;
	tabs: TabsState;
	user: UserState;
}

export type Store = DataStore<Pick<RootState, 'data'>> &
	RouteStore<Pick<RootState, 'route'>> &
	SystemStore<Pick<RootState, 'sys'>> &
	TabsStore<Pick<RootState, 'tabs'>> &
	UserStore<Pick<RootState, 'user'>>;

// Plug in logger when in development environment
const plugins = AppConfig.debug ? [createLogger({})] : [];

export const store = createStore({
	plugins,
	modules: {
		data,
		route,
		sys,
		tabs,
		user
	}
});

export function useStore(): Store {
	return store as Store;
}
