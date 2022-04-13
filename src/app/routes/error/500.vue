<template>
	<a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
		<template #extra>
			<a-button type="primary" @click="onBack">返回首页</a-button>
		</template>
	</a-result>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({})
	export default class Page500View extends Vue {
		onBack() {
			this.$router.push('/');
		}
	}
</script>
