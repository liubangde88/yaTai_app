<template>
	<view class="box">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(option) {
			if(option) this.url = decodeURIComponent(option.url)
		},
		onShow() {

		},
		methods: {

		}
	}
</script>
<style scoped>
</style>
