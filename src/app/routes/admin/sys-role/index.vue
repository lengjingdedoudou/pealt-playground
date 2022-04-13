<template>
	<div class="home-container">
		<h1>角色管理</h1>
		<div style="padding: 100px" @click="ttt">角色管理页面 制作ing....</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({
		name: 'SysRoleManage',
		components: {}
	})
	export default class Role extends Vue {
		test = { a: 1, b: 2, c: { d: 3 } };

		ttt() {
			this.$message.error('角色管理');
		}
	}
</script>
