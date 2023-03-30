<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/other-ban.png" class="img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.withCount')" bgColor="rgba(255,255,255,.0)" :titleStyle="{color: '#fff'}"
				@leftClick="back"></u-navbar>
		</view>
		<view class="login-box abs">
			<view class="login-from bgWhite">
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType" labelWidth="100">
					<u-form-item :label="$t('message.withCount')" prop="withCount" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withCount" border="none" :placeholder="$t('message.withCount')"
							:placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item :label="$t('message.bankCount')" prop="count" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.count" border="none"
							:placeholder="$t('message.bankCount')" :placeholderStyle="{color: '#333'}"></u-input>
					</u-form-item>
					<u-form-item :label="$t('message.withPwd')" prop="withPwd" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withPwd" border="none"
							:placeholder="$t('message.withPwd')" :placeholderStyle="{color: '#999'}"></u-input>
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
		updateAgent,
		checkWithPwd
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				errorType: 'message',
				userInfo: {
					withCount: '',
					count: '',
					withPwd: ''
				},
				rules: {
					withCount: {
						type: 'string',
						required: true,
						message: this.$t('message.withCount'),
						trigger: ['blur', 'change']
					},
					count: {
						type: 'string',
						required: true,
						message: this.$t('message.bankCount'),
						trigger: ['blur', 'change']
					},
					withPwd: {
						type: 'string',
						required: true,
						message: this.$t('message.withPwd'),
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
					this.edit()
				}).catch(errors => {
					
				})
			},
			edit() {
				let {userInfo: {withCount,count,withPwd}} = this
				if(withCount != count) {
					uni.$u.toast(this.$t('message.twoPwd'))
					return
				}
				let params = {
					agentId: this.vuex_user.id,
					withPwd
				}
				checkWithPwd(params).then(res => {
					this.update(withCount)
				})
			},
			update(withCount) {
				let user = this.vuex_user
				let params = {
					agentId: this.vuex_user.id,
					withCount
				}
				user.withCount = withCount
				updateAgent(params).then(res => {
					this.$u.vuex('vuex_user', user)
					this.$u.toast(this.$t('message.successText'))
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					},1000)
				})
			}
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped>
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
