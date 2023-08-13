<template>
	<view class="box">
		<view class="header-box fixed" style="height:'260rpx';">
			<view class="nav-box rel">
				<image src="@/static/img/other-ban.jpg" class="header-ban img abs"></image>
				<view class="nav abs">
					<u-navbar leftIconColor="#fff" :title="$t('message.agentCenter')" bgColor="rgba(255,255,255,.0)"
						:titleStyle="titleStyle" @leftClick="back"></u-navbar>
				</view>
			</view>

      <!--代理级别 -->
      <view class="sbdx">
        <view class="money-box flexColumn flex-cen">
            <text class="fs32 col1 bold">{{$t('message.levelText')}}: {{agentLevel || '-'}}</text>
            <text class="fs32 col1">{{$t('message.commission')}}: </text>
            <text class="money bold">￥{{commission}}<span class="fs30">（HK$）</span></text>
        </view>
      </view>


			<view class="tab-box">
				<view class="menu top-r bgWhite flex">
					<view class="menu-li flex flex-cen" v-for="(item,index) in menus" :key="index"
						:class="current == index ? 'col1 bold active' : 'col9'" @click="selecthandle(index,item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>

<!--		 		<view class="add-agent flexColumn">-->
<!--			<image src="@/static/img/emoty.png" mode="" class="empty"></image>-->
<!--			<text class="fs26 col6">对不起，您还不是代理商，没办法使用这项功能！</text>-->
<!--			<view class="btn" @click="add">-->
<!--				申请成为代理商-->
<!--			</view>-->
<!--		</view>-->

		<view class="project-main">
			<view class="project-box bottom-r bgWhite">
				<!-- 项目列表 -->
				<Project :list="list" id="proxy" :isShow="false" :isAgent="true" :isOrder="false" :isMore="true"
					:nextPage="nextPage"></Project>
				<!-- 佣金列表 -->
				<!-- <view class="record-ul" v-else>
					<view class="record-li" v-for="(item,idx) in list" :key="idx">
						<view class="mag-b fs30 col1 bold line-two word-b">
							{{item.pname}}
						</view>
						<view class="mag-b fs26 col6 line-one">
							{{item.pcontent}}
						</view>
						<view class="mag-b fs26 col6">
							{{$t('message.money')}}： <span class="col1">￥{{item.pprice}}</span>
						</view>
						<view class="mag-b fs26 col6">
							{{$t('message.percentage')}}： <span style="color: #4691cb;">￥{{item.percentage}}</span>
						</view>
						<view class="mag-b fs26 col6">
							{{$t('message.setCommission')}}： <span style="color: red;">￥{{item.commission}}</span>
						</view>
						<view class="mag-b fs26 col9">
							{{$t('message.settlementDate')}}：{{item.upTime}}
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getListMyProject,
		getMyTotal,
		getDetail
	} from "@/common/js/http.api.js"
	import Project from '@/components/projectList/projectList.vue'
	export default {
		components: {
			Project
		},
		data() {
			return {
				commission: 0,
				titleStyle: {
					color: '#fff'
				},
				agentLevel: '',
				current: 0,
				list: [],
				status: '1',
				page: 1,
				pagesize: 10,
				nextPage: false, //是否加载
			}
		},
		computed: {
			menus() {
				let arr = [{
					name: this.$t('message.agentProgect'),
					id: '1'
				}, {
					name: this.$t('message.comRecord'),
					id: '2'
				}]
				return arr
			}
		},
		onLoad(option) {
			this.getMyTotal()
			this.getList()
		},
		onShow() {
			this.getDetail()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.page = 1
			this.nextPage = true
			this.current = 0
			this.status = '1'
			this.list = []
			this.getMyTotal()
			this.getList()
			this.getDetail()
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
			// 获取我的信息
			getDetail() {
				let params = {
					agentId: this.vuex_user.id
				}
				getDetail(params).then(res => {
					this.agentLevel = res.agent.agentLevel
				})
			},
			// 获取佣金总金额
			getMyTotal() {
				getMyTotal({agentId: this.vuex_user.id}).then(res => {
					this.commission = res.total || 0
				})
			},
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
					agentId,
					status
				}
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
							if(item.status == '2')item.commission = (item.price*item.agentPercent/100).toFixed(2)
						})
					}
					this.list = this.list.concat(res.ls)
					this.nextPage = res.ls.length == pagesize
				})
			},
			// 选中menu
			selecthandle(index, e) {
				this.current = index
				this.status = e.id
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
  .sbdx {
    position: relative;
    height: 270rpx;
    background: #fff;
  }
  .fs32.col1.bold {
     line-height: 100rpx;
  }
  uni-text.fs32.col1 {
    font-size: 28rpx;
    font-weight: bolder;
  }
  uni-text.money.bold {
    font-size: 36rpx;
    font-weight: bolder;
    line-height: 100rpx;
    color: #A19878;
  }
  /deep/ uni-view.money-box.flexColumn.flex-cen {
    background: url("@/static/img/ccc.jpg") no-repeat 100% 100%;
    filter:(4rpx);
    background-size: 100% 100%;
    width: 94%;
    margin-left: 3%;
    border-radius: 20rpx;
    height: 320rpx;
    position: absolute;
    top: -106rpx;
    z-index: 100;
    border: 2px solid #cbbd8c;
  }

  #proxy {
    /deep/ .bgWhite {
      padding: 0;
    }

    /deep/ .li-main.flex {
        display: block;
      margin: 0;
      background: #bbb;
      border-radius: 20rpx;
      padding: 20rpx 0 20rpx 0;
      background: url("@/static/img/other-ban.jpg") no-repeat;
        .mag-b{
            display: block;
            width: 100%;
            .tihceng{
                text-align: left !important;
            }
        }

    }

    /deep/ .title {
      display: inline-block;
      width: 20%;
      text-align: left;
      color: #fff;
    }
    /deep/ .content {
      display: inline-block;
      width: 66%;
      text-align: left;
      color: #fff;
      font-size: 24rpx !important;
      font-weight: bolder;
    }
    /deep/ .xmmc {
      display: inline-table
    }
  }
	.header-box {
		/* height: 600rpx; */
		z-index: 120;
	}

	.nav-box {
		width: 100%;
		height: 250rpx;
	}

	.money-box {
		height: 250rpx;
		align-items: center;
		background-color: #edf7f9;
	}

	.money {
		font-size: 60rpx;
		color: rgb(44, 138, 160);
		margin-top: 5rpx;
	}

	.tab-box {
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #edf7f9;
	}

	.menu {
		height: 100rpx;
	}

	.menu-li {
		width: 50%;
		height: 100%;
		border-bottom: 2rpx solid #edf7f9;
	}

	.active {
		border-bottom: 2rpx solid #59c8dc;
	}

	.add-agent {
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.empty {
		width: 500rpx;
		height: 560rpx;
		margin-bottom: 50rpx;
	}

	.btn {
		width: 60%;
		background: #56c4d9;
		margin-top: 100rpx;
	}

	.project-main {
		margin-top: 600rpx;
	}

	.project-box {
		/* min-height: calc( 100vh - 510rpx ); */
	}

	.record-ul {
		padding: 20rpx;
	}

	.record-li {
		min-height: 300rpx;
		padding: 20rpx;
	}

	.record-li+.record-li {
		border-top: 2rpx solid #e3f1f4;
	}

	.mag-b {
		margin-bottom: 10rpx;
	}
</style>
