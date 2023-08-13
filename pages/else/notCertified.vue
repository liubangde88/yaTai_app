<template>
	<view class="attestation-container">
		<u-navbar bgColor="rgba(255,255,255)" @leftClick="back" />
		<view class="title">{{$t('message.attestation')}}</view>
		<view class="sub-title">*{{$t('message.notCertifiedSubTitle')}}</view>
		<view class="box bgWhite">
			<view class="card-title">{{$t('message.attestationBasicTitle')}}</view>
			<view class="form">
				<view class="basic">
					<image src="@/static/img/certified-icon1.png" class="img" />
					<view>
						<view class="tips">{{$t('message.notCertifiedState3')}}</view>
						<view class="info">{{$t('message.notCertifiedName')}}：张**</view>
						<view class="info">{{$t('message.notCertifiedNumber')}}：610 **** 0012</view>
					</view>
					<view class="state">{{$t('message.notCertifiedState1')}}</view>
				</view>
				<view class="basic">
					<image src="@/static/img/certified-icon2.png" class="img car-img" />
					<view>
						<view class="tips">{{$t('message.notCertifiedStateNotImage')}}</view>
					</view>
					<view class="state not-certified">{{$t('message.notCertifiedState2')}}</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="attestation">{{$t('message.nextCertified')}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(option) {
			
		},
		methods: {
			attestation() {
				uni.navigateTo({
					url: '/pages/else/attestation'
				})
			}
		}
	}
</script>

<style scoped>
.attestation-container{
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-bottom: 280rpx;
	.title{
		font-family: Open Sans;
		font-size: 40rpx;
		font-weight: 600;
		margin-top: 120rpx;
	}
	.sub-title{
		font-family: PingFang HK;
		font-size: 24rpx;
		font-weight: 500;
		color: #FF9F3D;
		margin-bottom: 34rpx;
		margin-top: 10rpx;
	}
	.card-title{
		font-family: Open Sans;
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 60rpx;
	}
	.box{
		padding: 16rpx;
		border-radius: 16rpx;
		.form{
			border-top: 1px solid #F6F7FD;
			padding-top: 42rpx;
			margin-top: 20rpx;
		}
		.basic{
			display: flex;
			gap: 40rpx;
			margin-bottom: 40rpx;
			.img{
				width: 32rpx;
				height: 32rpx;
				&.car-img{
					width: 42rpx;
					height: 30rpx;
				}
			}
			.tips{
				font-family: PingFang HK;
				font-size: 30rpx;
				font-weight: 500;
				color: #A1A0A0;
				line-height: 1em;
			}
			.info{
				font-family: PingFang HK;
				font-size: 24rpx;
				color: #DADADA;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}
			.state{
				font-family: PingFang HK;
				font-size: 24rpx;
				color: #33E264;
				margin-left: auto;
				&.not-certified{
					color: #C4C4C4;
				}
			}
		}
	}
	.btn {
		background: #86784B;
		border-radius: 16rpx;
	}
}
</style>