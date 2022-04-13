<template>
	<div class="default__blank-layout">
		<router-view />
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({})
	export default class LayoutBlank extends Vue {}
</script>
