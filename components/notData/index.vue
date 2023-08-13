<template>
	<view class="not-data">
		<image src="@/static/img/not-data.png" class="img" />
	</view>
</template>

<script>
	export default {
		name: "notData",
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.not-data{
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		.img{
			width: 380rpx;
			height: 420rpx;
		}
	}
</style>
