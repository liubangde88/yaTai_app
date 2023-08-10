<template>
	<view class="attestation-container">
		<u-navbar bgColor="rgba(255,255,255)" @leftClick="back" />
		<view class="title">{{$t('message.attestation')}}</view>
		<view class="sub-title">*{{$t('message.attestationSubTitle')}}</view>
		<view class="box bgWhite">
			<view class="card-title">{{$t('message.attestationBasicTitle')}}</view>
			<view clss="form">
				<u-form labelPosition="left" :model="data" :rules="rules" ref="form" :errorType="errorType"
					labelWidth="100">
					<u-form-item :label="$t('message.withManTitle')" prop="withMan" borderBottom class="form-item">
						<u-input :clearable="true" v-model="data.withMan" border="none" :placeholder="$t('message.withMan')"
							 :readonly="isAttestation"></u-input>
					</u-form-item>
					<u-form-item :label="$t('message.documentNumTitle')" prop="documentNum" borderBottom class="form-item">
						<u-input :clearable="true" v-model="data.documentNum" border="none"
							:placeholder="$t('message.documentNum')"
							:readonly="isAttestation"></u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="card-title">{{$t('message.attestationCarTitle')}}</view>
			<view class="car-desc">
				<view>{{$t('message.attestationCarDesc1')}}</view>
				<view>{{$t('message.attestationCarDesc2')}}</view>
			</view>
			<view class="car-title">{{$t('message.attestationCarTitle1')}}</view>
			<view class="car-img" @click="chooseImage">
				<image src="@/static/img/car-img1.png" class="img">
			</view>
			<view class="car-title">{{$t('message.attestationCarTitle2')}}</view>
			<view class="car-img" @click="chooseImage">
				<image src="@/static/img/car-img2.png" class="img">
			</view>
		</view>
		<view class="footer">
			<view class="tips">{{$t('message.attestationTips')}}</view>
			<view class="btn">{{$t('message.attestationBtn')}}</view>
		</view>
	</view>
</template>

<script>
	import {
		updateAgent
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				errorType: 'message',
				data: {
					withMan: '',
					documentNum: ''
				},
				rules: {
					withMan: {
						type: 'string',
						required: true,
						message: this.$t('message.withMan'),
						trigger: ['blur', 'change']
					},
					documentNum: {
						type: 'string',
						required: true,
						message: this.$t('message.documentNum'),
						trigger: ['blur', 'change']
					},
				},
				isAttestation: false
			}
		},
		onLoad(option) {
			
		},
		methods: {
			// 提交
			submit() {
				this.$refs.form.validate().then(res => {
					this.edit()
				}).catch(errors => {

				})
			},
			chooseImage() {
				uni.chooseImage({
					complete() {
						console.log(true);
					}
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
		color: #A1A0A0;
		margin-bottom: 34rpx;
		margin-top: 10rpx;
	}
	.form{
		margin-bottom: 40rpx;
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
		.car-desc{
			font-family: PingFang HK;
			font-size: 24rpx;
			color: #C4C4C4;
		}
		.car-title{
			font-family: PingFang HK;
			font-size: 28rpx;
			font-weight: 500;
			color: #A1A0A0;
			margin-top: 30rpx;
			margin-bottom: 10rpx;
		}
		.car-img{
			height: 320rpx;
			border-radius: 16rpx;
			border: 1px solid #F6F7FD;
			display: flex;
			justify-content: center;
			align-items: center;
			.img{
				width: 168rpx;
				height: 136rpx;
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx 52rpx 70rpx;
		.tips{
			font-family: PingFang HK;
			font-size: 24rpx;
			margin-bottom: 40rpx;
			text-align: center;
			color: #A1A0A0;
		}
	}
	.btn {
		background: #86784B;
		border-radius: 16rpx;
	}
}
</style>