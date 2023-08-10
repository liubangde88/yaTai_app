<template>
	<view class="login-container">
		<view class="login-box">
			<text class="app-name">{{ $t('message.registerName') }}</text> 
			<view class="login-from">
				<view class="title col1">
					{{$t('message.register')}}
				</view>
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
					<u-form-item prop="account" class="form-item">
						<u-input prefixIcon="account" :clearable="true"
							v-model="userInfo.account" :placeholder="$t('message.account')"
							placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item prop="code" class="form-item">
						<u-input prefixIcon="tags" :clearable="true"
							v-model="userInfo.randomCode" :placeholder="$t('message.code')"
							placeholderStyle="{color: '#333'}">
								<template slot="suffix">
									<u-code ref="uCode" @change="codeChange" :start-text="startText" 
									 :change-text="changeText" :end-text="endText" :seconds="seconds"></u-code>
									 <text class="send-code" @tap="getCode">{{tips}}</text>
								</template>
							</u-input>
					</u-form-item>
					<u-form-item prop="pwd" class="form-item">
						<u-input prefixIcon="lock" :clearable="true"
							v-model="userInfo.pwd" :placeholder="$t('message.pwd')"
							placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item prop="password" class="form-item">
						<u-input prefixIcon="lock-fill" :clearable="true"
							v-model="userInfo.password"
							:placeholder="$t('message.password')" placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item class="form-item">
						<u-input prefixIcon="man-add" :clearable="true"
							v-model="userInfo.inviter" :placeholder="$t('message.inviter')"
							placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
				</u-form>
				<view class="btn" @click="submit">
					{{$t('message.registerText')}}
				</view>
				<view class="option flex flex-cen fs28 col9">
					<text @click="toPath">{{$t('message.loginText')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		agentRegist,
		sendEmail
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				tips: '',
				startText: this.$t('message.startText'),//倒计时开始提示语
				changeText: this.$t('message.changeText'),//倒计时期间提示语
				endText: this.$t('message.endText'),//倒计时结束提示语
				errorType: 'message',
				seconds: 60,
				userInfo: {
					account: '',
					randomCode: '',
					pwd: '',
					password: '',
					inviter: ''
				},
				rules: {
					account: [{
						required: true,
						message: this.$t('message.account'),
						trigger: ['change', 'blur'],
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return uni.$u.test.email(value);
						},
						message: this.$t('message.email'),
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
					randomCode: {
						type: 'string',
						required: true,
						message: this.$t('message.code'),
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
			codeChange(text) {
				this.tips = text;
			},
			 getCode() {
				if (this.$refs.uCode.canGetCode) {
					let {userInfo: {account: email}} = this
					sendEmail({email}).then(res => {
						console.log(res)
						uni.$u.toast(this.$t('message.successText'));
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					uni.$u.toast(this.$t('message.codeTipsText'));
				}
			},
			// 提交
			submit() {
				this.$refs.form.validate().then(res => {
					this.register()
				}).catch(errors => {

				})
			},
			// 注册
			register() {
				let {
					userInfo: {
						account: mobile,
						randomCode,
						pwd,
						password,
						inviter
					}
				} = this
				if (pwd != password) {
					uni.$u.toast(this.$t('message.twoPwd'))
					return
				}
				let params = {
					mobile,
					pwd,
					randomCode
				}
				if (inviter) params.invite = inviter
				console.log(params);
				agentRegist(params).then(res => {
					let that = this
					uni.showToast({
						title: that.$t('message.registSuccess'),
						icon: 'success',
						duration: 1500
					})
					setTimeout(() => {
						that.toPath()
					}, 1500)
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
