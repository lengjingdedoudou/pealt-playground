<template>
	<div class="default__layout" :class="[isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-shrink']">
		<div class="default__layout-header">
			<ya-header />
		</div>
		<div class="default__layout-sidebar">
			<ya-sidebar />
		</div>
		<div class="default__layout-content">
			<router-view v-slot="{ Component }">
				<transition name="fade-transform" mode="out-in">
					<keep-alive :include="cachedViews">
						<component :key="key" :is="Component" />
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';

	import YaHeader from './components/Header/index.vue';
	import YaSidebar from './components/Sidebar/index.vue';

	@Options({
		components: { YaHeader, YaSidebar }
	})
	export default class LayoutBasic extends Vue {
		store = useStore();

		get cachedViews() {
			return this.store.state.tabs.cachedViews;
		}

		get isSidebarExpanded() {
			return this.store.state.data.layout.sidebarExpanded;
		}

		get key() {
			return this.$route.path;
		}

		created() {}
	}
</script>
