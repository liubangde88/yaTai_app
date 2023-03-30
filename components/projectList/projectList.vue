<template>
	<view class="list-ul">
		<view class="flex flex-cen" style="height: 500rpx;" v-if="list.length == 0">
			<u-empty mode="list" :text="$t('message.emptyText')"></u-empty>
		</view>
		<template v-else>
			<view class="list-li" v-for="(item,index) in list" :key="index"
				@click="toPath('/pages/project/projectDetail/index',item.id)">
				<view class="li-info flex">
					<!-- 订单与代理页面不展示医生头像与名字 -->
					<view class="li-left flexColumn" v-if="!isOrder && !isAgent">
						<image :src="item.headImg || baseImg" mode="aspectFill" class="avatar"></image>
						<text class="col1 fs28 word-b" style="width: 100%;text-align: center;">{{item.dname}}</text>
					</view>
					<view class="li-main">
						<view class="mag-b fs30 col1 bold line-two word-b" style="width: 300rpx;">
							{{item.pname}}
						</view>
						<view class="mag-b fs26 col6 line-one" style="width: 300rpx;">
							{{item.pcontent}}
						</view>
						<!-- 项目金额 -->
						<view class="mag-b fs26 col6 flex">
							{{$t('message.money')}}： <span style="color: red;">￥{{item.pprice || 0}}</span><span class="fs24">（HK$）</span>
						</view>
						<view class="mag-b fs26 col6">
							{{$t('message.percentage')}}： <span style="color: #4691cb;">{{item.agentPercent || 0}}%</span>
						</view>
						<!-- 从代理页面进入并且订单状态为已结算时显示结算日期与结算佣金 -->
						<view class="mag-b fs26 col6" v-if="isAgent && item.status == '2'">
							{{$t('message.setCommission')}}： <span style="color: red;">￥{{item.commission || 0}}</span>
						</view>
						<view class="mag-b fs26 col6" v-if="isAgent && item.status == '2'">
							{{$t('message.settlementDate')}}：￥{{item.upTime}}
						</view>
					</view>
					<view class="li-right flex fs24 appointment" v-if="isShow" @click.stop="click(item.id)">
						{{$t('message.appointment')}}
					</view>
					<view class="li-right flex fs24"
						:class="item.status == '-1' ? 'failed' : item.status == '1' ? 'pass' : item.status == '2' ? 'settled' : 'no'"
						v-if="isOrder">
						<text v-if="item.status == '-1'">{{$t('message.failed')}}</text>
						<text v-else-if="item.status == '0'">{{$t('message.notApproved')}}</text>
						<text v-else-if="item.status == '1'">{{$t('message.approved')}}</text>
						<text v-else>{{$t('message.settled')}}</text>
					</view>
				</view>
				<view class="li-time fs24 col9" v-if="isShow || isOrder">
					{{$t('message.releaseDate')}}：{{item.upTime}}
				</view>
			</view>
			<!-- 加载更多 -->
			<u-loadmore :status="status" :loadmoreText="$t('message.loadmoreText')"
				:loadingText="$t('message.loadingText')" :nomoreText="$t('message.nomoreText')" v-if="isMore" />
		</template>
	</view>
</template>

<script>
	export default {
		name: "projectList",
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
	.list-ul {
		margin: 0 30rpx;
		box-sizing: border-box;
	}

	.list-li {
		min-height: 300rpx;
		padding-bottom: 20rpx;
	}

	.list-li+.list-li {
		border-top: 2rpx solid #e3f1f4;
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
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-bottom: 10rpx;
	}

	.li-main {
		flex: 1;
		min-height: 250rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
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
		background: linear-gradient(-45deg, #54c2d6, #69d9ec);
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
		margin-bottom: 10rpx;
	}
</style>
