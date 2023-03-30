<template>
	<view class="box rel">
		<image src="@/static/img/login-ban.png" mode="" class="login-img abs"></image>
		<u-navbar leftIconColor="#fff" :title="$t('message.login')" bgColor="rgba(255,255,255,.0)"
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
					{{$t('message.loginText')}}
				</view>
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
					<u-form-item prop="account" borderBottom class="form-item">
						<u-input prefixIcon="account" :clearable="true" prefixIconStyle="font-size: 30px;color: #2199b6"
							v-model="userInfo.account" border="none" :placeholder="$t('message.account')"
							:placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item prop="pwd" borderBottom>
						<u-input :password="password" :clearable="true" prefixIcon="lock"
							prefixIconStyle="font-size: 30px;color: #2199b6" v-model="userInfo.pwd" border="none"
							:placeholder="$t('message.pwd')" :placeholderStyle="{color: '#333'}">
							<template slot="suffix">
								<u-icon size="20" @click="showPassword" :name="password?'eye-off':'eye-fill'"></u-icon>
							</template>
						</u-input>
					</u-form-item>
				</u-form>
				<view class="btn" @click="submit">
					{{$t('message.login')}}
				</view>
				<view class="option flex flex-sb fs28 col9">
					<text @click="toPath('/pages/else/register')">{{$t('message.register')}}</text>
					<text @click="toPath('forgot')">{{$t('message.forgot')}}?</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				errorType: 'message',
				password: false,
				userInfo: {
					account: '',
					pwd: ''
				},
				rules: {
					account: [{
							required: true,
							message: this.$t('message.account'),
							trigger: ['change', 'blur'],
					},{
						// 自定义验证函数，见上说明
									validator: (rule, value, callback) => {
										// 上面有说，返回true表示校验通过，返回false表示不通过
										// uni.$u.test.mobile()就是返回true或者false的
										return uni.$u.test.email(value);
									},
									message: this.$t('message.email'),
									// 触发器可以同时用blur和change
									trigger: ['change','blur'],
					}],
					pwd: {
						type: 'string',
						required: true,
						message: this.$t('message.pwd'),
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
					this.login()
				}).catch(errors => {

				})
			},
			// 登录
			login() {
				let {
					userInfo: {
						account: mobile,
						pwd
					}
				} = this
				login({
					mobile,
					pwd
				}).then(res => {
					let obj = res.agent
					console.log(obj);
					this.$u.vuex('vuex_user', obj)
					uni.showToast({
						title: this.$t('message.loginSuccess'),
						icon: 'success',
						duration: 1500
					})
					setTimeout(() => {
						this.back()
					}, 1500)
				})
			},
			// 控制密码框显示隐藏
			showPassword() {
				this.password = !this.password
			},
			toPath(url) {
				if (url == "forgot") {
					this.$u.toast(this.$t('message.contact'))
				} else {
					uni.navigateTo({
						url
					})
				}
			}
		}
	}
</script>

<style src="@/common/css/login.scss" lang="scss" scoped></style>
