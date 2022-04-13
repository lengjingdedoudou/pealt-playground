<template>
	<div class="tabbar">
		<a-tabs v-model:activeKey="activeKey" hide-add type="editable-card">
			<a-tab-pane v-for="item in visitedViews" :key="item.path" :closable="item.fullPath === '/home' ? false : true">
				<template #closeIcon>
					<close-outlined style="font-size: 12px" @click.prevent.stop="closeSelectedTag(item)" />
				</template>
				<template #tab>
					<router-link ref="tag" :to="{ path: item.path, query: item.query, fullPath: item.fullPath }">
						<a-dropdown :trigger="['contextmenu']">
							<span>{{ item.title }}</span>
							<template #overlay>
								<a-menu @click="onClickTabMenu($event, item)">
									<a-menu-item :key="1">刷新当前标签</a-menu-item>
									<a-menu-item :key="2">关闭其他标签页</a-menu-item>
									<a-menu-item :key="3">关闭全部标签页</a-menu-item>
									<a-menu-item :key="4" v-if="!isAffix(item)">关闭当前标签页</a-menu-item>
									<a-menu-item :key="5" v-if="isMultiPage(item)">新开标签页</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</router-link>
				</template>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';
	import { SafeAny } from '@/app/shared/types/yacommon';
	import { RouteLocationNormalizedLoaded, Routes } from '@/app/shared/types/route';
	import { TabsActionTypes } from '@/store/modules/tabs/action-types';

	@Options({})
	export default class HeaderTabsView extends Vue {
		store = useStore();
		activeKey = '/';
		affixTags: RouteLocationNormalizedLoaded[] = [];

		get visitedViews() {
			return this.store.state.tabs.visitedViews;
		}

		get viewCounter() {
			return this.store.state.tabs.counter;
		}

		get routes() {
			return this.store.state.route.routes;
		}

		isAffix(tag: RouteLocationNormalizedLoaded) {
			return tag.meta && tag.meta.affix;
		}

		isMultiPage(tag: RouteLocationNormalizedLoaded) {
			return this.viewCounter[tag.name as string] ? true : false;
		}

		isActive() {
			const index = this.visitedViews.findIndex(item => item.fullPath === this.$route.fullPath);
			const pathIndex = index > -1 ? index : 0;
			this.activeKey = this.visitedViews[pathIndex].fullPath;
		}

		filterAffixTags(routes: Routes, basePath = '/') {
			let tags: RouteLocationNormalizedLoaded[] = [];
			routes.forEach(route => {
				if (route.meta && route.meta.affix) {
					const tagPath = `${basePath}/${route.path}`.replaceAll('//', '/');
					tags.push({
						fullPath: tagPath,
						path: tagPath,
						name: route.name,
						meta: { ...route.meta }
					} as RouteLocationNormalizedLoaded);
				}
				if (route.children) {
					const tempTags = this.filterAffixTags(route.children, route.path);
					if (tempTags.length >= 1) {
						tags = [...tags, ...tempTags];
					}
				}
			});
			return tags;
		}

		initTags() {
			const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
			for (const tag of affixTags) {
				// Must have tag name
				if (tag.name) {
					this.store.dispatch(TabsActionTypes.ACTION_ADD_VISITED_VIEW, tag);
				}
			}
		}

		addTags() {
			const { name } = this.$route;
			if (name) {
				this.store.dispatch(TabsActionTypes.ACTION_ADD_VIEW, this.$route as SafeAny);
				this.isActive();
			}
			return false;
		}

		moveToCurrentTag() {
			const tags = this.$refs.tag as SafeAny[];
			this.$nextTick(() => {
				for (const tag of tags) {
					if (tag.to.path === this.$route.path) {
						// this.$refs.scrollPane.moveToTarget(tag)
						// when query is different then update
						if (tag.to.fullPath !== this.$route.fullPath) {
							this.store.dispatch(TabsActionTypes.ACTION_UPDATE_VISITED_VIEW, this.$route as SafeAny);
						}
						break;
					}
				}
			});
		}

		refreshSelectedTag(view: RouteLocationNormalizedLoaded) {
			this.store.dispatch(TabsActionTypes.ACTION_DEL_CACHED_VIEW, view).then(() => {
				const { fullPath } = view;
				this.$nextTick(() => {
					this.$router.replace({
						path: '/redirect' + fullPath
					});
				});
			});
		}

		closeSelectedTag(view: RouteLocationNormalizedLoaded) {
			const routerPath = view.fullPath ? view.fullPath : view;
			const index = this.visitedViews.findIndex(item => item.fullPath === routerPath);
			if (index > -1) {
				const path = this.visitedViews[index];
				this.store.dispatch(TabsActionTypes.ACTION_DEL_VIEW, path).then(({ visitedViews }) => {
					if (this.activeKey === path.fullPath) {
						this.toLastView(visitedViews, path);
					}
				});
			}
		}

		closeOthersTags(view: RouteLocationNormalizedLoaded) {
			this.$router.push(view.path).catch(e => e);
			this.store.dispatch(TabsActionTypes.ACTION_DEL_OTHERS_VIEWS, view).then(() => {
				this.moveToCurrentTag();
			});
		}

		closeAllTags(view: RouteLocationNormalizedLoaded) {
			this.store.dispatch(TabsActionTypes.ACTION_DEL_ALL_VIEWS, undefined).then(({ visitedViews }) => {
				if (this.affixTags.some(tag => tag.path === view.path)) {
					return;
				}
				this.toLastView(visitedViews, view);
			});
		}

		toLastView(visitedViews: RouteLocationNormalizedLoaded[], view: RouteLocationNormalizedLoaded) {
			const latestView = visitedViews.slice(-1)[0];
			if (latestView) {
				this.$router.push(latestView.fullPath).catch(err => err);
			} else {
				// now the default is to redirect to the home page if there is no tags-view,
				// you can adjust it according to your needs.
				if (view.name === 'Home') {
					// to reload home page
					this.$router.replace({ path: '/redirect' + view.fullPath });
				} else {
					this.$router.push('/');
				}
			}
		}

		openNewTag(view: RouteLocationNormalizedLoaded) {
			this.$router.push(`${view.path.split('/:')[0]}/${new Date().getTime()}`);
		}

		onClickTabMenu({ key }: SafeAny, item: RouteLocationNormalizedLoaded) {
			switch (key) {
				case 1:
					this.refreshSelectedTag(item);
					break;
				case 2:
					this.closeOthersTags(item);
					break;
				case 3:
					this.closeAllTags(item);
					break;
				case 4:
					this.closeSelectedTag(item);
					break;
				case 5:
					this.openNewTag(item);
					break;
			}
		}

		tagsListenerHandler() {
			this.$watch(
				() => this.$route,
				() => {
					this.addTags();
					this.isActive();
				}
			);
		}

		mounted() {
			this.initTags();
			this.addTags();
			this.tagsListenerHandler();
		}
	}
</script>

<style lang="less" scoped>
	.tabbar {
		height: 46px;
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #d8dce5;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
		padding: 5px 15px 3px;
		box-sizing: border-box;

		:deep(.ant-tabs-nav) {
			margin: 0;

			&::before {
				border-bottom: none;
			}

			.ant-tabs-tab {
				border: none;

				&.ant-tabs-tab-active {
					background: #91d5ff;

					.ant-tabs-tab-btn {
						color: #096dd9;
					}
				}

				&.ant-tabs-tab-with-remove {
					transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

					&.ant-tabs-tab-active,
					&:hover {
						.ant-tabs-tab-remove {
							width: 12px;
							padding: 1px 6px;
							margin-left: 8px;

							svg {
								width: 12px;
							}
						}
					}
				}

				.ant-tabs-tab-remove {
					width: 0;
					padding: 0;
					margin: 0;
					transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

					&:hover {
						color: #ff7875;
					}

					svg {
						width: 0;
						transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
					}
				}
			}
		}
	}
</style>
