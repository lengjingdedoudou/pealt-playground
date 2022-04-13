<template>
	<div>
		<navbar />
		<Tabbar />
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { useStore } from '@/store';

	import Navbar from './Navbar.vue';
	import Tabbar from './Tabs.vue';

	@Options({
		components: { Navbar, Tabbar }
	})
	export default class HeaderView extends Vue {
		store = useStore();

		created() {}
	}
</script>
