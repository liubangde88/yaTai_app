<template>
	<view class="list-ul">
		<image src="@/static/img/not-data.png"  v-if="list.length == 0" class="not-data-img" />
		<template v-else>
			<view class="list-li bgWhite" v-for="(item,index) in list" :key="index"
				@click="toPath('/pages/project/projectDetail/index',item.id)">
				<view class="li-info">
					<!-- 订单与代理页面不展示医生头像与名字 -->
					<view class="flex item-doctor" v-if="!isOrder && !isAgent">
						<view class="flexColumn">
							<image :src="item.headImg || baseImg" mode="aspectFill" class="avatar"></image>
						</view>
						<view style="max-width: 160px;">
							<text class="col1 fs28 word-b">{{item.dname}}</text>
							<view class="fs26 col6 line-one">
								{{item.pcontent}}
							</view>
						</view>
						<view class="li-right flex fs24 appointment" v-if="isShow" @click.stop="click(item.id)">
							{{$t('message.appointment')}}
						</view>
					</view>
					<view class="li-main flex">
						<view class="mag-b">
							<view class="title xmmc-title">{{$t('message.pName')}}</view>
							<view class="content xmmc">
								{{item.pname}}
							</view>
						</view>
						<!-- 项目金额 -->
						<view class=" mag-b">
							<view class="title">{{$t('message.money')}}</view>
							<view class="content">
								<span>￥{{item.pprice || 0}}</span><span>（HK$）</span>
							</view>
						</view>
                        <!--项目提成-->
						<view class="mag-b fs26 col6">
							<view class="title tihceng">{{$t('message.percentage')}}</view>
							<view class="content">
								<span>{{item.agentPercent || 0}}%</span>
							</view>
						</view>
						<!-- 从代理页面进入并且订单状态为已结算时显示结算日期与结算佣金 -->
						<view class="mag-b fs26 col6" v-if="isAgent && item.status == '2'">
							<view class="title">{{$t('message.setCommission')}}</view>
							<view class="content">
								<span>￥{{item.commission || 0}}</span>
							</view>
						</view>
						<view class="mag-b fs26 col6" v-if="isAgent && item.status == '2'">
							<view class="title">{{$t('message.settlementDate')}}</view>
							<view class="content">
								{{item.upTime}}
							</view>
						</view>
					</view>
				</view>
						<view class="li-right flex fs24"
							:class="item.status == '-1' ? 'failed' : item.status == '1' ? 'pass' : item.status == '2' ? 'settled' : 'no'"
							v-if="isOrder">
							<text v-if="item.status == '-1'">{{$t('message.failed')}}</text>
							<text v-else-if="item.status == '0'">{{$t('message.notApproved')}}</text>
							<text v-else-if="item.status == '1'">{{$t('message.approved')}}</text>
							<text v-else>{{$t('message.settled')}}</text>
						</view>
				<view class="li-time fs24 col9 flex release-date" v-if="isShow || isOrder">
					<view>{{$t('message.releaseDate')}}</view>
					<view>{{item.upTime}}</view>
				</view>
			</view>
			<!-- 加载更多 -->
			<u-loadmore :status="status" :loadmoreText="$t('message.loadmoreText')"
				:loadingText="$t('message.loadingText')" :nomoreText="$t('message.nomoreText')" v-if="isMore" />
		</template>
	</view>
</template>

<script>
	import NotData from '@/components/notData/index.vue'; 
	export default {
		name: "projectList",
		components: {
			NotData
		},
		props: {
			// 项目列表
			list: {
				type: Array,
				default: () => []
			},
			// 是否显示预约按钮
			isShow: {
				type: Boolean,
				default: false
			},
			// 是否代理页面进入
			isAgent: {
				type: Boolean,
				default: false
			},
			// 滚动列表高度
			height: {
				type: String,
				default: ''
			},
			// 是否加载更多
			isMore: {
				type: Boolean,
				default: false
			},
			// 加载更多状态
			nextPage: {
				type: Boolean,
				default: false
			},
			// 是否订单列表
			isOrder: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				baseImg: require('@/static/img/avator_img.png'),
			};
		},
		computed: {
			status() {
				return this.nextPage ? 'loadmore' : 'nomore'
			}
		},
		methods: {
			toPath(url,id) {
				if(this.isAgent || this.isOrder) {
					return
				}
				uni.navigateTo({
					url: url + '?id=' + id
				})
			},
			// 点击预约
			click(e) {
				this.$emit('clickHnadle', e)
			}
		}
	}
</script>

<style scoped>
.tihceng {
    text-align: center !important;
}
 .li-main > .mag-b {
     width: 33.2%;
 }
.line-one {
    margin-top: 0.5rem;
    line-height: 2rem;
}
  .xmmc-title {
    text-align: left !important;
  }
  .xmmc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    width: 80%;
    text-align: left;
    font-size: 14px !important;
    font-weight: bolder;
  }
	.not-data-img{
			width: 380rpx;
			height: 420rpx;
			margin-left: 140rpx;
			margin-top: 200rpx;
	}
	.list-ul {
		margin: 0 30rpx;
		box-sizing: border-box;
	}

	.list-li {
		min-height: 300rpx;
		padding-bottom: 20rpx;
		margin-bottom: 10px;
		margin-left: -17px;
		margin-right: -17px;
		padding-left: 17px;
		padding-right: 17px;
		border-radius: 8px;
	}
	
	.list-li .item-doctor{
		justify-content: space-between;
	}

	.li-info {
		min-height: 200rpx;
		padding-top: 30rpx;
		align-items: flex-start;
	}

	.li-left {
		/* height: 200rpx; */
		width: 130rpx;
		padding-top: 20rpx;
		margin-right: 20rpx;
		align-items: center;
	}

	.avatar {
		width: 86rpx;
		height: 86rpx;
		border-radius: 60rpx;
		margin-bottom: 10rpx;
		border: 2Px solid #A68F46;
	}

	.li-main {
		justify-content: space-between;
		text-align: center;
		margin-top: 0.8rem;

	}

	.li-main .title{
        font-size: 6px;
        color: #979797;
        text-align: left;
        padding-left: 0.2rem;
	}
	.li-main .content{
		font-size: 16px;
		color: #000000;
        font-weight: bold;
	}

	.li-right {
		margin-top: 20rpx;
		width: 160rpx;
		min-height: 60rpx;
		border-radius: 30rpx;
		justify-content: center;
		color: #fff;
	}

	.appointment {
		background: linear-gradient(-45deg, #A19878, #A19878);
	}

	.pass {
		background: #27c416;
	}

	.no {
		background: #58c8dc;
	}

	.failed {
		background: red;
	}

	.settled {
		background: #bfcfd2;
	}

	.li-time {
		flex: 1;
		text-align: right;
		margin-top: 20rpx;
	}
	
	.mag-b {
        line-height: 1.8rem;
	}
	.release-date{
		justify-content: space-between;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		margin-left: -17px;
		margin-right: -17px;
		padding-left: 17px;
		padding-right: 17px;
		padding-top: 0.6rem;
        line-height: 1rem;
	}
</style>
