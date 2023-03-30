<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/agent-ban.png" class="header-ban img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.wallet')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="wallet-main flexColumn">
			<image src="@/static/img/wallet.png" mode="" class="wallet-img"></image>
			<text class="fs30 col1">{{$t('message.balance')}}</text>
			<text class="fs30 col1">￥ <span class="bold" style="font-size: 70rpx;margin: 20rpx 0;">{{info.supMoney}}</span>（HK$）</text>
			<text class="fs30" style="color: red;margin-bottom: 20rpx;">{{$t('message.freeze')}}: {{info.freezeMoney}}（HK$）</text>
			<view class="btn cash" @click="toPath(`/pages/my/cash/index?money=${info.supMoney}`,'cash')">
				{{$t('message.cash')}}
			</view>
			<view class="btn bank" @click="toPath('/pages/my/cashRecord/index','record')">
				{{$t('message.cashRecord')}}
			</view>
			<view class="btn bank" @click="toPath('/pages/my/myBank/index','bank')">
				{{$t('message.bank')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWallet
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(option) {

		},
		onShow() {
			this.getWallet()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.getWallet()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			// 获取钱包详情
			getWallet() {
				let params = {
					agentId: this.vuex_user.id
				}
				getWallet(params).then(res => {
					this.info = res.wallet
				})
			},
			toPath(url,type) {
				let {vuex_user: {withCount,withName,withPwd,withAddress,withMan,certType,certName,certNum}} = this
				if((type == 'cash' || type == 'bank') && !certType && !certName && !certNum) {
					uni.showModal({
					  title: this.$t('message.promptText'),
					  content: this.$t('message.attestationTips1'),
					  confirmText: this.$t('message.goSet'),
						cancelText: this.$t('message.cancel'),
					  success: function(res) {
					    if (res.confirm) {
					      uni.navigateTo({
					        url: '/pages/else/attestation'
					      })
					    }
					  }
					})
				}else if(type == 'cash' && (!withMan || !withCount || !withAddress || !withName || !withPwd)) {
					
					let str = ''
					let path = ''
					if(!withMan || !withCount || !withName || !withAddress) {
						str = this.$t('message.tips4')
						path = '/pages/my/myBank/index'
					}
					if(!withPwd) {
						str = this.$t('message.tips1')
						path = '/pages/else/setting'
					}
					
					uni.showModal({
					  title: this.$t('message.promptText'),
					  content: str,
					  confirmText: this.$t('message.goSet'),
						cancelText: this.$t('message.cancel'),
					  success: function(res) {
					    if (res.confirm) {
					      uni.navigateTo({
					        url: path
					      })
					    }
					  }
					})
					
					// let str = ''
					// if(!withCount) str = this.$t('message.tips2')
					// if(!withName) str = this.$t('message.tips3')
					// if(!withPwd) str = this.$t('message.tips1')
					
					// uni.showModal({
					//   title: this.$t('message.promptText'),
					//   content: str,
					//   confirmText: this.$t('message.goSet'),
					// 	cancelText: this.$t('message.cancel'),
					//   success: function(res) {
					//     if (res.confirm) {
					//       uni.navigateTo({
					//         url: '/pages/else/setting'
					//       })
					//     }
					//   }
					// })
				}else {
					uni.navigateTo({
						url
					})
				}
				
			}
		}
	}
</script>
<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.header-box {
		/* #ifdef APP-PLUS */
		height: 260rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 210rpx;
		/* #endif */
	}
	.wallet-main {
		/* #ifdef APP-PLUS */
		margin-top: 360rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 310rpx;
		/* #endif */
		width: 100vw;
		height: calc( 100vh - 400rpx);
		align-items: center;
	}
	.wallet-img {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 50rpx;
	}
	.btn {
		width: 70vw;
		margin-top: 50rpx;
	}
	.cash {
		background: #55c4d8;
	}
	.bank {
		background: #fff;
		color: #55c4d8;
	}
</style>
