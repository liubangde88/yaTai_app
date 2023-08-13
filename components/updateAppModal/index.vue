<template>
	<view>
		<uni-popup  ref="updateApp" type="dialog" :is-mask-click="false" style="z-index: 99999999;position: fixed; inset: 0;">
			<view class="update-app">
				<image src="@/static/img/updateApp-bg.png" class="img" />
				<view class="title">{{$t('message.updateAppTitle')}}</view>
				<view class="sub-title">{{$t('message.updateAppSubTitle')}}：</view>
				<view class="content">
					<view>1.优化界面</view>
					<view>2.增加功能</view>
					<view>3.修改部分BUG</view>
				</view>
				<view class="checkbox">
					<uni-data-checkbox 
						selectedColor="#86784B" 
						multiple 
						v-model="hasHide" 
						:localdata="localdata" 
						v-if="isShow !== 1"
						 />
				</view>
				<view class="btn">
					<text class="button cancel" @click="cancel" v-if="isShow !== 1">{{$t('message.updateAppCancelText')}}</text>
					<text class="button update" @click="update">{{$t('message.updateAppUpdateText')}}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { getStorage, setStorage, remove } from '@/utils/index.js';
	export default {
		name:"updateAppModal",
		data() {
			return {
				localKey: 'hasShowUpdateModal',
				localdata: [
					{
						text: '本次更新不再提醒',
						value: 1,
					}
				],
				hasHide: [0],
				isShow: false
			};
		},
		mounted() {
			const hasShow = getStorage(this.localKey) || 0;
			this.isShow = hasShow;
			if(!hasShow) {
				this.$refs['updateApp'].open('center');	
			}
		},
		methods: {
			storage() {
				if(this.hasHide[0] === 1) {
					setStorage(this.localKey, 1);
				}
			},
			cancel() {
				this.storage();
				this.$refs['updateApp'].close();
			},
			update() {
				// TODO 更新完后需要清除缓存 调用 remove(this.localKey);
				console.log('更新ing...');
			}
		}
	}
</script>

<style scoped>
.update-app{
	width: 646rpx;
	min-height: 580rpx;
	border-radius: 32rpx;
	background-color: #fff;
	position: relative;
	padding: 40rpx;
	box-sizing: border-box;
	.img{
		width: 292rpx;
		height: 350rpx;
		position: absolute;
		right: 0;
		top: -30rpx;
	}
	.title{
		font-family: Open Sans;
		font-size: 40rpx;
		font-weight: 700;
	}
	.sub-title{
		font-family: PingFang HK;
		font-size: 24rpx;
		font-weight: 500;
		color: #A1A0A0;
		margin-top: 44rpx;
		margin-bottom: 30rpx;
	}
	.content{
			display: block;
			font-family: PingFang HK;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 2em;
	}
	.checkbox{
		margin-top: 48rpx;
		margin-bottom: 32rpx;
	}
	.btn{
		display: flex;
		gap: 32rpx;
		justify-content: center;
		.button{
			width: 280rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-family: PingFang HK;
			font-size: 30rpx;
			font-weight: 600;
			border-radius: 16rpx;
			&.cancel{
				background-color: #F6F7FD;
				color: #B8BBC3;
			}
			&.update{
				background-color: #86784B;
				color: #fff;
			}
		}
	}
}
</style>