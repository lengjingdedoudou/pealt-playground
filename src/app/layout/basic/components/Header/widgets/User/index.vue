<template>
	<div class="header-user">
		<a-dropdown placement="bottom" :overlayStyle="{ width: '120px' }">
			<div class="point">
				<a-avatar :size="40" :src="avatar" v-if="avatar" />
				<a-avatar :size="40" v-else>{{ name.substring(0, 4) }}</a-avatar>
			</div>
			<template #overlay>
				<a-menu @click="onClickMenu">
					<a-menu-item :key="1"> <user-outlined style="font-size: 14px" /> 个人中心 </a-menu-item>
					<a-menu-item :key="2"> <export-outlined style="font-size: 14px" /> 退出登录 </a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
		<span class="name">{{ name }}</span>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';
	import { MenuInfo } from 'ant-design-vue/es/menu/src/interface';

	@Options({})
	export default class UserView extends Vue {
		private store = useStore();

		get name() {
			return this.store.state.user.name;
		}

		get avatar() {
			return this.store.state.user.avatar;
		}

		onClickMenu({ key }: MenuInfo) {}
	}
</script>

<style lang="less" scoped>
	.header-user {
		display: flex;
		justify-content: center;
		align-items: center;

		.name {
			margin: 0 8px;
		}
	}
</style>
