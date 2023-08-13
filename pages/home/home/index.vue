<template>
	<view class="box rel" :class="isPopup ? 'hid' : 'no'">
		<image src="@/static/img/home-ban.png" class="header-img abs"></image>
		<!-- <view class="header-info abs flexColumn">
			<view class="app-name flex">
				<image src="@/static/img/logo.png" mode="" class="logo"></image>
				<view class="flex-1">
					{{$t('message.appName')}}{{$t('message.mechanism')}}
				</view>
			</view>
			<view class="flex fs30">
				<image src="@/static/img/login-icon.png" mode="" class="login-icon"></image>
				{{$t('message.aim')}}
			</view>
		</view> -->
		<view class="main abs home-search">
			<u-search 
			:placeholder="$t('message.search')" 
			:disabled="true" 
			v-model="name" 
			:clearabled="true"
			:showAction="false" 
			height="50px" 
			searchIconColor="#A19878" 
			searchIconSize="26" 
			placeholderColor="#333"
			color="#333" 
			@click="toPath(1,'/pages/project/project/index')" />

			<!-- 首页banner -->
			<!-- <view class="banner" v-if="banners.length > 0">
				<u-swiper :list="banners" interval="8000" radius="6" height="300rpx" indicator indicatorMode="line"
					circular keyName="bannerCover"></u-swiper>
			</view> -->


			<!-- 附件下载 -->
			<!-- <view class="downLoad" v-if="fjInfo.length > 0">
				<u-notice-bar :text="fjInfo[0].attName" @click="downHandle"></u-notice-bar>
			</view> -->

			<!-- <view class="downLoad bgWhite flex" v-if="fjInfo.length > 0">
				<u-icon name="arrow-downward" color="#111" size="14"></u-icon>
				<text class="fs28 col1">{{$t('message.attachment')}}：</text>
				<view class="down fs30 flex" @click="downHandle(fjInfo[0].attUrl)">
					{{fjInfo[0].attName}}
				</view>
			</view> -->
			<!-- 菜单栏 -->
			<view class="channel">
				<view class="item" @click="toPath(1,'/pages/project/project/index')">
					<image src="@/static/img/channel-img2.png" mode="" class="img" />
					<text>{{$t('message.projectList')}}</text>
				</view>
				<view class="item" @click="toPath(0,'/pages/my/order/index')">
					<image src="@/static/img/channel-img3.png" mode="" class="img" />
					<text>{{$t('message.myOrder')}}</text>
				</view>
				<view class="item" @click="toPath(1,'/pages/project/project/index')">
					<image src="@/static/img/channel-img1.png" mode="" class="img" />
					<text>{{$t('message.projectTj')}}</text>
				</view>
				<view class="item" @click="toPath(0,'/pages/agent/index')">
					<image src="@/static/img/channel-img4.png" mode="" class="img" />
					<text>{{$t('message.agentCenter')}}</text>
				</view>
			</view>
			<!-- <view class="menu bgWhite flexColumn flex-sa">
				<view class="flex flex-sb">
					<view class="menu-btn1 rel" @click="toPath(0,'/pages/my/order/index')">
						<image src="@/static/img/order-btn.png" mode="" class="img"></image>
						<view class="menu-li abs flex fs32 bold flex-cen">
							<image src="@/static/img/order-icon.png" mode="" class="menu-li-icon"></image>
							{{$t('message.myOrder')}}
						</view>
					</view>
					<view class="menu-btn1 rel" @click="toPath(0,'/pages/agent/index')">
						<image src="@/static/img/proxy-btn.png" mode="" class="img"></image>
						<view class="menu-li abs flex fs32 bold flex flex-cen">
							<image src="@/static/img/proxy-icon.png" mode="" class="menu-li-icon"></image>
							{{$t('message.agentCenter')}}
						</view>
					</view>
				</view>
				<view class="menu-btn2 rel" @click="toPath(1,'/pages/project/project/index')">
					<image src="@/static/img/list-btn.png" mode="" class="img"></image>
					<view class="menu-li abs flex fs32 bold">
						<image src="@/static/img/list-icon.png" class="menu-li-icon" style="margin-left: 70rpx;">
						</image>
						{{$t('message.projectList')}}
					</view>
				</view>
			</view> -->
			<!-- 推荐项目列表 -->
			<view class="list-box">
				<!-- <view class="list-title flex flex-sb">
					<text class="col1 fs32 bold">{{$t('message.projectTj')}}</text>
					<view class="fs24 mainColor flex" @click="toPath(1,'/pages/project/project/index')">
						<u-icon name="plus-circle-fill" color="#A19878" style="margin-right: 5rpx;"></u-icon>
						{{$t('message.more')}}
					</view>
				</view> -->
				<Project :list="list"  :isShow="true" @clickHnadle="clickHnadle"></Project>
			</view>
		</view>
		<!-- 公告弹窗 -->

		<uni-popup ref="popup" type="center" :is-mask-click="false">
			<view class="popup-box bgWhite fixed">
				<view class="popup-title flex">
					<text class="fs32 col1 bold flex-1" style="text-align: center;">{{$t('message.notice')}}</text>
					<u-icon name="close-circle" color="#999" size="20" @click="close"></u-icon>
				</view>
				<view class="popup-info flexColumn">
					<text class="notice fs30 col1 bold">{{info.title}}</text>
					<text class="notice fs24 col9">{{info.createTime}}</text>
					<view class="detail fs24 col1">
						{{info.content}}
					</view>
				</view>
			</view>
		</uni-popup>
		<UpdateAppModal />
	</view>
</template>

