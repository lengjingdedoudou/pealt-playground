<template>
	<a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
		<template #extra>
			<a-button type="primary" @click="onBack">返回首页</a-button>
		</template>
	</a-result>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({})
	export default class Page404View extends Vue {
		onBack() {
			this.$router.push('/');
		}
	}
</script>
