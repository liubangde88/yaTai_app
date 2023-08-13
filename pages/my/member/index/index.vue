<template class="member">
    <view class="box">

        <!--title 位置-->
        <view class="nav abs">
            <u-navbar leftIconColor="#fff"
                      height="60"
                      :title="$t('message.vipcenter')"
                      bgColor="#fff"
                      @leftClick="back">
            </u-navbar>
        </view>

        <!-- 内容部分 -->
        <view class="map-content">

            <!-- 滑播图  -->
            <div class="banner" id="card_list">
                <view class="u-demo-block">
                    <u-swiper
                        :list="list"
                        previousMargin="35"
                        nextMargin="35"
                        circular
                        radius="10"
                        keyName="img"
                        @change="change"
                        :autoplay="false"
                        bgColor="#e6e2e2"
                        height="180"
                    >
                        <view slot="indicator" class="indicator">
                            <!-- 左边-->
                            <view class="vip_left">
                                <!-- 会员名称-->
                                <view class="vip_name" :class="
                                 currentNum == 0 ? 'huangse_1'
                                : currentNum == 1 ? 'baise_base'
                                : currentNum == 2 ? 'huangse_1'
                                : currentNum == 3 ? 'bojinse_1'
                                : currentNum == 4 ? 'baise_base' : ''"
                                >
                                    {{ list[currentNum] ? list[currentNum].name : "会员名" }}
                                </view>

                                <!-- 会员任务完成状态-->
                                <view class="vip_task" :class="
                                  currentNum == 0 ? 'huangse_2'
                                : currentNum == 1 ? 'baise_base'
                                : currentNum == 2 ? 'huangse_2'
                                : currentNum == 3 ? 'bojinse_2'
                                : currentNum == 4 ? 'baise_base' : ''">
                                    {{
                                        list[currentNum] ?
                                            (nextUserInfoList.length == list[currentNum].emdnum ?
                                                "恭喜您！已完成所有会员任务" : "完成成长任务拿更多奖励") : ""
                                    }}
                                </view>

                                <!--任务进度条 -->
                                <view>
                                    <u-line-progress
                                        :percentage="percentage"
                                        activeColor="#822200"
                                        height="10px"
                                    ></u-line-progress>
                                </view>

                                <!--有效会员人数-->
                                <view class="yxhyrs">
                                    有效会员：{{ list[currentNum] ? list[currentNum].startnum : "cao" }}-{{
                                        list[currentNum] ? list[currentNum].emdnum : ""
                                    }} 人
                                </view>
                            </view>

                            <!--  右边 -->
                            <view class="vip-right">
                                <view class="dsj">
                                    {{
                                        list[currentNum] ?
                                            (nextUserInfoList.length == list[currentNum].emdnum ?
                                                "已完成" : "待升级") : ""
                                    }}
                                </view>
                            </view>
                            <view class="clean_"></view>
                        </view>
                    </u-swiper>
                </view>
            </div>

            <!--升级条件介绍-->
            <view class="sjtj">
                <view>
                    <h3>
                        {{ list[currentNum] ? list[currentNum].name : "会员名" }}升级条件
                    </h3>
                </view>
                <u-line color="#bbb"></u-line>
                <u-grid
                    :border="false"
                    @click="click">
                    <u-grid-item
                        v-for="(baseListItem,baseListIndex) in baseList"
                        :key="baseListIndex" class="woqunimalegebidedashabi">
                        <u-icon
                            :customStyle="{paddingTop:20+'rpx'}"
                            :name="baseListItem.name"
                            :size="44"
                        ></u-icon>
                        <text class="grid-text huise">{{ baseListItem.title }}</text>

                        <!--回报情况， baseListIndex: 1 好友佣金 2接单次数 3接单收益率  -->
                        <text class="grid-text hese">{{
                                baseListIndex == 0 ?
                                    list[currentNum] ? list[currentNum].dividends + "%" : "" :
                                    baseListIndex == 1 ?
                                        proList :
                                        baseListIndex == 2 ?
                                            syl + "%" : ""
                            }}
                        </text>
                    </u-grid-item>
                </u-grid>
            </view>


            <!--温馨提示-->
            <view class="wxts sjtj">
                <view>
                    温馨提示：当接单次数上限，将无接单权限，需在规定时间发展有效会员进行会员升级，否则将不提供任何接单收益金额及本金，我司拥有绝对解释权！
                    温馨提示：如3级会员有效果会员3人盈利金额200000（200000*0.03=6000元）本次三级会员受益粉红6000元！
                    凡是成为我司区域会员，可线下免费加盟我司成立区域分公司，我司将提供医疗器材，专业医生线下指导工作！
                </view>
            </view>

        </view>

    </view>
</template>

<script>
import {
    getVipInfo
} from "@/common/js/http.api.js"

