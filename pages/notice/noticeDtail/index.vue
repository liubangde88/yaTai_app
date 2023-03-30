<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/agent-ban.png" class="header-ban img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.noticeDetail')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="detail-main">
			<view class="detail-box bgWhite flexColumn">
				<text class="notice fs32 col1 bold">{{info.title}}</text>
				<text class="notice fs28 col9">{{info.createTime}}</text>
				<view class="detail fs28 col1">
					{{info.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNoticeDetail
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				noticeId: '',
				info: {}
			}
		},
		onLoad(option) {
			this.noticeId = option.id
			uni.setStorageSync('noticeId',option.id)
			this.getNoticeDetail()
		},
		onShow() {

		},
		methods: {
			getNoticeDetail() {
				let {
					noticeId
				} = this
				getNoticeDetail({
					noticeId
				}).then(res => {
					this.info = res.notice
				})
			}
		}
	}
</script>
<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.detail-main {
		width: 100vw;
		/* #ifdef APP-PLUS */
		margin-top: 280rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 230rpx;
		/* #endif */
		padding: 30rpx;
		box-sizing: border-box;
	}

	.detail-box {
		width: 100%;
		min-height: calc(100vh - 500rpx);
		padding: 50rpx 20rpx;
		box-sizing: border-box;
		border-radius: 25rpx;
	}

	.notice {
		text-align: center;
		margin-bottom: 20rpx;
	}

	.detail {
		margin-top: 20rpx;
		line-height: 60rpx;
	}
</style>
