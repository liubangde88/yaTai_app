<template>
	<view class="box rel">
		<image src="@/static/img/login-ban.png" mode="" class="login-img abs"></image>
		<u-navbar leftIconColor="#fff" :title="$t('message.forgot')" bgColor="rgba(255,255,255,.0)"
			:titleStyle="{color: '#fff'}" :placeholder="true" @leftClick="back"></u-navbar>
		<view class="info abs flexColumn">
			<text class="app-name">{{$t('message.appName')}}</text>
			<text class="mechanism">{{$t('message.mechanism')}}</text>
			<view class="flex fs30">
				<image src="@/static/img/login-icon.png" mode="" class="login-icon"></image>
				{{$t('message.aim')}}
			</view>
		</view>
		<view class="login-box abs">
			<view class="login-from bgWhite">
				<view class="title col1">
					{{$t('message.forgot')}}
				</view>
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
					<u-form-item prop="account" borderBottom class="form-item">
						<u-input prefixIcon="account" :clearable="true" prefixIconStyle="font-size: 30px;color: #2199b6"
							v-model="userInfo.account" border="none" :placeholder="$t('message.account')"
							:placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item prop="pwd" borderBottom class="form-item">
						<u-input prefixIcon="lock" :clearable="true" prefixIconStyle="font-size: 30px;color: #2199b6"
							v-model="userInfo.pwd" border="none" :placeholder="$t('message.pwd')"
							:placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item prop="password" borderBottom class="form-item">
						<u-input prefixIcon="lock-fill" :clearable="true"
							prefixIconStyle="font-size: 30px;color: #2199b6" v-model="userInfo.password" border="none"
							:placeholder="$t('message.password')" :placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
				</u-form>
				<view class="btn" @click="submit">
					{{$t('message.confirmBtn')}}
				</view>
				<view class="option flex flex-cen fs28 col9">
					<text @click="toPath">{{$t('message.loginText')}}</text>
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
					account: '',
					pwd: '',
					password: ''
				},
				rules: {
					account: {
						type: 'string',
						required: true,
						message: this.$t('message.account'),
						trigger: ['blur', 'change']
					},
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
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style src="@/common/css/login.scss" lang="scss" scoped></style>
