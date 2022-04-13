<template>
	<div class="default__container-outermost">
		<router-view />
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { SafeAny } from '@shared/types/yacommon';
	import { cacheSrv } from '@core/services/cache/cache.service';
	import { AppConfig } from '@core/config/app.config';
	import { DataActionTypes } from './store/modules/data/action-types';
	import { DataState } from './store/modules/data';

	@Options({})
	export default class App extends Vue {
		created() {
			const win = window as SafeAny;
			if (win && win.appBootstrap) {
				win.appBootstrap();
			}

			const layout = cacheSrv.getNone<Pick<DataState, 'layout'>>(AppConfig.storageKey.localKeyLayout);
			this.$store.dispatch(DataActionTypes.ACTION_SET_LAYOUT, layout || {});
		}

		unmounted() {
			cacheSrv.destroy();
		}
	}
</script>
