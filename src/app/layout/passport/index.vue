<template>
	<div class="default__passport-layout">
		<div class="d-flex justify-content-center align-items-center f-1">
			<a-row class="content shadow-1-down">
				<a-col :span="13" class="content-left">
					<div class="logo-wrap" v-if="logo">
						<img :src="logo" />
					</div>
				</a-col>
				<a-col :span="11" class="content-right">
					<router-view />
				</a-col>
			</a-row>
		</div>
		<div class="bottom-copyright">
			<span>{{ copyright }}</span>
			<span class="licence" @click="onLicence">{{ licence }}</span>
		</div>
		<div class="top-title">
			<span> {{ title }} </span>
		</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';

	@Options({})
	export default class LayoutPassport extends Vue {
		copyright = 'Copyright©2022-' + new Date().getFullYear() + ' Yunao. All Rights Reserved. 北京云奥赛凡 版权所有';
		licence = '京ICP备xxxxxxxxxx号';
		title = '军需管理平台';

		get logo() {
			return this.$store.state.sys.info.sys_app_logo;
		}

		onLicence() {
			const url = 'http://beian.miit.gov.cn';
			window.open(url);
		}
	}
</script>

<style lang="less" scoped>
	@import '@/styles/theme.less';

	@{ya-default-prefix} {
		&__passport-layout {
			display: flex;
			flex-direction: column;
			height: 100vh;
			background-color: #e3f2fd;

			.top-title {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 1;
				text-align: left;
				width: 100%;
				height: 65px;
				padding-left: 80px;
				background: #42a5f5;

				span {
					color: #fff;
					font-weight: bolder;
					font-size: 30px;
					line-height: 65px;
					letter-spacing: 6px;
				}
			}

			.bottom-copyright {
				position: fixed;
				bottom: 0;
				left: 0;
				z-index: 1;
				text-align: center;
				width: 100%;
				height: 80px;
				background: #42a5f5;

				span {
					color: #fff;
					font-size: 12px;
					line-height: 80px;
					letter-spacing: 1px;
				}
			}

			.content {
				height: 600px;
				width: 40%;
				max-width: 1200px;
				min-width: 900px;
				border-radius: 10px;

				&-left {
					border-top-left-radius: 10px;
					border-bottom-left-radius: 10px;
					background: #6e7dab;
				}

				&-right {
					padding: 24px 50px;
					border-top-right-radius: 10px;
					border-bottom-right-radius: 10px;
					background: #fff;
				}

				.logo-wrap {
					text-align: center;
					margin-top: 54px;

					img {
						width: 120px;
					}
				}
			}

			.f-1 {
				flex: 1;
			}

			.licence {
				margin-left: 24px;
				cursor: pointer;
			}
		}
	}
</style>
