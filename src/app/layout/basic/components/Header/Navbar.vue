<template>
	<div class="navbar">
		<div class="options">
			<hamburger />
		</div>
		<div class="menu">
			<ya-menu />
		</div>
		<div class="active">
			<user />
		</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	import Hamburger from './widgets/Hamburger/index.vue';
	import User from './widgets/User/index.vue';
	import YaMenu from './widgets/Menu/index.vue';

	@Options({
		components: { Hamburger, User, YaMenu }
	})
	export default class HeaderNavbarView extends Vue {}
</script>

<style lang="less" scoped>
	.navbar {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #fff;
		box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

		display: flex;
		align-items: center;

		.options {
			flex-grow: 0;
			flex-shrink: 0;
		}

		.menu {
			flex-grow: 1;
		}

		.active {
			flex-grow: 0;
			flex-shrink: 0;
			margin: 0 8px;
		}
	}
</style>
