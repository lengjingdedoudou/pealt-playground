<template>
	<div class="login-container">
		<div class="title">
			<span class="font-weight-4">欢迎登录</span>
			<span class="font-weight-6">&#160;Play</span>
		</div>

		<div>
			<a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
				<a-form-item name="username" :rules="[{ required: true, message: '请输入正确的账号!' }]">
					<a-input class="border-0" v-model:value="formState.username" placeholder="用户名" />
				</a-form-item>
				<a-form-item name="password" :rules="[{ required: true, message: '密码不能为空!' }]">
					<a-input
						class="border-0"
						:type="showPwd ? 'text' : 'password'"
						v-model:value="formState.password"
						placeholder="密码"
						@keyup="checkCapslock"
						@blur="capsTooltip = false"
					/>
					<div class="pwd-icon" :style="{ width: capsTooltip ? '52px' : '30px' }">
						<font-size-outlined
							:style="{
								fontSize: '14px',
								color: '#f5222d',
								marginRight: '4px',
								boxShadow:
									'0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
								padding: '2px'
							}"
							v-if="capsTooltip"
						/>
						<eye-outlined :style="{ fontSize: '14px', color: '#faad14' }" @click="showPwd = !showPwd" v-if="showPwd" />
						<eye-invisible-outlined :style="{ fontSize: '14px', color: '#595959' }" @click="showPwd = !showPwd" v-else />
					</div>
				</a-form-item>
				<a-form-item name="code" :rules="[{ required: true, message: '请输入验证码!' }]" style="margin-bottom: 15px">
					<a-input class="border-0 ipt-code" v-model:value="formState.code" placeholder="验证码" />
					<div class="login-code" v-if="codeUrl">
						<img :src="codeUrl" @click="getCode" />
					</div>
				</a-form-item>
				<a-form-item name="remember" style="margin-bottom: 32px">
					<a-row>
						<a-col :span="12" style="padding-left: 12px"> </a-col>
						<a-col :span="12" style="text-align: right">
							<a-checkbox style="color: #8c8c8c" v-model:checked="formState.remember"> 记住账号 </a-checkbox>
						</a-col>
					</a-row>
				</a-form-item>
				<a-form-item>
					<div class="btn-wrap">
						<a-button class="btn cyan-btn" type="primary" size="large" html-type="submit" :loading="loading"> 登 录 </a-button>
					</div>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import { getCodeImg } from '@/app/core/api/login';
	import { SystemActionTypes } from '@/store/modules/system/action-types';
	import { UserActionTypes } from '@/store/modules/user/action-types';
	import { cacheSrv } from '@core/services/cache/cache.service';
	import { AppConfig } from '@core/config/app.config';

	interface Form {
		username: string;
		password: string;
		code: string;
		remember: boolean;
	}

	@Options({})
	export default class LoginView extends Vue {
		formState: Form = {
			password: '',
			code: '',
			username: this.localRemember.username,
			remember: this.localRemember.remember
		};
		codeUrl = '';
		uuid = '';
		loading = false;
		capsTooltip = false;
		showPwd = false;

		get localRemember() {
			return (
				cacheSrv.getNone<{ remember: boolean; username: string }>(AppConfig.storageKey.localKeyRemember) || {
					remember: false,
					username: ''
				}
			);
		}

		onFinish({ remember, ...params }: Form) {
			cacheSrv.set(AppConfig.storageKey.localKeyRemember, remember);
			this.loading = true;
			this.$store
				.dispatch(UserActionTypes.ACTION_LOGIN, { ...params, uuid: this.uuid })
				.then(() => {
					cacheSrv.set(AppConfig.storageKey.localKeyRemember, { remember, username: remember ? params.username : '' });
					this.$router.push('/');
				})
				.catch(err => {
					this.getCode();
				})
				.finally(() => {
					this.loading = false;
				});
		}

		onFinishFailed({ errorFields }: { errorFields: Array<{ errors: string[] }> }) {
			this.$message.error(errorFields[0].errors[0]);
		}

		getCode() {
			getCodeImg().subscribe(({ url, id }) => {
				this.codeUrl = url;
				this.uuid = id;
			});
		}

		checkCapslock({ shiftKey, key }: KeyboardEvent) {
			if (key && key.length === 1) {
				if ((shiftKey && key >= 'a' && key <= 'z') || (!shiftKey && key >= 'A' && key <= 'Z')) {
					this.capsTooltip = true;
				} else {
					this.capsTooltip = false;
				}
			}
			if (key === 'CapsLock' && this.capsTooltip === true) {
				this.capsTooltip = false;
			}
		}

		created() {
			this.getCode();
		}
	}
</script>

<style lang="less" scoped>
	@import '@/styles/theme.less';

	.login-container {
		.title {
			position: relative;
			padding: 30px 0 80px 0;
			font-size: 28px;
			font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
			color: @primary-color;
			text-align: center;

			.font-weight-6 {
				font-weight: 600;
			}

			.font-weight-4 {
				font-weight: 400;
			}
		}

		.pwd-icon {
			position: absolute;
			top: 0;
			right: 0;
			height: 32px;
			line-height: 32px;
			text-align: center;
		}

		.ipt-code {
			padding-right: 31%;
		}

		.login-code {
			position: absolute;
			top: -15px;
			right: 0;
			width: 30%;
			height: 38px;
			float: right;
			background-color: #f0f1f5;
			cursor: pointer;

			img {
				height: 100%;
				width: 100%;
				border-radius: 5px;
			}
		}

		.btn-wrap {
			text-align: center;

			.btn {
				width: 100%;
			}
		}

		.other-ways {
			position: absolute;
			bottom: 10px;
			left: 0;
			right: 0;

			i {
				font-size: 20px;
				margin-left: 8px;
				margin-right: 8px;
				cursor: pointer;
			}
		}
	}

	:deep(.ant-form-item) {
		margin-bottom: 34px;

		.ant-input {
			border: none;
			border-bottom: 2px solid @primary-color-light;
			color: #000 !important;
			transition: all 0.3;

			&.ant-input-affix-wrapper-focused,
			&:focus {
				border-color: @primary-color;
				box-shadow: none !important;
			}
		}
	}
</style>
