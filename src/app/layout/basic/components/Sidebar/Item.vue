<template>
	<template v-if="!item.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
				onlyOneChild &&
				(!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
				!item.alwaysShow
			"
		>
			<router-link :to="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.meta">
				<a-menu-item :key="resolvePath(onlyOneChild.path)">
					<template #icon v-if="onlyOneChild.meta?.icon || item.meta?.icon">
						<icon-font :type="onlyOneChild.meta?.icon || item.meta?.icon" />
					</template>
					{{ item.meta?.title }}
				</a-menu-item>
			</router-link>
		</template>

		<a-sub-menu :key="item.path" v-else>
			<template #icon v-if="item.meta?.icon">
				<icon-font :type="item.meta?.icon" />
			</template>
			<template #title>{{ item.meta?.title }}</template>
			<menu-item :item="child" :base-path="resolvePath(child.path)" :key="child.path" v-for="child in item.children" />
		</a-sub-menu>
	</template>
</template>

<script lang="ts">
	import { PropType } from 'vue';
	import { Options, Vue, prop } from 'vue-class-component';
	import { useStore } from '@/store';
	import { Route, Routes } from '@/app/shared/types/route';
	import { isExternal } from '@/app/shared/utils/validate';

	class Props {
		item = prop({
			type: Object as PropType<Route>,
			required: true
		});
		basePath = prop({
			type: String,
			default: ''
		});
	}

	@Options({
		name: 'MenuItem'
	})
	export default class MenuItemView extends Vue.with(Props) {
		store = useStore();
		selectedKeys: string[] = [];
		openKeys: string[] = [];
		onlyOneChild: (Route & { noShowingChildren?: boolean }) | null = null;

		hasOneShowingChild(children: Routes = [], parent: Route) {
			const showingChildren = children.filter(item => {
				if (item.hidden) {
					return false;
				} else {
					// Temp set(will be used if only has one showing child)
					this.onlyOneChild = item;
					return true;
				}
			});

			// When there is only one child router, the child router is displayed by default
			if (showingChildren.length === 1) {
				return true;
			}

			// Show parent if there are no child router to display
			if (showingChildren.length === 0) {
				this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
				return true;
			}

			return false;
		}

		resolvePath(routePath: string) {
			if (isExternal(routePath)) {
				return routePath;
			}
			if (isExternal(this.basePath)) {
				return this.basePath;
			}
			return `${this.basePath}/${routePath}`.replaceAll('//', '/');
		}
	}
</script>
