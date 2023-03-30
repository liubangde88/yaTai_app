<template>
	<view class="box rel">
		<view class="fixed" style="z-index: 999;">
			<u-navbar leftIconColor="#333" :title="$t('message.detail')" bgColor="rgba(255,255,255,.1)"
				:titleStyle="{color: '#333'}" @leftClick="back"></u-navbar>
		</view>
		<image src="@/static/img/detail-ban.png" class="header-ban abs img"></image>
		<view class="main abs">
			<u-swiper :list="banners" radius="6" height="400rpx" indicator indicatorMode="line" circular
				keyName="photoUrl"></u-swiper>
			<view class="info bgWhite">
				<view class="title col1">{{info.pname}}</view>
				<view class="tips">
					<view class="text fs26 col6">
						{{info.pcontent}}
					</view>
					<view class="text fs26 col6">
						<!-- 项目金额 -->
						{{$t('message.money')}}： <span style="color: red;">￥{{info.pprice || 0}}</span>
					</view>
					<view class="fs26 col6">
						<!-- 项目分成 -->
						{{$t('message.percentage')}}： <span style="color: #4691cb;">{{info.agentPercent || 0}}%</span>
					</view>
				</view>

				<view class="li-time fs24 col9">
					<!-- 发布日期 -->
					{{$t('message.releaseDate')}}：{{info.createTime}}
				</view>
			</view>
			<view class="info bgWhite">
				<!-- 项目医生介绍 -->
				<view class="title col1">{{$t('message.docIntro')}}</view>
				<view class="dor-info flex">
					<view class="left flexColumn">
						<image :src="info.headImg || baseImg" mode="aspectFill" class="avatar"></image>
						<text class="col1 fs28 word-b" style="width: 100%;text-align: center;">{{info.dname}}</text>
					</view>
					<view class="right flexColumn fs28 col1">
						<!-- 职位 -->
						<text class="text">{{$t('message.position')}}：<span class="col9">{{info.postName}}</span></text>
						<!-- 科室 -->
						<text class="text">{{$t('message.offices')}}：<span class="col9">{{info.officeName}}</span></text>
						<!-- 擅长 -->
						<text>{{$t('message.good')}}：<span class="col9">{{info.goodAt}}</span></text>
						<!-- 详细介绍 -->
						<text class="text" style="margin-top: 30rpx;" >{{$t('message.detailIntro')}}：</text>
						<text class="col9">{{info.detail}}</text>
					</view>
				</view>
			</view>
			<!-- 项目详情 -->
			<!-- <view class="info bgWhite">
				<view class="title col1">{{$t('message.projectDetail')}}</view>
				<view class="content">
						<u-parse :content="content"></u-parse>
					</view>
			</view> -->
		</view>
		<view class="btn-main fixed flex bgWhite">
			<view class="btn-icon flexColumn fs24 col6" @click="toPath('/pages/home/home/index')">
				<u-icon name="home" color="#666" size="24"></u-icon>
				<!-- 首页 -->
				{{$t('tabbar.home')}}
			</view>
			<view class="btn-icon flexColumn fs24 col6" @click="toPath('/pages/chat/chat/index')">
				<u-icon name="kefu-ermai" color="#666" size="24"></u-icon>
				<!-- 客服 -->
				{{$t('tabbar.chat')}}
			</view>
			<!-- 预约 -->
			<view class="btn" @click="add">
				{{$t('message.appointment')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getProjectPhoto,
		getProjectDetail,
		addProject
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				projectId: '',
				baseImg: require('@/static/img/avator_img.png'),
				banners: [],
				info: {},
				content: `
									<p>露从今夜白，月是故乡明</p>
									<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
								`
			}
		},
		onLoad(option) {
			this.projectId = option.id
			this.getProjectPhoto()
			this.getProjectDetail()
		},
		onShow() {

		},
		methods: {
			// 预约
			add() {
				if (!this.vuex_user.id) {
					this.toLogin()
					return
				}
				let params = {
					agentId: this.vuex_user.id,
					projectId: this.projectId
				}
				addProject(params).then(res => {
					uni.showToast({
						title: this.$t('message.appointmentSuccess'),
						icon: 'none',
						duration: 1500
					})
				})
			},
			// 获取项目详情
			getProjectDetail() {
				let {projectId} = this
				getProjectDetail({projectId}).then(res => {
					this.info = res.project
				})
			},
			// 获取项目图片
			getProjectPhoto() {
				let {projectId} = this
				getProjectPhoto({projectId}).then(res => {
					this.banners = res.ls.length > 0 ? res.ls : []
				})
			},
			toPath(url) {
				uni.switchTab({
					url
				})
			}
		}
	}
</script>
<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.header-box {
		/* height: 100rpx; */
		z-index: 999;
	}

	.header-ban {
		width: 100vw;
		height: 400rpx;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.main {
		/* #ifdef APP-PLUS */
		top: 160rpx;
		padding: 30rpx 30rpx 130rpx 30rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 110rpx;
		padding: 30rpx 30rpx 150rpx 30rpx;
		/* #endif */
		left: 0;
		z-index: 80;
		box-sizing: border-box;
	}

	.info {
		width: 100%;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
	}

	.title {
		font-size: 35rpx;
		border-bottom: 4rpx solid #edf7f9;
		padding-bottom: 20rpx;
	}

	.tips {
		/* height: 180rpx; */
		padding: 30rpx 0;
		/* justify-content: space-between; */
		border-bottom: 4rpx solid #edf7f9;
	}

	.li-time {
		height: 60rpx;
		line-height: 60rpx;
	}

	.dor-info {
		padding-top: 20rpx;
		align-items: flex-start;
		/* min-height: 200rpx; */
	}

	.left {
		height: 200rpx;
		width: 180rpx;
		margin-right: 20rpx;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-bottom: 10rpx;
	}

	.right {
		flex: 1;
		min-height: 200rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
	}
	.text {
		margin-bottom: 10rpx;
	}
	.btn-main {
		width: 100vw;
		height: 120rpx;
		bottom: 0;
		left: 0;
		z-index: 100;
		border-top: 1rpx solid rgba(0, 0, 0, .3);
		padding-right: 30rpx;
		box-sizing: border-box;
	}
	.btn-icon {
		width: 150rpx;
		height: 80rpx;
		justify-content: space-between;
		align-items: center;
	}
	.btn-icon + .btn-icon {
		border-left: 1px solid #edf7f9;
	}
	.btn {
		flex: 1;
		background: #69d9ec;
	}
	.content {
		padding: 20rpx 0;
	}
</style>
