<template>
	<a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
		<template #extra>
			<a-button type="primary" @click="onBack">返回首页</a-button>
		</template>
	</a-result>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({})
	export default class Page403View extends Vue {
		onBack() {
			this.$router.push('/');
		}
	}
</script>
