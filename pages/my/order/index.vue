<template>
	<view class="box">
		<view class="header-box fixed">
			<view class="nav-box rel">
				<image src="@/static/img/other-ban.png" class="header-ban img abs"></image>
				<view class="nav abs">
					<u-navbar leftIconColor="#fff" :title="$t('message.order')" bgColor="rgba(255,255,255,.0)"
						:titleStyle="titleStyle" @leftClick="back"></u-navbar>
				</view>
				<view class="tab-box abs">
					<view class="menu top-r bgWhite">
						<u-tabs :list="menus" lineColor="#59c8dc" :inactiveStyle="{color: '#999'}" @click="clickHandle"
							:current="current"></u-tabs>
					</view>
				</view>
			</view>
		</view>
		<view class="project-main">
			<view class="project-box bottom-r bgWhite">
				<!-- 项目列表 -->
				<Project :list="list" :isShow="false" :isOrder="true" :isMore="true" :nextPage="nextPage"></Project>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getListMyProject
	} from "@/common/js/http.api.js"
	import Project from '@/components/projectList/projectList.vue'
	export default {
		components: {
			Project
		},
		data() {
			return {
				titleStyle: {
					color: '#fff'
				},
				current: 0,
				list: [],
				status: '-2',
				page: 1,
				pagesize: 10,
				nextPage: false, //是否加载
			}
		},
		computed: {
			menus() {
				let arr = [{
					name: this.$t('message.all'),
					id: '-2'
				}, {
					name: this.$t('message.approved'),
					id: '1'
				}, {
					name: this.$t('message.notApproved'),
					id: '0'
				}, {
					name: this.$t('message.failed'),
					id: '-1'
				}, {
					name: this.$t('message.settled'),
					id: '2'
				}]
				return arr
			}
		},
		onLoad(option) {
			this.getList()
		},
		onShow() {

		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.page = 1
			this.nextPage = true
			this.current = 0
			this.status = '-2'
			this.list = []
			this.getList()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		// 页面触底
		onReachBottom() {
			let that = this
			let {
				pagesize,
				page,
				nextPage
			} = that
			if (nextPage) {
				that.page += 1
				that.getList()
			}
		},
		methods: {
			getList() {
				let {
					page,
					pagesize,
					status,
					vuex_user: {
						id: agentId
					}
				} = this
				let params = {
					page,
					pagesize,
					agentId
				}
				if (status != '-2') params.status = status
				console.log(params);
				getListMyProject(params).then(res => {
					if (this.page == 1) {
						uni.pageScrollTo({
							scrollTop: 0,
						})
					}
					if(res.ls.length > 0) {
						res.ls.map(item => {
							item.pname = item.name
							item.pprice = item.price
							item.pcontent = item.content
							item.upTime = item.createTime
						})
					}
					this.list = this.list.concat(res.ls)
					this.nextPage = res.ls.length == pagesize
				})
			},
			// 选中menu
			clickHandle(e) {
				this.current = e.index
				this.status = e.id
				this.page = 1
				this.nextPage = true
				this.list = []
				this.getList()
			},
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.header-box {
		/* #ifdef APP-PLUS */
		height: 304rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 254rpx;
		/* #endif */
	}

	.nav-box {
		width: 100%;
		/* #ifdef APP-PLUS */
		height: 280rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 230rpx;
		/* #endif */
	}
	
	/* #ifdef H5 */
	.header-ban {
		height: 280rpx;
		top: -50rpx;
	}
	/* #endif */

	.tab-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		z-index: 100;
		/* #ifdef APP-PLUS */
		top: 200rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 150rpx;
		/* #endif */
		left: 0;
	}

	.menu {
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		border-bottom: 4rpx solid #e3f1f4;
	}

	.project-main {
		/* #ifdef APP-PLUS */
		margin-top: 304rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 254rpx;
		/* #endif */
	}
</style>
