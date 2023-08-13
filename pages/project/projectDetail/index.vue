<template>
	<view class="box rel">
		<view class="fixed" style="z-index: 999;">
			<u-navbar leftIconColor="#333" :title="$t('message.detail')" bgColor="rgba(255,255,255,.1)"
				:titleStyle="{color: '#333'}" @leftClick="back"></u-navbar>
		</view>
		<view class="main">
			<view class="bgWhite doctor">
				<view class="info">
					<view class="left flexColumn">
						<image :src="info.headImg || baseImg" mode="aspectFill" class="avatar"></image>
					</view>
					<view style="max-width: 200px;">
						<text class="col1 fs28 word-b">{{info.dname}}</text>
						<view class="mag-b fs26 col6 line-one">
							{{info.pcontent}}
						</view>
					</view>
					<view class="li-right flex fs24 appointment" @click.stop="click(info.id)">
						{{$t('message.appointment')}}
					</view>
				</view>
				<view class="li-main flex">
					<view>
						<view class="title">{{$t('message.pName')}}</view>
						<view class="content">
							{{info.pname}}
						</view>
					</view>
					<!-- 项目金额 -->
					<view>
						<view class="title">{{$t('message.money')}}</view>
						<view class="content" style="text-align: left">
							<span>￥{{info.pprice || 0}}</span><span>（HK$）</span>
						</view>
					</view>
					<view class="mag-b fs26 col6" id="caonimadebi">
						<view class="title">{{$t('message.percentage')}}</view>
						<view class="content">
							<span>{{info.agentPercent || 0}}%</span>
						</view>
					</view>
				</view>
				<view class="li-time fs24 col9 flex release-date">
					<view>{{$t('message.releaseDate')}}</view>
					<view>{{info.upTime}}</view>
				</view>
			</view>
			<view class="detail">
				<view class="title">
					<image src="@/static/img/doctor-detail-icon.png" mode="aspectFill" class="img"></image>
					<text>{{$t('message.productRecDoctor')}}</text>
				</view>
				<!-- <view class="more">
					<image src="@/static/img/doctor-detail-more.png" mode="aspectFill" class="img"></image>
					<text>{{$t('message.more')}}</text>
				</view> -->
			</view>
			<view class="info bgWhite">
				<!-- 项目医生介绍 -->
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
						<text>{{$t('message.good')}}：<span class="col9 shanchang">{{info.goodAt}}</span></text>
					</view>
				</view>
				<view class="doctor-desc">
					<!-- 详细介绍 -->
					<view class="text" >{{$t('message.detailIntro')}}：</view>
					<text class="col9 xxjs">{{info.detail}}</text>
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
				<image src="@/static/tab/home.png" mode="aspectFill" class="img"></image>
				<!-- 首页 -->
				{{$t('tabbar.home')}}
			</view>
			<view class="btn-icon flexColumn fs24 col6" @click="toPath('/pages/chat/chat/index')">
				<image src="@/static/tab/chat.png" mode="aspectFill" class="img"></image>
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
    .box {
        /deep/ .u-line-1.u-navbar__content__title{
            font-size: 1rem;
            line-height: 3rem;
            color: #FFFFFF !important;
        }
        /deep/ .u-navbar--fixed > .u-navbar__content {
            background: url("@/static/img/other-ban.jpg");
            .u-navbar__content__left{
                .u-icon.u-icon--right {
                    .u-icon__icon.uicon-arrow-left {
                        color: #FFFFFF !important;
                    }
                }
            }
        }
    }
    .xxjs {
        line-height:1.1rem;
        font-size: 0.8rem;
    }
    .shanchang {
        line-height: 1.4rem;
        font-size: 28rpx;
    }
.line-one{
        line-height: 2rem;
    }
  #caonimadebi {
    /deep/ .content {
      width: 100px;
      text-align: left;
    }
  }
	.appointment {
		background: linear-gradient(-45deg, #A19878, #A19878);
		width: 140rpx;
		height: 50rpx;
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
		justify-content: center;

	}
	.doctor{
		padding-left: 34rpx;
		padding-right: 34rpx;
		padding-bottom: 22rpx;
		margin-top: 50rpx;
		border-radius: 16rpx;
		.info{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.avatar{
				width: 100rpx;
				height: 100rpx;
				border: 2px solid #A19878;
			}
		}
		.li-main {
			justify-content: space-between;
			text-align: center;
			margin-top: 10rpx;
			margin-bottom: 30rpx;
		}
		.li-main .title{
			font-size: 12px;
			color: #979797;
      text-align: left;
		}
		.li-main .content{
			font-size: 12px;
			color: #000000;
      font-weight: bolder;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      width: 130px;
		}
	.release-date{
		justify-content: space-between;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		margin-left: -17px;
		margin-right: -17px;
		padding-left: 17px;
		padding-right: 17px;
		padding-top: 10px;
	}
	}
	.detail{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		.title, .more{
			display: flex;
			align-items: center;
			gap: 20rpx;
			.img{
				width: 40rpx;
				height: 40rpx;
			}
		}
		.title{
			font-family: PingFang HK;
			font-size: 30rpx;
			font-weight: 600;
			color: #000;
		}
		.more{
			font-family: PingFang HK;
			font-size: 26rpx;
			color: #B8BBC3;
		}
	}
	.doctor-desc{
		border-top: 1px solid #0000000D;
		margin-top: 20rpx;
		padding: 40rpx;
	}
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
        font-size: 0.8rem;
		margin-bottom: 0.6rem;
        font-weight: bolder;
        line-height: 0.9rem;
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
		.btn{
			flex: 0 0 288rpx;
			background: #A19878;
			margin-left: auto;
		}
	}
	.btn-icon {
		width: 150rpx;
		height: 80rpx;
		justify-content: space-between;
		align-items: center;
		.img{
			width: 36rpx;
			height: 38rpx;
		}
	}
	.content {
		padding: 20rpx 0;
	}
</style>
