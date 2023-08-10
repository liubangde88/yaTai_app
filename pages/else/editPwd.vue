<template>
	<view class="login-container">
		<<!-- view class="header-box fixed">
			<image src="@/static/img/other-ban.png" class="img"></image>
			<u-navbar leftIconColor="#fff" :title="title" bgColor="rgba(255,255,255,.0)" :titleStyle="{color: '#fff'}"
				@leftClick="back"></u-navbar>
		</view> -->
		<view class="login-box">
			<view class="login-from">
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
					<u-form-item prop="pwd" borderBottom class="form-item">
						<u-input prefixIcon="lock" :clearable="true" prefixIconStyle="font-size: 30px;color: #333"
							v-model="userInfo.pwd" border="none" :placeholder="$t('message.pwd')"
							:placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item prop="password" borderBottom class="form-item">
						<u-input prefixIcon="lock-fill" :clearable="true"
							prefixIconStyle="font-size: 30px;color: #333" v-model="userInfo.password" border="none"
							:placeholder="$t('message.password')" :placeholderStyle="{color: '#333'}"></u-input>
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
	import {
		updateAgent
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				type: '',
				title: '',
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
			this.type = option.type
			this.title = option.type == 1 ? this.$t('message.withPwd') : this.$t('message.editPwd')
		},
		onShow() {

		},
		methods: {
			// 提交
			submit() {
				this.$refs.form.validate().then(res => {
					this.edit()
				}).catch(errors => {
					
				})
			},
			edit() {
				let {userInfo: {pwd,password},type} = this
				if(pwd != password) {
					uni.$u.toast(this.$t('message.twoPwd'))
					return
				}
				let user = this.vuex_user
				let params = {
					agentId: this.vuex_user.id
				}
				if(type == 1) {
					user.withPwd = pwd
					params.withPwd = pwd
				}
				if(type == 2) {
					user.loginPwd = pwd
					params.loginPwd = pwd
				}
				updateAgent(params).then(res => {
					if(type == 1) this.$u.vuex('vuex_user', user)
					else this.$u.vuex('vuex_user', {})
					let num = type == 1 ? 2 : 1
					this.$u.toast(this.$t('message.successText'))
					setTimeout(() => {
						uni.navigateBack({
							delta: num
						})
					},1000)
				})
			}
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.login-box {
		/* #ifdef APP-PLUS */
		top: 300rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 250rpx;
		/* #endif */
		left: 0;
		width: 100vw;
		padding: 0 30rpx;
		box-sizing: border-box;
		z-index: 99;
	}
	
	.login-from {
		width: 100%;
		height: 50vh;
		border-radius: 20rpx;
		padding: 60rpx;
		box-sizing: border-box;
	}
	.form-item {
		margin: 40rpx 0;
	}
	.btn {
		width: 70vw;
		background: #24abcc;
		margin: 100rpx auto 50rpx auto;
	}
</style>
