<template>
	<view>
		<image src="@/static/img/download.png" class="img" @click="download" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			download() {
				console.log('下载App')
			}
		}
	}
</script>

<style scoped>
.img{
	width: 100vw;
	height: 100vh;
}
</style>
