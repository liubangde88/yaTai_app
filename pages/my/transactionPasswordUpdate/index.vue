<template>
	<view class="transaction-password-update-container">
		<u-navbar bgColor="rgba(255,255,255, 0)" @leftClick="back" />
		<image src="@/static/img/setting-password-empty.png" class="img"></image>
		<view class="btn" @click="target">{{$t('message.transactionPasswordUpdateBtn')}}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		target() {
			uni.navigateTo({
				url: 'pages/my/transactionPassword/index'
			})
		}
	}
}
</script>

<style scoped>
.transaction-password-update-container{
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.img{
		width: 380rpx;
		height: 424rpx;
	}
	.btn{
		background-color: #86784B;
		border-radius: 16rpx;
		width: 336rpx;

	}
}
</style>