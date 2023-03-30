<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/agent-ban.png" class="header-ban img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.cashRecord')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="record-ul" v-if="list.length > 0">
			<view class="record-li bgWhite flex" v-for="(item,index) in list" :key="index">
				<view class="cash-icon flex fs30 colf">
					{{$t('message.cash')}}
				</view>
				<view class="li-right flex-1 flexColumn flex-sa">
					<view class="info flex flex-sb">
						<view class="fs32 bold flex-1">￥ <span style="font-size: 40rpx;">{{item.withMoney}}</span>（HK$）</view>
						<view class="fs24 col1" style="width: 250rpx;text-align: right;">{{$t('message.transfer')}}{{$t('message.bank')}} {{item.withCount}}</view>
					</view>
					<view class="info flex flex-sb fs24 col9">
						<view class="flex-1">{{$t('message.balanceText')}}: ￥{{item.supMoney}}（HK$）</view>
						<view style="width: 250rpx;text-align: right;">{{item.createTime}}</view>
					</view>
				</view>
			</view>
			<!-- 加载更多 -->
			<u-loadmore :status="status" :loadmoreText="$t('message.loadmoreText')"
				:loadingText="$t('message.loadingText')" :nomoreText="$t('message.nomoreText')" />
		</view>
		<view class="record-ul flex flex-cen" style="height: 500rpx;" v-else>
			<u-empty mode="list" text="暂无记录~"></u-empty>
		</view>
	</view>
</template>

<script>
	import {
			getListWithdraw
		} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				status: 'nomore',
				list: [],
				page: 1,
				pagesize: 10,
				nextPage: false, //是否加载
			}
		},
		onLoad(option) {
			this.getList()
		},
		onShow() {

		},
		// 页面触底
		onReachBottom() {
			let that = this
			let {
				pagesize,
				page,
				nextPage
			} = that
			if (nextPage) {
				that.page += 1
				that.getList()
			}
		},
		methods: {
			// 获取项目列表
			getList() {
				let {page,pagesize} = this
				let params = {
					agentId: this.vuex_user.id,
					page,
					pagesize
				}
				getListWithdraw(params).then(res => {
					if (this.page == 1) {
							uni.pageScrollTo({
								scrollTop: 0,
							})
						}
						if(res.ls.length > 0) {
							res.ls.map(item => {
								item.withCount = '**** ' + item.withCount.slice(-4)
							})
						}
					this.list = this.list.concat(res.ls)
					this.nextPage = res.ls.length == pagesize
				})
			},
		}
	}
</script>
<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.record-ul {
		width: 100vw;
		/* #ifdef APP-PLUS */
		margin-top: 260rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 210rpx;
		/* #endif */
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}
	.record-li {
		width: 100%;
		min-height: 140rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}
	.cash-icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		justify-content: center;
		background: linear-gradient(-45deg, #78d4e7, #57b3c5);
		margin-right: 30rpx;
	}
	.li-right {
		height: 100%;
	}
	.info {
		width: 100%;
	}
</style>t
