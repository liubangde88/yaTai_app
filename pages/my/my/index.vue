<template>
	<view class="my-container">
		<view class="user-info">
			<image :src="vuex_user.headImg || avatar" mode="" class="avatar"></image>
			<text class="colf" v-if="vuex_user.id">{{vuex_user.nickName || vuex_user.mobile}}</text>
			<text class="colf" @click="toPath('/pages/else/login',1)" v-else>{{$t('message.toLogin')}}</text>
		</view>
		<view class="channel">
			<view class="item" @click="member">
				<image src="@/static/img/my-channel-img1.png" class="img member" />
				<view class="stxt">{{$t('message.myPageAgent')}}</view>
			</view>
			<view class="item" @click="wallet">
				<image src="@/static/img/my-channel-img2.png" class="img member" />
				<view class="stxt">{{$t('message.myPageWallet')}}</view>
			</view>
			<view class="item" @click="shareLink">
				<image src="@/static/img/my-channel-img3.png" class="img member" />
				<view class="stxt">{{$t('message.shareFriend')}}</view>
			</view>
			<view class="item" @click="withdrawal">
				<image src="@/static/img/my-channel-img4.png" class="img member" />
				<view class="stxt">{{$t('message.myPageWithdrawal')}}</view>
			</view>
		</view>
		<view class="options">
			<view class="option-ul bgWhite">
				<view class="options-li flex" v-for="(item,index) in options" :key="index" @click="toPath(item.path,item.type)">
					<image :src="item.icon" class="img" />
					<text class="title flex-1 fs30 col1">{{item.name}}</text>
					<u-icon name="arrow-right" color="#999" size="18" v-if="item.type != '3'"></u-icon>
					<text class="fs28 col9" v-else>V1.1.9</text>
				</view>
			</view>
			<view class="log-out flex" @click="logOut" v-if="vuex_user.id">
				{{$t('message.logOut')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		logout
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				avatar: require('@/static/img/avator_img.png'),
			}
		},
		computed: {
			options() {
				let arr = [
					{
						name: this.$t('message.attestation'),
						icon: require('@/static/img/my-icon1.png'),
						path: '/pages/else/attestation',
						type: '2'
					},
					{
						name: this.$t('message.blank'),
						icon: require('@/static/img/my-icon2.png'),
						path: '/pages/my/myBank/index',
						type: '2'
					},
					{
						name: this.$t('message.withdrawalPassword'),
						icon: require('@/static/img/my-icon3.png'),
						path: '/pages/my/transactionPassword/index',
						type: '2'
					},
					{
						name: this.$t('message.notice'),
						path: '/pages/notice/noticeList/index',
						icon: require('@/static/img/my-icon5.png'),
						type: '1'
					},
					{
						name: this.$t('message.companyIntro'),
						icon: require('@/static/img/my-icon4.png'),
						path: '/pages/else/companyIntro',
						type: '2'
					},
					{
						name: this.$t('message.set'),
						icon: require('@/static/img/my-icon6.png'),
						path: '/pages/else/setting',
						type: '1'
					},
					{
						name: this.$t('message.version'),
						icon: require('@/static/img/my-icon7.png'),
						path: '',
						type: '3'
					}
				]
				return arr
			}
		},
		onLoad(option) {

		},
		onShow() {

		},
		methods: {
            shareLink () {
                uni.navigateTo({
                    url: '/pages/sharingInvitation/index'
                })
            },
			// 跳转
			toPath(url, type) {
				if (type == '3') return
				if (!this.vuex_user.id && type == '2') {
					this.toLogin()
					return
				}
				if (type == 4) url = url + '?url=' + encodeURIComponent('http://13.214.13.197/description.html')
				uni.navigateTo({
					url
				})
			},
			member() {
				uni.navigateTo({
					url: '/pages/my/member/index/index'
				})
			},
			wallet() {
				uni.navigateTo({
					url: '/pages/my/wallet/index'
				})
			},
			withdrawal() {
				uni.navigateTo({
					url: '/pages/else/withdrawal'
				})
			},
			// 退出
			logOut() {
				let {
					vuex_user: {
						id
					}
				} = this
				logout({
					agentId: id
				}).then(res => {
					this.$u.vuex('vuex_user', {})
					this.$u.toast(this.$t('message.successText'))
				})
			}
		}
	}
</script>

<style scoped lang="scss">
    .stxt {
        padding: 1rem;
        font-weight: bolder;
        font-size: 0.8rem;
    }
	.my-container{
		background: url('@/static/img/my-bg.png') no-repeat;
		background-size: 100%;
		height: 100vh;
		.channel{
			display: flex;
			justify-content: space-between;
			margin-left: 32rpx;
			margin-right: 32rpx;
			box-shadow: 0px 4px 4px 0px #C9D6F126;
			background-color: rgba(255, 255, 255, 0.9);
			padding: 34rpx 60rpx;
			border-radius: 16rpx;
			margin-top: 60rpx;
			margin-bottom: 30rpx;
			.item{
				text-align: center;
			}
			.img{
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
	.my-img {
		width: 100vw;
		/* #ifdef APP-PLUS */
		height: 550rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 500rpx;
		/* #endif */
	}

	.user-info {
		display: flex;
		gap: 40rpx;
		align-items: center;
		margin-left: 44rpx;
		font-family: Open Sans;
		font-size: 40rpx;
		font-weight: 600;
		line-height: 27px;
		letter-spacing: 0em;
		text-align: left;
		padding-top: 140rpx;
	}

	.avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 90rpx;
		margin-bottom: 20rpx;
		border: 1px solid #fff;
		box-sizing: border-box;
	}

	.options {
		width: 100vw;
		/* #ifdef APP-PLUS */
		top: 600rpx;
		padding: 0 30rpx 50rpx 30rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 550rpx;
		padding: 0 30rpx 130rpx 30rpx;
		/* #endif */
		box-sizing: border-box;
		left: 0;
	}

	.option-ul {
		width: 100%;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.options-li {
		height: 120rpx;
		.img{
			width: 32rpx;
			height: 32rpx;
			margin-right: 36rpx;
		}
	}

	.options-li+.options-li {
		border-top: 4rpx solid #F6F7FD;
	}

	.title {
		padding: 0 10rpx;
		box-sizing: border-box;
	}

	.log-out {
		width: 100%;
		margin-top: 100rpx;
		background: #fff;
		color: #666;
		border-radius: 10rpx;
		height: 100rpx;
		justify-content: center;
	}
</style>t