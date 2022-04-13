<template>
	<div class="header-icon" @click="toggleClick">
		<svg
			:class="{ active: isActive }"
			class="hamburger"
			viewBox="0 0 1024 1024"
			xmlns="http://www.w3.org/2000/svg"
			width="64"
			height="64"
		>
			<path
				d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
			/>
		</svg>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';
	import { DataActionTypes } from '@/store/modules/data/action-types';

	@Options({})
	export default class HamburgerView extends Vue {
		private store = useStore();

		get isActive() {
			return this.store.state.data.layout.sidebarExpanded;
		}

		toggleClick() {
			this.store.dispatch(DataActionTypes.ACTION_SET_LAYOUT, { layout: { sidebarExpanded: !this.isActive } });
		}
	}
</script>

<style lang="less" scoped>
	.header-icon {
		margin: 0 8px;
		padding: 5px 12px;
		transition: background-color 0.3s;
		cursor: pointer;

		&:hover {
			background-color: #e6f7ff !important;
		}

		.hamburger {
			display: inline-block;
			vertical-align: middle;
			width: 20px;
			height: 20px;

			&.active {
				transform: rotate(180deg);
			}
		}
	}
</style>
