<template>
	<div class="sidebar-logo-container" :class="{ collapse: collapsed }">
		<transition name="logofade">
			<router-link key="collapse" class="sidebar-logo-link" to="/" v-if="collapsed">
				<img class="sidebar-logo" :src="sysInfo.sys_app_logo" v-if="sysInfo.sys_app_logo || true" />
			</router-link>
			<router-link key="expand" class="sidebar-logo-link" to="/" v-else>
				<img class="sidebar-logo" :src="sysInfo.sys_app_logo" v-if="sysInfo.sys_app_logo || true" />
				<h1 class="sidebar-title">
					{{ sysInfo.sys_app_name || '军需管理' }}
				</h1>
			</router-link>
		</transition>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';

	@Options({})
	export default class LogoView extends Vue {
		store = useStore();

		get collapsed() {
			return !this.store.state.data.layout.sidebarExpanded;
		}

		get sysInfo() {
			return this.store.state.sys.info;
		}
	}
</script>

<style lang="less" scoped>
	.logofade-enter-active {
		transition: opacity 1.5s ease;
	}

	.logofade-enter-from,
	.logofade-leave-to {
		opacity: 0;
	}

	.sidebar-logo-container {
		position: relative;
		width: 100%;
		height: 64px;
		line-height: 64px;
		text-align: center;
		overflow: hidden;

		a {
			display: inline-block;
			width: 100%;
			overflow: hidden;
		}

		.sidebar-logo-link {
			height: 100%;
			width: 100%;

			.sidebar-logo {
				width: 32px;
				height: 32px;
				vertical-align: middle;
				margin-right: 12px;
				border-radius: 3px;
			}

			.sidebar-title {
				display: inline-block;
				margin: 0;
				color: #fff;
				font-weight: 600;
				line-height: 50px;
				font-size: 14px;
				font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
				vertical-align: middle;
			}
		}

		&.collapse {
			.sidebar-logo {
				margin-right: 0;
				border-radius: 3px;
			}
		}
	}
</style>