<script>
	import {
		getListProject,
		addProject,
		getIndexBanner,
		getListAtt,
		getListNotice
	} from "@/common/js/http.api.js"
	import Project from '@/components/projectList/projectList.vue'
	import UpdateAppModal from '@/components/updateAppModal/index'
	export default {
		components: {
			Project,
			UpdateAppModal
		},
		data() {
			return {
				banners: [],
				name: '',
				list: [],
				fjInfo: [],
				info: {},
				isPopup: false
			}
		},
		mounted() {
			// uni.removeStorageSync('noticeId')
			this.getListNotice()
		},
		onLoad(option) {
			this.getList()
			this.getIndexBanner()
			this.getListAtt()
		},
		onShow() {

		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.list = []
			this.getList()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			// 获取公告列表
			getListNotice() {
				let noticeId = uni.getStorageSync('noticeId') || ''
				let params = {
					page: 1,
					pagesize: 10
				}
				getListNotice(params).then(res => {
					if (res.ls.length > 0) {
						this.info = res.ls[0]
						let id = res.ls[0].id
						if (id != noticeId) {
							this.$refs.popup.open()
							this.isPopup = true
							uni.setStorageSync('noticeId', id)
						}
					}
				})
			},
			// 获取附件列表
			getListAtt() {
				getListAtt().then(res => {
					this.fjInfo = res.ls
				})
			},
			// 获取首页banner
			getIndexBanner() {
				getIndexBanner().then(res => {
					this.banners = res.bannerls
				})
			},
			// 获取项目列表
			getList() {
				let params = {
					page: 1,
					pagesize: 10
				}
				getListProject(params).then(res => {
					this.list = res.ls
				})
			},
			// 预约
			clickHnadle(e) {
				if (!this.vuex_user.id) {
					this.toLogin()
					return
				}
				let params = {
					agentId: this.vuex_user.id,
					projectId: e
				}
				addProject(params).then(res => {
					uni.showToast({
						title: this.$t('message.appointmentSuccess'),
						icon: 'none',
						duration: 1500
					})
				})
			},
			// 附件下载
			downHandle() {
				let that = this
				uni.downloadFile({
					url: that.fjInfo[0].attUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							that.$u.toast(that.$t('message.successText'))
						}
					},
					fail(err) {
						console.log(err);
					}
				});
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
				this.isPopup = false
			},
			toPath(type, url) {
				if (type == 0) {
					if (!this.vuex_user.id) {
						this.toLogin()
						return
					}
					uni.navigateTo({
						url
					})
				}
				if (type == 1) {
					uni.switchTab({
						url
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  .word-b{
   /* /deep/ .*/
  }
	.hid {
		height: 98vh;
		overflow: hidden;
	}

	.header-img {
		width: 100%;
		height: 12rem;
	}

	.header-info {
		top: 130rpx;
		left: 0;
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #fff;
		z-index: 11;
	}

	.app-name {
		font-size: 40rpx;
		font-weight: 500;
		line-height: 40rpx;
		margin-bottom: 15rpx;
	}

	.logo {
		width: 60rpx;
		height: 60rpx;
		margin-right: 5rpx;
	}

	.mechanism {
		font-size: 60rpx;
		font-weight: 600;
		line-height: 60rpx;
		margin-bottom: 15rpx;
	}

	.login-icon {
		width: 30rpx;
		height: 30rpx;
		margin: 0 10rpx;
	}

	.main {
		width: 100vw;
		/* #ifdef APP-PLUS */
		padding: 20rpx 30rpx;
		top: 280rpx;
		/* #endif */
		/* #ifdef H5 */
		padding: 20rpx 30rpx 130rpx 30rpx;
		top: 280rpx;
		/* #endif */
		box-sizing: border-box;
		z-index: 10;
	}

	.downLoad {
		margin-top: 35rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		border-radius: 25rpx;
		background: #fdf6ec;
	}

	.banner {
		margin-top: 35rpx;
	}

	.menu {
		margin: 35rpx 0;
		height: 360rpx;
		border-radius: 25rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.menu-btn1 {
		width: 48.5%;
		height: 130rpx;
		color: #fff;
	}

	.menu-btn2 {
		width: 100%;
		height: 140rpx;
		color: rgb(5, 167, 213);
	}

	.menu-li {
		width: 100%;
		height: 100%;
		top: 0rpx;
		left: 0rpx;
	}

	.menu-li-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 5rpx;
	}

	.list-box {
		width: 100%;
		min-height: calc(100vh - 840rpx);
		border-radius: 25rpx;
	}

	.list-title {
		height: 100rpx;
		padding: 0 30rpx;
		border-bottom: 4rpx solid #e3f1f4;
	}

	.downLoad {
		padding: 5rpx 15rpx;
		/* height: 80rpx; */
		box-sizing: border-box;
	}

	.down {
		flex: 1;
		text-decoration: underline;
		color: #72b5c5;
	}

	.popup-box {
		top: 25vh;
		left: 10vw;
		width: 80vw;
		height: 50vh;
		border-radius: 25rpx;
		padding: 0 30rpx 20rpx 30rpx;
		box-sizing: border-box;
	}

	.popup-title {
		width: 100%;
		height: 100rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.popup-info {
		width: 100%;
		height: calc(50vh - 120rpx);
		overflow: hidden;
		overflow-y: scroll;
	}

	.notice {
		text-align: center;
		margin-bottom: 10rpx;
	}

	.detail {
		margin-top: 10rpx;
		line-height: 40rpx;
	}
	.channel{
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx 36rpx;
		margin-top: 26rpx;
		margin-bottom: 26rpx;
		.item{
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #979797;
			.img{
				width: 96rpx;
				height: 96rpx;
				margin-bottom: 20rpx;
			}
		}
	}
	
</style>
