<template>
	<div class="header-menu">
		<a-menu v-model:selectedKeys="current" mode="horizontal" @select="handleSelect">
			<template :key="index" v-for="(item, index) in topMenus">
				<template v-if="item">
					<a-menu-item :key="item.path" v-if="index < visibleNumber">
						<template #icon>
							<icon-font :type="item.meta?.icon" />
						</template>
						{{ item.meta?.title }}
					</a-menu-item>
				</template>
			</template>

			<a-sub-menu :key="visibleNumber" v-if="topMenus.length > visibleNumber">
				<template #icon>
					<ellipsis-outlined />
				</template>
				<template #title> 更多菜单 </template>
				<template v-for="(item, index) in topMenus">
					<template v-if="item">
						<a-menu-item :key="item.path" v-if="index >= visibleNumber">
							<template #icon>
								<icon-font :type="item.meta?.icon" />
							</template>
							{{ item.meta?.title }}
						</a-menu-item>
					</template>
				</template>
			</a-sub-menu>
		</a-menu>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';
	import { SafeAny } from '@/app/shared/types/yacommon';
	import { Route, Routes } from '@/app/shared/types/route';
	import { RouterMutationTypes } from '@/store/modules/route/mutation-types';

	@Options({})
	export default class MenuView extends Vue {
		store = useStore();
		/** 顶部栏初始数 */
		visibleNumber = 5;
		/** 是否为首次加载 */
		isFrist = false;
		current: string[] = [];

		get routers() {
			return this.store.state.route.topbarRouters;
		}

		get topMenus() {
			return this.routers.map(menu => ({
				...menu,
				children: undefined
			}));
		}

		/** 设置子路由 */
		get childrenMenus() {
			const childrenMenus: Routes = [];
			this.routers.forEach(({ path, children = [] }) => {
				children.forEach((item: Route) => {
					if (item.parentPath === undefined) {
						item.parentPath = path;
					}
					childrenMenus.push(item);
				});
			});
			return childrenMenus;
		}

		/** 默认激活的菜单 */
		get activeMenu() {
			const path = this.$route.path;
			let activePath = this.routers[0].path;
			if (path.lastIndexOf('/') > 0) {
				const tmpPath = path.substring(1, path.length);
				activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'));
			} else if (path === '/index' || path === '') {
				if (!this.isFrist) {
					this.isFrist = true;
				} else {
					activePath = 'index';
				}
			}
			this.activeRoutes(activePath);
			return activePath;
		}

		/** 当前激活的路由 */
		activeRoutes(key: string) {
			const routes: Routes = [];
			if (this.childrenMenus && this.childrenMenus.length > 0) {
				this.childrenMenus.map(item => {
					if (key === item.parentPath || (key === 'index' && item.path === '')) {
						routes.push(item);
					}
				});
			}
			this.store.commit(RouterMutationTypes.SET_SIDEBAR_ROUTERS, routes);
		}

		handleSelect({ key }: SafeAny) {
			if (key.indexOf('http://') !== -1 || key.indexOf('https://') !== -1) {
				// http(s):// 路径新窗口打开
				window.open(key, '_blank');
			} else {
				this.activeRoutes(key);
			}
		}

		created() {
			this.current = [this.activeMenu];
		}
	}
</script>

<style lang="less" scoped>
	.header-menu {
		:deep(.ant-menu-horizontal) {
			border-bottom: none;
		}
	}
</style>
