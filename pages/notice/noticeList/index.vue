<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/agent-ban.png" class="header-ban img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.noticeList')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="notice-main">
			<view class="notice-ul flex flex-cen bgWhite" style="height: 500rpx;" v-if="list.length == 0">
				<u-empty mode="list" :text="$t('message.emptyText')"></u-empty>
			</view>
			<view class="notice-ul" v-else>
				<view class="notice-li bgWhite flexColumn" v-for="(item,index) in list" :key="index" @click="clickHandle(item.id)">
					<view class="title fs32 col1">{{item.title}}</view>
					<text class="fs28 col9">{{item.createTime}}</text>
				</view>
				<!-- 加载更多 -->
				<u-loadmore :status="status" :loadmoreText="$t('message.loadmoreText')"
					:loadingText="$t('message.loadingText')" :nomoreText="$t('message.nomoreText')"/>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getListNotice
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pagesize: 10,
				nextPage: false, //是否加载
			}
		},
		computed: {
			status() {
				return this.nextPage ? 'loadmore' : 'nomore'
			}
		},
		onLoad(option) {
			this.getListNotice()
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
				that.getListNotice()
			}
		},
		methods: {
			clickHandle(id) {
				uni.navigateTo({
					url: '/pages/notice/noticeDtail/index?id=' + id
				})
			},
			// 获取公告列表
			getListNotice() {
				let {page,pagesize} = this
				let params = {
					page,
					pagesize
				}
				getListNotice(params).then(res => {
					if (this.page == 1) {
							uni.pageScrollTo({
								scrollTop: 0,
							})
						}
					this.list = this.list.concat(res.ls)
					this.nextPage = res.ls.length == pagesize
				})
			}
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.notice-main {
		width: 100vw;
		min-height: calc(100vh - 300rpx);
		/* #ifdef APP-PLUS */
		margin-top: 280rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 230rpx;
		/* #endif */
		padding: 30rpx;
		box-sizing: border-box;
	}
	.notice-li {
		width: 100%;
		border-radius: 25rpx;
		min-height: 100rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}
	.title {
		margin-bottom: 10rpx;
	}
</style>
