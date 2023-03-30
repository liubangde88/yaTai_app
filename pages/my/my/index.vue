<template>
	<view class="box">
		<image src="@/static/img/my-ban.png" mode="" class="my-img rel"></image>
		<u-navbar leftIcon="" :title="$t('tabbar.me')" bgColor="rgba(255,255,255,.0)" :titleStyle="{color: '#fff'}"
			:placeholder="true"></u-navbar>
		<view class="user-info abs flexColumn">
			<image :src="vuex_user.headImg || avatar" mode="" class="avatar"></image>
			<text class="fs30 colf" v-if="vuex_user.id">{{vuex_user.nickName || vuex_user.mobile}}</text>
			<text class="fs30 colf" @click="toPath('/pages/else/login',1)" v-else>{{$t('message.toLogin')}}</text>
		</view>
		<view class="options abs">
			<view class="option-ul bgWhite">
				<view class="options-li flex" v-for="(item,index) in options" :key="index" @click="toPath(item.path,item.type)">
					<u-icon :name="item.icon" color="#111" size="18"></u-icon>
					<text class="title flex-1 fs30 col1">{{item.name}}</text>
					<u-icon name="arrow-right" color="#999" size="18" v-if="item.type != '3'"></u-icon>
					<text class="fs28 col9" v-else>V1.1.6</text>
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
				let arr = [{
						name: this.$t('message.order'),
						icon: 'order',
						path: '/pages/my/order/index',
						type: '2'
					},
					{
						name: this.$t('message.wallet'),
						icon: 'rmb-circle',
						path: '/pages/my/wallet/index',
						type: '2'
					},
					{
						name: this.$t('message.companyIntro'),
						icon: 'file-text',
						path: '/pages/else/companyIntro',
						type: '4'
					},
					{
						name: this.$t('message.attestation'),
						icon: 'checkmark-circle',
						path: '/pages/else/attestation',
						type: '2'
					},
					{
						name: this.$t('message.notice'),
						icon: 'more-circle',
						path: '/pages/notice/noticeList/index',
						type: '1'
					},
					{
						name: this.$t('message.set'),
						icon: 'setting',
						path: '/pages/else/setting',
						type: '1'
					},
					{
						name: this.$t('message.version'),
						icon: 'level',
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
		width: 100vw;
		height: 300rpx;
		/* #ifdef APP-PLUS */
		top: 180rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 130rpx;
		/* #endif */
		left: 0;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		width: 180rpx;
		height: 180rpx;
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
	}

	.options-li+.options-li {
		border-top: 4rpx solid #edf7f9;
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