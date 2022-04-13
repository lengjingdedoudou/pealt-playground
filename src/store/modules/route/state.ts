import { Routes } from '@/app/shared/types/route';

export interface RouteState {
	routes: Routes;
	addRoutes: Routes;
	defaultRoutes: Routes;
	topbarRouters: Routes;
	sidebarRouters: Routes;
}

export const state: RouteState = {
	routes: [],
	addRoutes: [],
	defaultRoutes: [],
	topbarRouters: [],
	sidebarRouters: []
};
