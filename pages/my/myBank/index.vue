<template>
	<view class="box">
		<view class="header-box fixed">
			<u-navbar bgColor="rgba(255,255,255)" 
				@leftClick="back"  :title="$t('message.bankCenter')"></u-navbar>
		</view>

		<view class="login-box" v-if="vuex_user.withMan && vuex_user.withName && vuex_user.withCount && vuex_user.withAddress">
			<view class="bank-box">
				<view class="flex flex-sb fs30 colf" style="margin-bottom: 10rpx;">
					<text>{{vuex_user.withName}}</text>
					<text>{{bankNo}}</text>
				</view>
				<view class="fs28 colf">
					{{vuex_user.withAddress}}
				</view>
			</view>
			<view class="banl-tips fs24 col9" style="margin-top: 50rpx;">
				*{{$t('message.rebind')}}, {{$t('message.contact')}}
			</view>
		</view>
		<view class="login-box" v-else>
			<view class="title">{{$t('message.addBank')}}</view>
			<view class="login-from bgWhite">
				<!-- 表单 -->
				<u-form :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
					<u-form-item prop="withMan" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withMan" border="none" :placeholder="$t('message.withMan')"
							:placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
					<u-form-item prop="withName" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withName" border="none" :placeholder="$t('message.withName')"
							:placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
					<u-form-item prop="openBank" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.openBank" border="none"
							:placeholder="$t('message.openBank')" :placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
					<u-form-item prop="withCount" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withCount" border="none" :placeholder="$t('message.withCount')"
							:placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
					<u-form-item prop="count" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.count" border="none"
							:placeholder="$t('message.bankCount')" :placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item>
					
					<!-- <u-form-item :label="$t('message.withPwd')" prop="withPwd" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withPwd" border="none"
							:placeholder="$t('message.withPwd')" :placeholderStyle="{color: '#999'}"></u-input>
					</u-form-item> -->
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
					withMan: '',
					withName: '',
					openBank: '',
					withCount: '',
					count: '',
					withPwd: ''
				},
				rules: {
						withMan: {
						type: 'string',
						required: true,
						message: this.$t('message.withMan'),
						trigger: ['blur', 'change']
					},
					withName: {
						type: 'string',
						required: true,
						message: this.$t('message.withName'),
						trigger: ['blur', 'change']
					},
					openBank: {
						type: 'string',
						required: true,
						message: this.$t('message.openBank'),
						trigger: ['blur', 'change']
					},
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
		computed: {
			bankNo() {
				let str = this.vuex_user.withCount
				return str ? str.substring(0, 4) + ' *** **** **** ' + str.slice(-4) : ''
			}
		},
		onLoad(option) {
			if(this.vuex_user.id) {
				this.userInfo.withMan = this.vuex_user.withMan || ''
				this.userInfo.withName = this.vuex_user.withName || ''
				this.userInfo.openBank = this.vuex_user.withAddress || ''
				this.userInfo.withCount = this.vuex_user.withCount || ''
				this.userInfo.count = this.vuex_user.withCount || ''
			}
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
				let {userInfo: {withName,openBank,withCount,count,withPwd,withMan,certName}} = this
				let user = this.vuex_user
				if (certName && withMan != certName) {
					uni.$u.toast(this.$t('message.attestationText'))
					return
				}
				if(withCount != count) {
					uni.$u.toast(this.$t('message.twoPwd'))
					return
				}
				let params = {
					agentId: user.id,
					withMan,
					withCount,
					withName,
					withAddress: openBank
				}
				user.withCount = withCount
				user.withName = withName
				user.withAddress = openBank
				user.withMan = withMan
				console.log(params);
				updateAgent(params).then(res => {
					this.$u.vuex('vuex_user', user)
					this.$u.toast(this.$t('message.successText'))
				})
				
				// let params = {
				// 	agentId: this.vuex_user.id,
				// 	withPwd
				// }
				// checkWithPwd(params).then(res => {
				// 	this.update(withCount)
				// })
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
<style scoped lang="scss">
    .box {
        /deep/ .u-line-1.u-navbar__content__title{
            font-size: 1rem;
            line-height: 3rem;
            color: #FFFFFF;
        }
        /deep/ .u-navbar--fixed > .u-navbar__content {
            background: url("@/static/img/other-ban.jpg");
            padding-top: 10rpx;
            padding-bottom: 10rpx;
            .u-navbar__content__left{
                .u-icon.u-icon--right {
                    .u-icon__icon.uicon-arrow-left {
                        color: #FFFFFF;
                    }
                }
            }
        }
        /deep/ .u-navbar--fixed {
            height: 100%;
        }
        .header-box {
            max-height: 120rpx;
            .u-navbar {
                height: 100%;
            }
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
        margin-top: 18%;
		.title{
			font-family: Open Sans;
			font-size: 40rpx;
			font-weight: 600;
			color: #333;
			margin-top: 150rpx;
			margin-bottom: 32rpx;
		}
	}
	
	.bank-box {
		width: 100%;
		min-height: 150rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background: #e05a5a;
	}
	
	.login-from {
		border-radius: 16rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.form-item {
		margin: 40rpx 0;
	}
	.btn {
		width: 70vw;
		background: #86784B;
		margin: 100rpx auto 50rpx auto;
		border-radius: 16rpx;
	}
</style>