export default {
    data() {
        return {
            syl: 0,
            indicator: false,
            list: [], // viplist 等级列表
            currentNum: 0,
            baseList: [
                {
                    name: '/static/img/vip_icon2.jpg',
                    title: '好友佣金', // 接单次数
                    yj: '7%'
                },
                {
                    name: '/static/img/vip_icon2.jpg',
                    title: '接单次数',
                    yj: 15
                },
                {
                    name: '/static/img/vip_icon2.jpg',
                    title: '接单收益率',
                    yj: '11%'
                },
            ],
            nextUserInfoList: [], // 下级用户列表
            percentage: 0,  // 当前会员等级下的完成度
            proList: 0, // 接单次数
        }
    },
    created() {
        // 从全局处获取用户id
        let {
            vuex_user: {
                id: agentId
            }
        } = this

        // 获取VIP列表数据
        getVipInfo({agentId: agentId}).then(res => {
            if (res.code == 0) {
                // 设置轮播图列表
                this.list = res.data.proxyList

                // 下级会员列表
                this.nextUserInfoList = res.data.nextUserList

                // 完成度
                this.percentage = this.nextUserInfoList / this.list[this.currentNum].emdnum

                // 接单次数
                const list = res.proList

                this.proList = list.length
                let agentPercents = 0 // 项目id
                var long = 1
                list.forEach((item, index) => {
                    long = long + index
                    agentPercents = agentPercents + item.agentPercent
                })

                // 计算收益率
                this.syl = (agentPercents / 1).toFixed(2)
            }
        })
        // alert(id)
    },
    methods: {
        change(e) {
            this.currentNum = e.current
            console.log(this.currentNum)
        },
    },

}
</script>


<style scoped lang="scss">
.box {
    /deep/ .u-line-1.u-navbar__content__title{
        font-size: 1rem;
        line-height: 3rem;
        color: #FFFFFF;
    }
    /deep/ .u-navbar--fixed > .u-navbar__content {
        background: url("@/static/img/other-ban.jpg");
        .u-navbar__content__left{
            .u-icon.u-icon--right {
                .u-icon__icon.uicon-arrow-left {
                    color: #FFFFFF;
                }
            }
        }
    }
}
.wxts {
    margin-top: 30rpx;
    padding: 50rpx !important;
    width: 75% !important;
    text-indent: 40rpx;
    letter-spacing: 6rpx;
    color: #8A8A8A;
    line-height: 1.5rem;
}

.clean_ {
    clear: both;
}

.grid-text {
    margin-bottom: 40rpx;
}

.huise {
    color: #bbbbbb;
    margin-top: 40rpx;
}

.hese {
    color: #1f1f1f;
    font-size: 32rpx;
    font-weight: bolder;
}

.woqunimalegebidedashabi {
    margin-top: 40rpx;
}


.huangse_1 {
    color: #822200;
}

.huangse_2 {
    color: #BF7959;
}

/*白色*/
.baise_base {
    color: #fff;
}

/*铂金*/
.bojinse_1 {
    color: #3B4A66;
}

.bojinse_2 {
    color: #152544;
}

#card_list {

    /deep/ .u-swiper__wrapper__item__wrapper__image {
        border: 2rpx solid #BF7959;
    }

    /deep/ .u-swiper__indicator {
        top: 10%;
        left: 12%;
        width: 74%;
        height: 0;
    }

    /deep/ .u-swiper__indicator > uni-view {
        display: block;
    }

    /deep/ .vip_name {
        margin-bottom: 20rpx;
        font-size: 34rpx;
        font-weight: bold;
    }

    /deep/ .vip_task {
        margin-bottom: 100rpx;
    }

    /deep/ .yxhyrs {
        margin: 20rpx 0 20rpx 0;
    }

    /deep/ .dsj {
        color: #BF7959;
        position: absolute;
        top: -24rpx;
        right: -24rpx;
        font-size: 16rpx;
        font-weight: bold;
    }

    /deep/ .vip_left {
        display: inline-block;
        height: 0;
        float: left;
        width: 60%;
    }


    /deep/ .vip-right {
        display: inline-block;
        position: relative;
        width: 100%;
        float: left;
    }

    /deep/ .u-navbar__content {
        height: 100rpx !important;
        background: red;
    }
}


.sjtj h3 {
    margin-left: 4%;
    padding-left: 4%;
    margin-bottom: 4%;
    margin-top: 3%;
    border-left: 8rpx solid #96854f;
    color: #96854f;
}

.sjtj {
    background: #FFFFFF;
    width: 84%;
    margin-left: 6%;
    border-radius: 20rpx;
    padding: 2%;
}

.banner {
    margin-top: 120rpx;
    padding: 40rpx 0 20rpx 0;
}

.box {
    padding-bottom: 32rpx;
    background: #e6e2e2;
    height: 2000rpx;
}

.abs {
    /deep/ .u-icon__icon.uicon-arrow-left {

    }

    /deep/ .u-line-1.u-navbar__content__title {
        font-weight: bolder;
    }
}

.indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
        height: 12rpx;
        width: 12rpx;
        border-radius: 200rpx;
        background-color: rgba(255, 255, 255, 0.35);
        margin: 0 10rpx;
        transition: background-color 0.3s;

        &--active {
            background-color: #ffffff;
        }
    }
}

.indicator-num {
    padding: 4rpx 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 200rpx;
    width: 70rpx;
    @include flex;
    justify-content: center;

    &__text {
        color: #FFFFFF;
        font-size: 24rpx;
    }
}

</style>
