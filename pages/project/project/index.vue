<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/home-ban.png" class="header-img"></image>
			<view class="search-box abs">
				<view class="info top-r bgWhite">
					<view class="box-r">
						<u-tabs :list="menus" lineColor="#fff" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle"
							:itemStyle="itemStyle" @click="selecthandle"></u-tabs>
					</view>
				</view>
			</view>
		</view>
		<view class="box-r product-search">
			<u-search 
			:placeholder="$t('message.search')" 
			v-model="search" 
			:clearabled="true" 
			:showAction="false"
			height="80rpx" 
			searchIconColor="#86784B" 
			searchIconSize="26" 
			placeholderColor="#333"
			color="#333" 
			bg-color="#eaf5f8" 
			@change="searchHandle" />
		</view>
		<view class="project-main">
			<view class="project-box bottom-r">
				<Project :list="list" :isShow="true" :isMore="true" :nextPage="nextPage" @clickHnadle="clickHnadle"></Project>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getListProject,
		getProjectType,
		addProject
	} from "@/common/js/http.api.js"
	import Project from '@/components/projectList/projectList.vue'
	export default {
		components: {
			Project
		},
		data() {
			return {
				search: '',
				// 菜单选择中时的样式
				activeStyle: {
					background: '#86784B',
					borderRadius: '40rpx',
					color: '#FFFFFF',
					padding: '5rpx 20rpx'
				},
				// 菜单非选择中时的样式
				inactiveStyle: {
					background: '#E8E1D9',
					borderRadius: '40rpx',
					color: '#86784B',
					padding: '5rpx 20rpx'
				},
				// 菜单item的样式
				itemStyle: {
					paddingRight: '5rpx',
					height: '80rpx'
				},
				menus: [],
				list: [],
				page: 1,
				pagesize: 10,
				nextPage: false, //是否加载
				type: '',//项目类型
			}
		},
		onLoad(option) {
			this.getTypeList()
			this.getList()
		},
		onShow() {

		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		// onPullDownRefresh: function() {
		// 	this.page = 1
		// 	this.nextPage = true
		// 	this.type = '-1'
		// 	this.list = []
		// 	this.getList()
		// 	setTimeout(() => {
		// 		uni.stopPullDownRefresh()
		// 	}, 1000)
		// },
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
			// 预约
			clickHnadle(e) {
				if (!this.vuex_user.id) {
					this.toLogin()
					return
				}
				let params = {
					agentId: this.vuex_user.id,
					projectId: e
				}
				addProject(params).then(res => {
					uni.showToast({
						title: this.$t('message.appointmentSuccess'),
						icon: 'none',
						duration: 1500
					})
				})
			},
			// 获取项目列表
			getList() {
				let {page,pagesize,type,search} = this
				let params = {
					page,
					pagesize
				}
				if(type && type != '-1') params.type = type
				if(search) params.search = search
				getListProject(params).then(res => {
					if (this.page == 1) {
							uni.pageScrollTo({
								scrollTop: 0,
							})
						}
					this.list = this.list.concat(res.ls)
					this.nextPage = res.ls.length == pagesize
				})
			},
			// 获取项目类型
			getTypeList() {
				getProjectType().then(res => {
					let arr = res ? res : []
					let obj = {
						value: '-1',
						name: this.$t('message.all')
					}
					arr.unshift(obj)
					this.menus = arr
				})
			},
			// 搜索
			searchHandle() {
				this.page = 1
				this.nextPage = true
				this.list = []
				this.getList()
			},
			// 选则标签
			selecthandle(e) {
				this.type = e.value
				this.page = 1
				this.nextPage = true
				this.list = []
				this.getList()
			}
		}
	}
</script>
<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.header-box {
		/* #ifdef APP-PLUS */
		height: 488rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 438rpx;
		/* #endif */
	}

	.header-img {
		width: 100%;
		height: 384rpx;
	}

	.search-box {
		/* #ifdef APP-PLUS */
		top: 240rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 300rpx;
		/* #endif */
		width: 100vw;
		padding: 0 16rpx;
		box-sizing: border-box;
		box-shadow: 0px 4px 4px 0px rgba(246, 244, 241, 1);
	}

	.info {
		height: 120rpx;
		border-radius: 16rpx;
	}
	
	.project-main {
		/* #ifdef APP-PLUS */
		// margin-top: 484rpx;
		/* #endif */
		/* #ifdef H5 */
		// margin-top: 434rpx;
		/* #endif */
	}
	.project-box {
		min-height: 50vh;
	}
	.product-search{
		margin-top: 420rpx;
	}
</style>
