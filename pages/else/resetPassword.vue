<template>
	<view class="login-container">
		<image src="@/static/img/close-icon.png" class="common-close" @click="$router.go(-1)" />
		<view class="login-box">
			<text class="app-name">{{$t('message.resetPassword')}}</text>
			<view class="login-from">
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
					<u-form-item prop="pwd" class="form-item">
						<u-input 
							:clearable="true"
							v-model="userInfo.pwd" 
							:placeholder="$t('message.resetPasswordText')"
							:placeholderStyle="{color: '#333'}" />
					</u-form-item>
					<u-form-item prop="password" class="form-item">
						<u-input 
							:clearable="true"
							v-model="userInfo.password"
							:placeholder="$t('message.resetPasswordConfirmText')" 
							:placeholderStyle="{color: '#333'}" />
					</u-form-item>
				</u-form>
				<view class="btn" @click="submit">
					{{$t('message.confirmBtn')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				errorType: 'message',
				userInfo: {
					pwd: '',
					password: ''
				},
				rules: {
					pwd: {
						type: 'string',
						required: true,
						message: this.$t('message.pwd'),
						trigger: ['blur', 'change']
					},
					password: {
						type: 'string',
						required: true,
						message: this.$t('message.password'),
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onLoad(option) {

		},
		onShow() {

		},
		methods: {
			// 提交
			submit() {
				this.$refs.form.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			toPath() {
				console.log('修改成功跳转')
			}
		}
	}
</script>

<style src="@/common/css/login.scss" lang="scss" scoped></style>
