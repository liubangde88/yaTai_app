<template>
	<view class="wallet-container">
		<view class="header-box fixed">
			<!-- <image src="@/static/img/my-bg.png" class="header-ban img"></image> -->
			<u-navbar leftIconColor="#fff" :title="$t('message.wallet')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="head">
			<view>
				<view class="balance">{{$t('message.balance')}}</view>
				<text class="money">{{info.supMoney}}</text>
			</view>
			<view class="recharge">
				{{$t('message.myPageRecharge')}}
			</view>
		</view>
		<view class="recharge-record">
			{{$t('message.rechargeRecord')}}
		</view>
		<view class="tab">
			<view 
			:class="['item', index === activeIndex ? 'active' : '']" 
			v-for="(item, index) in tab" 
			:key="index"
			@click="queryData(item, index)"
			>
				{{$t(item.title)}}
			</view>
		</view>
		<view class="order-list">
			<view class="item" v-for="(item, index) in orderData" :key="index">
				<view class="content">
					<view class="avatar">
						<image :src="item.avatar" class="img" />
						<text class="name">{{item.name}}</text>
					</view>
					<view class="desc">
						<view class="p-name">{{item.pName}}</view>
						<view class="info">{{item.info}}</view>
						<view class="date">{{item.date}}</view>
						<view class="info">
							<text class="ellipsis">{{$t('message.walletOrder')}}：{{item.orderId}}</text>
							<image src="@/static/img/copy.png" class="copy" @click="copyData(item.orderId)" />
						</view>
					</view>
					<view :class="['type', item.type]">{{item.typeName}}</view>
				</view>
				<view class="fee">
					<view :class="['money', item.type !== 'obligation' ? 'other' : '']">
						<text>{{$t('message.walletFee')}}:</text>
						<text>{{item.fee}}</text>
					</View>
					<view class="btn" v-if="item.type === 'obligation'">
						<text class="cancel">{{$t('message.walletCancel')}}</text>
						<text class="submit">{{$t('message.walletSubmit')}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="1">
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
		</view> -->
	</view>
</template>

<script>
	import {
		getWallet
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				activeIndex: 0,
				tab: [
					{ title: 'message.walletAll', type: 'all' },
					{ title: 'message.walletObligation', type: 'obligation' },
					{ title: 'message.walletAudit', type: 'aduit' },
					{ title: 'message.walletCompleted', type: 'completed' },
					{ title: 'message.walletCanceled', type: 'canceled' },
				],
				orderData: [
					{
						avatar: require('@/static/img/avator_img.png'),
						name: '李医生',
						info: '香港陶女士韩式隆鼻 隆鼻...',
						pName: '韩国整容',
						date: '2023-07-26 21:20:03',
						orderId: '443123442232443123442232....',
						type: 'obligation',
						typeName: '待付款',
						fee: '1000'
					},
					{
						avatar: require('@/static/img/avator_img.png'),
						name: '李医生',
						info: '香港陶女士韩式隆鼻 隆鼻...',
						pName: '韩国整容',
						date: '2023-07-26 21:20:03',
						orderId: '443123442232....',
						type: 'completed',
						typeName: '已完成',
						fee: '1000'
					},
					{
						avatar: require('@/static/img/avator_img.png'),
						name: '李医生',
						info: '香港陶女士韩式隆鼻 隆鼻...',
						pName: '韩国整容',
						date: '2023-07-26 21:20:03',
						orderId: '443123442232....',
						type: 'canceled',
						typeName: '已取消',
						fee: '1000'
					},
					{
						avatar: require('@/static/img/avator_img.png'),
						name: '李医生',
						info: '香港陶女士韩式隆鼻 隆鼻...',
						pName: '韩国整容',
						date: '2023-07-26 21:20:03',
						orderId: '443123442232....',
						type: 'aduit',
						typeName: '待审核',
						fee: '1000'
					}
				],
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
			queryData(item, index) {
				this.activeIndex = index;
				console.log(item);
			},
			// 获取钱包详情
			getWallet() {
				let params = {
					agentId: this.vuex_user.id
				}
				getWallet(params).then(res => {
					this.info = res.wallet
				})
			},
			copyData(data) {
				const that = this;
				uni.setClipboardData({
					data,
					complete(res) {
						uni.hideToast();
						if(res.errMsg === 'setClipboardData:ok') {
							uni.showToast({
								icon: 'none',
								title: that.$t('message.copySuccess')
							})
						}
					}
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
<style scoped lang="scss">
	.wallet-container{
		background: url('@/static/img/my-bg.png') no-repeat;
		background-size: 100%;
		background-position: 0 -80rpx;
		.head{
			height: 400rpx;
			display: flex;
			justify-content: space-between;
			color: #fff;
			align-items: center;
			margin-left: 64rpx;
			.balance{
				font-family: PingFang HK;
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}
			.money{
				font-family: Open Sans;
				font-size: 48rpx;
			}
			.recharge{
				width: 140rpx;
				line-height: 70rpx;
				border-radius: 44rpx 0px 0px 44rpx;
				font-family: ABeeZee;
				font-size: 36rpx;
				background: rgba(255, 255, 255, 0.12);
				text-align: center;
			}
		}
		.recharge-record{
			font-family: PingFang HK;
			font-size: 28rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			margin-left: 32rpx;
			border-left: 4px solid #9F997E;
			padding-left: 20rpx;

		}
		.tab{
			display: flex;
			margin-left: 32rpx;
			margin-right: 32rpx;
			background-color: #EAEAEA;
			border-radius: 16rpx;
			overflow: hidden;
			height: 82rpx;
			text-align: center;
			align-items: center;
			.item{
				flex: 1;
				font-family: ABeeZee;
				font-size: 26rpx;
				height: 82rpx;
				line-height: 82rpx;
				&.active{
					background-color: #86784B;
					color: #fff;
				}
			}
		}
		.order-list{
			margin-left: 32rpx;
			margin-right: 32rpx;
			margin-top: 32rpx;
			.item{
				background-color: #fff;
				border-radius: 16rpx;
				margin-bottom: 40rpx;
				.content{
					padding-top: 36rpx;
					padding-left: 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.avatar{
						text-align: center;
						.img{
							width: 128rpx;
							height: 128rpx;
							border: 2Px solid #A68F46;
							border-radius: 100%;
						}
						.name{
							display: block;
							font-family: PingFang HK;
							font-size: 28rpx;
						}
					}
					.desc{
						.p-name{
							display: block;
							font-family: PingFang HK;
							font-size: 28rpx;
							color: #000;
						}
						.info{
							font-family: PingFang HK;
							font-size: 24rpx;
							color: #979797;
							display: flex;
							align-items: center;
							.ellipsis{
								display: block;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								max-width: 330rpx;
							}
							.copy{
								width: 22rpx;
								height: 26rpx;
								margin-left: 10rpx;
							}
						}
						.date{
							font-family: ABeeZee;
							font-size: 24rpx;
							color: #979797;
							margin-top: 20rpx;
							margin-bottom: 20rpx;
						}
					}
					.type{
						width: 114rpx;
						height: 52rpx;
						line-height: 52rpx;
						border-radius: 44rpx 0px 0px 44rpx;
						background: rgba(134, 120, 75, 0.12);
						text-align: center;
						&.completed{
							color: #86784B;
						}
						&.aduit{
							color: #0085FF;
						}
						&.canceled{
							color: #C92400;
						}
						&.obligation{
							color: #00B11C;
						}
					}
				}
				.fee{
					height: 84rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid rgba(0, 0, 0, 0.05);
					margin-top: 26rpx;
					margin-left: 32rpx;
					margin-right: 32rpx;
					.money{
						font-family: ABeeZee;
						font-size: 32rpx;
						color: #86784B;
						&.other{
							width: 100%;
							display: flex;
							justify-content: space-between;
						}
					}
					.btn{
						display: flex;
						gap: 20rpx;
						align-items: center;
						text{
							display: block;
							width: 142rpx;
							height: 60rpx;
							line-height: 60rpx;
							background-color: #D9D9D9;
							font-family: ABeeZee;
							font-size: 24rpx;
							color: #333333;
							border-radius: 8rpx;
							&.submit{
								color: #FFFFFF;
								background-color: #86784B;
							}
						}
					}
				}
			}
		}
	}
	
</style>
