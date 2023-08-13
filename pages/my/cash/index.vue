<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/agent-ban.png" class="img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.cash')" bgColor="rgba(255,255,255,.0)" :titleStyle="{color: '#fff'}"
				@leftClick="back"></u-navbar>
		</view>
		<view class="login-box abs">
			<view class="login-from bgWhite">
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType" labelWidth="200rpx">
					<u-form-item :label="$t('message.cashText')" borderBottom class="form-item">
						<text>{{bankInfo}}</text>
						<!-- <u-input type="number" :clearable="true" v-model="bankInfo" border="none" :disabled="true"></u-input> -->
					</u-form-item>
					<u-form-item :label="$t('message.withMoney')" prop="withMoney" borderBottom class="form-item">
						<u-input type="number" :clearable="true" v-model="userInfo.withMoney" border="none" :placeholder="$t('message.withMoney')"
							:placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
					<u-form-item :label="$t('message.withPwd')" prop="withPwd" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withPwd" border="none"
							:placeholder="$t('message.withPwd')" :placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
				</u-form>
				<text class="col9 fs24" style="margin: 10rpx 0;">{{$t('message.withText')}}: ￥ <span style="color: #24abcc;">{{money}}</span>（HK$）</text>
				<view class="btn" @click="submit">
					{{$t('message.confirmBtn')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
		checkWithPwd,
		withdraw
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				money: 0,
				errorType: 'message',
				userInfo: {
					withMoney: '',
					withPwd: ''
				},
				rules: {
					withMoney: {
						type: 'string',
						required: true,
						message: this.$t('message.withMoney'),
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
		computed: {
			bankInfo() {
				let {vuex_user: {withName,withCount}} = this
				withCount = withCount ? withCount.slice(-4) : ''
				let str = withName + '(' + withCount + ')' 
				console.log(str);
				return str
			}
		},
		onLoad(option) {
			this.money = option.money || 0
		},
		onShow() {

		},
		methods: {
			// 提交
			submit() {
				this.$refs.form.validate().then(res => {
					let {userInfo: {withMoney,withPwd},money} = this
					if(Number(withMoney) > Number(money)) {
						let msg = this.$t('message.maxWith') + ':' + money
						this.$u.toast(msg)
						return
					}
					let params = {
						agentId: this.vuex_user.id,
						withPwd
					}
					checkWithPwd(params).then(res => {
						this.withdraw()
					})
				}).catch(errors => {
					
				})
			},
			// 提现
			withdraw() {
				let {userInfo: {withMoney},vuex_user:{id: agentId} } = this
				withdraw({withMoney,agentId}).then(res => {
					uni.showToast({
						title: this.$t('message.successText'),
						icon: 'success',
						duration: 1500
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					},1500)
				})
			}
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
.box {
    /deep/ .u-line-1.u-navbar__content__title{
        font-size: 1rem;
        line-height: 3rem;
    }
}
    .bgWhite {
        /deep/ .flex-sa {
            background: red;
        }
    }
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
