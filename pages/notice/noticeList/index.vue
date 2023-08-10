<template>
	<view class="box notic-container">
		<view class="fixed" style="z-index: 999;">
			<u-navbar leftIconColor="#333" :title="$t('message.noticeList')" bgColor="rgba(255,255,255,.1)"
				:titleStyle="{color: '#333'}" @leftClick="back"></u-navbar>
		</view>
		<view class="notice-main">
			<NotData v-if="list.length == 0" />
			<view class="notice-ul" v-else>
				<view class="notice-li bgWhite flexColumn" v-for="(item,index) in list" :key="index" @click="clickHandle(item.id)">
					<view class="title fs32 col1">
						<view>
							{{item.title}}
						</view>
						<image src="@/static/img/right-arrow.png" :class="['img', item.id === info.id ? 'active' : '']"></image>
					</view>
					<view class="content" v-if="item.id === info.id">
						{{info.content}}
					</view>
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
		getListNotice,
		getNoticeDetail
	} from "@/common/js/http.api.js";
	import NotData from '@/components/notData/index.vue'; 
	export default {
		components: {
			NotData
		},
		data() {
			return {
				list: [],
				page: 1,
				pagesize: 10,
				nextPage: false, //是否加载
				info: {},
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
				if(this.info.id === id) {
					this.info = {};
					return;
				}
				getNoticeDetail({
					noticeId: id
				}).then(res => {
					res.active = true;
					this.info = res.notice;
				})
				// uni.navigateTo({
				// 	url: '/pages/notice/noticeDtail/index?id=' + id
				// })
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
	.notic-container{
		background: url('@/static/img/notice-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		.content{
			font-family: PingFang HK;
			font-size: 26rpx;
			font-weight: 400;
			color: #979797;
			line-height: 1.5em;
		}
	}
	.notice-main {
		margin-top: 80rpx;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		.img{
			width: 12rpx;
			height: 20rpx;
			transition: rotate 0.2s;
			&.active{
				transform: rotate(90deg);
			}
		}
	}
</style>
