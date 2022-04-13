<script lang="ts">
	import { h } from 'vue';
	import { Options, Vue } from 'vue-class-component';

	@Options({})
	export default class RedirectView extends Vue {
		created() {
			const { params, query } = this.$route;
			const { path } = params;
			this.$router.replace({ path: '/' + path, query });
		}

		render() {
			return h('div');
		}
	}
</script>
