import router from './routes.module';
import { useStore } from '@/store';
import { message } from 'ant-design-vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@shared/utils/auth';
import { getPageTitle } from '@shared/utils/route';
import { UserActionTypes } from '@/store/modules/user/action-types';
import { RouterActionTypes } from '@/store/modules/route/action-types';
import { SafeAny } from '../shared/types/yacommon';

// NProgress Configuration
NProgress.configure({ showSpinner: false });

// no redirect whitelist
const loginPath = '/passport/login';
const whiteList = [loginPath, '/auth-redirect'];

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start();

	// set page title
	const title = (to.meta.title as string) || '';
	document.title = getPageTitle(title);

	// determine whether the user has logged in
	const hasToken = getToken();

	if (hasToken) {
		if (to.path === loginPath) {
			// if is logged in, redirect to the home page
			next({ path: '/' });
			NProgress.done();
		} else {
			const store = useStore();
			// determine whether the user has obtained his permission roles through getInfo
			const hasRoles = store.state.user.roles && store.state.user.roles.length > 0;
			if (hasRoles) {
				next();
			} else {
				try {
					// get user info
					// note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
					const { roles } = await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined);
					// generate accessible routes map based on roles
					const accessRoutes = await store.dispatch(RouterActionTypes.ACTION_GET_ROUTES, undefined);
					// dynamically add accessible routes
					accessRoutes.forEach(item => {
						router.addRoute(item);
					});

					// hack method to ensure that addRoutes is complete
					// set the replace: true, so the navigation will not leave a history record
					next({ ...to, replace: true });
				} catch (error: SafeAny) {
					// remove token and go to login page to re-login
					// await store.dispatch('user/resetToken')
					message.error(typeof error === 'object' ? error.msg : 'Has Error');
					next(`${loginPath}`);
					NProgress.done();
				}
			}
		}
	} else {
		/* has no token*/

		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next();
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`${loginPath}`);
			NProgress.done();
		}
	}
});

router.afterEach((to, from, failure) => {
	// finish progress bar
	NProgress.done();
});

router.onError((error, to, from) => {
	console.error('[router]', error);
});
