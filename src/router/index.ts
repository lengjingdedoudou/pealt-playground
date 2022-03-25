import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: () => import('../pages/home/index.vue') },
    { path: '/about', name: 'About', component: () => import('../pages/about/index.vue') },
];

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
