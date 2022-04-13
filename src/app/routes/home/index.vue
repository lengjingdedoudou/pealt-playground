<template>
	<div class="home-container">
		<img src="/logo.png" @click="ttt" />
		<div style="padding: 100px">
			<json-viewer :expand-depth="2" :value="test"></json-viewer>
		</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({
		name: 'Home',
		components: {}
	})
	export default class HomeView extends Vue {
		test = { a: 1, b: 2, c: { d: 3 } };

		ttt() {
			this.$message.error('还是啥时候');
		}
	}
</script>

<style lang="less" scoped></style>
