<template>
	<div>
		<logo />
		<a-menu v-model:openKeys="openKeys" :selectedKeys="[activeMenu]" mode="inline" theme="dark" :inline-collapsed="collapsed">
			<menu-item :item="item" :base-path="item.path" :key="item.path" v-for="item in sidebarRouters" />
		</a-menu>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';

	import Logo from './widgets/Logo/index.vue';
	import MenuItem from './Item.vue';

	@Options({
		components: { MenuItem, Logo }
	})
	export default class SidebarView extends Vue {
		store = useStore();
		openKeys: string[] = [];

		get collapsed() {
			return !this.store.state.data.layout.sidebarExpanded;
		}

		get sidebarRouters() {
			return this.store.state.route.sidebarRouters;
		}

		get activeMenu() {
			const route = this.$route;
			const { meta, path } = route;
			if (meta.activeMenu) {
				return meta.activeMenu as string;
			}
			return path;
		}
	}
</script>
