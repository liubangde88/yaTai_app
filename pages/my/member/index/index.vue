<template>
    <view class="box">

        <!--title 位置-->
        <view class="nav abs">
            <u-navbar leftIconColor="#fff"
                      :title="$t('message.vipcenter')"
                      bgColor="rgba(255,255,255,.0)"
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
                                <view class="vip_name">{{ list[currentNum].name }}</view>

                                <!-- 会员任务完成状态-->
                                <view class="vip_task">完成成长任务拿更多奖励</view>

                                <!--任务进度条 -->
                                <view>
                                    <u-line-progress
                                        :percentage="30"
                                        activeColor="#822200"
                                        height="10px"
                                    ></u-line-progress>
                                </view>

                                <!--有效会员人数-->
                                <view class="yxhyrs">
                                    有效会员：{{ list[currentNum].startnum }}-{{ list[currentNum].emdnum }} 人
                                </view>
                            </view>

                            <!--  右边 -->
                            <view class="vip-right">
                                <view class="dsj">待升级</view>
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
                        {{ name }}升级条件
                    </h3>
                </view>
                <u-line color="#bbb"></u-line>
                <u-grid
                    :border="false"
                    @click="click">
                    <u-grid-item
                        v-for="(baseListItem,baseListIndex) in baseList"
                        :key="baseListIndex">
                        <u-icon
                            :customStyle="{paddingTop:20+'rpx'}"
                            :name="baseListItem.name"
                            :size="22"
                        ></u-icon>
                        <text class="grid-text">{{ baseListItem.title }}</text>
                        <text class="grid-text">{{ baseListItem.yj }}</text>
                    </u-grid-item>
                </u-grid>
            </view>


            <!--温馨提示-->
            <view class="wxts sjtj">
                <view>
                    温馨提示
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
            indicator: false,
            list: [], // 图片
            currentNum: 0,
            baseList: [
                {
                    name: 'https://cdn.uviewui.com/uview/example/button.png',
                    title: '好友佣金', // 接单次数
                    yj: '7%'
                },
                {
                    name: 'https://cdn.uviewui.com/uview/example/button.png',
                    title: '接单次数',
                    yj: 15
                },
                {
                    name: 'https://cdn.uviewui.com/uview/example/button.png',
                    title: '接单收益率',
                    yj: '11%'
                },
            ],
            name: "青铜会员"
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
                this.$data.list = res.data.proxyList
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
.clean_ {
    clear: both;
}

#card_list {
    /deep/ .u-swiper__wrapper__item__wrapper__image {
        border: 1px solid #BF7959;
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
        color: #822200;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
    }

    /deep/ .vip_task {
        color: #BF7959;
        margin-bottom: 50px;
    }

    /deep/ .yxhyrs {
        color: #BF7959;
        margin: 10px 0 10px 0;
    }

    /deep/ .dsj {
        color: #BF7959;
        position: absolute;
        top: -16px;
        right: -12px;
        font-size: 8px;
        font-weight: bold;
    }

    /deep/ .vip_left {
        display: inline-block;
        height: 0;
        float: left;
        width: 79%;
    }


    /deep/ .vip-right {
        display: inline-block;
        position: relative;
        width: 100%;
        float: left;
    }
}

.wxts {
    margin-top: 5%;
}

.sjtj h3 {
    margin-left: 4%;
    padding-left: 4%;
    margin-bottom: 4%;
    margin-top: 3%;
    border-left: 4px solid #96854f;
    color: #96854f;
}

.sjtj {
    background: #FFFFFF;
    width: 84%;
    margin-left: 6%;
    border-radius: 10px;
    padding: 2%;
}

.banner {
    margin-top: 12%;
    padding: 20px 0 10px 0;
}

.box {
    padding-bottom: 16px;
    background: #e6e2e2;
}

.abs {
    /deep/ .u-icon__icon.uicon-arrow-left {
        color: #000000 !important;
    }

    /deep/ .u-line-1.u-navbar__content__title {
        font-weight: bolder;
    }
}

.indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
        height: 6px;
        width: 6px;
        border-radius: 100px;
        background-color: rgba(255, 255, 255, 0.35);
        margin: 0 5px;
        transition: background-color 0.3s;

        &--active {
            background-color: #ffffff;
        }
    }
}

.indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
        color: #FFFFFF;
        font-size: 12px;
    }
}

</style>
