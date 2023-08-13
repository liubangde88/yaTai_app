<template>
	<view class="wallet-container">
		<view class="header-box fixed">
			<!-- <image src="@/static/img/my-bg.png" class="header-ban img"></image> -->
			<u-navbar leftIconColor="#fff" :title="$t('message.wallet')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="head">
            <!--账户余额-->
			<view>
				<view class="balance">{{$t('message.balance')}}</view>
				<text class="money">{{info.supMoney}}</text>
			</view>

            <!--冻结金额-->
            <view>
                <view class="balance">{{$t('message.freeze')}}</view>
                <text class="money">{{info.freezeMoney}}</text>
            </view>

			<view class="recharge" @click="recharge">
				{{$t('message.myPageRecharge')}} >>
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
					<view class="desc">
                        <!-- 消息标题-->
						<view class="p-name">{{item.pName}}</view>
						<view class="info">{{item.info}}</view>
						<view class="date">{{item.date}}</view>
						<view class="info">
							<text class="ellipsis">{{$t('message.walletOrder')}}：{{item.orderId}}</text>
							<image src="@/static/img/copy.png" class="copy" @click="copyData(item.orderId)" />
						</view>
					</view>
				</view>
				<view class="fee">
					<view :class="['money', item.type !== 'obligation' ? 'other' : '']">
						<text>{{$t('message.walletFee')}}:</text>
						<text>{{item.fee}}</text>
					</View>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getWallet, // 获取钱包信息
        getRechargeList, // 获取充值记录
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				activeIndex: 0,
				tab: [
					{ title: 'message.walletAll', type: 'all' },
					{ title: 'message.walletObligation', type: 'obligation' },
					{ title: 'message.walletAudit', type: 'aduit' },
				],
				orderData: [],
				info: {},
                totalData : [], // 总数据
			}
		},
		onLoad(option) {
            // 获取充值记录
            getRechargeList({  agentId: this.vuex_user.id }).then(res => {
                // 如果获信息错误
                if(res.code != 0 ){
                   return  uni.showToast({
                        icon: 'none',
                        title: res.msg
                    })
                }

                // 进行数据组装
                const  list = res.list
                let data = []
                list.forEach((item) => {
                    let param = {
                        info: '香港陶女士韩式隆鼻 隆鼻...',
                        pName: '韩国整容',
                        date: '2023-07-26 21:20:03',
                        orderId: '443123442232443123442232....',
                        type: 'obligation',
                        typeName: '待付款',
                        fee: '1000'
                    }
                    param.pName = item.type == 0 ? "资金充值账单" : "资金冻结账单"
                    param.info = '充值前余额:' + (item.fsupMoney) + ' ' + '充值后余额:' + (item.bsupMoney)
                    param.date = item.createTime
                    param.orderId = "order-info" +  item.bsupMoney + item.fsupMoney + item.agentId + item.money + item.id
                    param.fee = item.money
                    param.type = item.type
                    data.push(param)
                })
               this.orderData = data

                // 总数据集合
                this.totalData = data
            })

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
            recharge() {
                return uni.showToast({
                    icon: 'none',
                    title: this.$t('message.contact')
                })

            },
			queryData(item, index) {
                // uni.showToast({
                //     icon: 'none',
                //     title: "正在加载",
                //     loading : true
                // })
                setTimeout(() => {

                    // 当前tab
                    this.activeIndex = index;

                    //如果查看全部账单
                    if( index === 0 ) {
                        this.orderData = this.totalData
                    }

                    // 用户查看充值账单
                    if( index === 1) {
                        let data1 = []
                        this.totalData.forEach((item) => {
                            if( item.type === 0) {
                                data1.push(item)
                            }
                        })
                        this.orderData = data1
                    }

                    // 用户查看冻结账单
                    if( index === 2) {
                        console.log("冻结账单")
                        let data2 = []
                        this.totalData.forEach((item) => {
                            if( item.type != 0) {
                                data2.push(item)
                            }
                        })
                        this.orderData = data2
                    }

                }, 100)

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
				line-height: 60rpx;
				border-radius: 44rpx 0px 0px 44rpx;
				font-family: ABeeZee;
				font-size: 26rpx;
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
                            line-height: 3rem;
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
						font-size: 10rpx;
                        font-weight: bolder;
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
