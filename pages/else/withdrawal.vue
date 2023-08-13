<template>
    <view class="withdrawal-container" >
        <!--     上   -->

            <u-navbar
                leftIconColor="#fff"
                :title="$t('message.myPageWithdrawal')"
                bgColor="rgba(255,255,255,.0)"
                :titleStyle="{color: '#fff'}"
                @leftClick="back"/>

            <view class="head">
                <view>
                    <view class="balance">{{ $t('message.balance') }}</view>
                    <text class="money">{{ info.supMoney }}</text>
                </view>
                <view class="recharge" @click="recharge">
                    {{ $t('message.cashRecord') }}>>
                </view>
            </view>
            <view class="withdrawal">
                <view class="opear">
                    <view class="title">{{ $t('message.withdrawalMoney') }}</view>
                    <view class="input">
                        <view class="input-content">
                            <text class="unit">¥</text>
                            <input type="number" v-model="moeny"/>
                        </view>
                        <text class="all" @click="allWithdrawal">{{ $t('message.withdrawalAllMoney') }}</text>
                    </view>
                </view>
                <view class="target-card">
                    {{ $t('message.withdrawalTarget') }}
                    <view class="blank" @click="oepnBank()">
                        {{userInfo.withName}} - {{userInfo.openBank}}
                        <image src="@/static/img/right-arrow.png" class="img"/>
                    </view>
                </view>
                <view class="btn" @click="withdrawal">{{ $t('message.myPageWithdrawal') }}</view>
            </view>

            <uni-popup ref="bank" >
                <view class="blank-container">

                    <view class="list">
                        <view
                            :class="['item', item.id === selectedBank.id ? 'active' : '']"
                            v-for="(item, index) in bankData"
                            :key="index"
                            @click="selectBank(item)"
                        >
                            <text>{{ item.name }}</text>
                            <image src="@/static/img/active.png" class="img" v-if="item.id === selectedBank.id"/>
                        </view>
                    </view>
                </view>
            </uni-popup>


    </view>
</template>

<script>
import {getWallet, withdraw} from "@/common/js/http.api.js";
import Toast from "../../uni_modules/uview-ui/libs/config/props/toast";

export default {
    data() {

        return {
            tixianSuccess :false,
            isClose: true,
            info: {},
            moeny: null,
            selectedBank: {},
            bankData: [  ],
            userInfo : {}
        }
    },
    computed: {
        bankNo() {
            let str = this.vuex_user.withCount
            return str ? str.substring(0, 4) + ' *** **** **** ' + str.slice(-4) : ''
        }
    },
    onShow() {
        this.getWallet()

        // 获取我的银行卡信息
        this.userInfo.withMan = this.vuex_user.withMan || ''
        this.userInfo.withName = this.vuex_user.withName || ''
        this.userInfo.openBank = this.vuex_user.withAddress || ''
        this.userInfo.withCount = this.vuex_user.withCount || ''
        this.userInfo.count = this.vuex_user.withCount || ''

        //  {name: '中国银行', id: '1'},
        let item = {name : this.userInfo.withName + "-" + this.userInfo.openBank, id : 1 }
        this.bankData.push(item)
        console.log(this.userInfo)

    },
    methods: {
        // 请联系客服充值
        recharge() {
            this.$router.push('/pages/my/cashRecord/index')
           // uni.$u.toast(this.$t('message.rechargeContact'))
        },
        getWallet() {
            let params = {
                agentId: this.vuex_user.id
            }
            getWallet(params).then(res => {
                this.info = res.wallet
                console.log(res)
            })
        },
        selectBank(data) {
            console.log(data)
            this.$refs['bank'].close();
            let name = data.name
            let [withName,openBank ] = name.split("-")
            this.userInfo.withName = withName
            this.userInfo.openBank = openBank
            console.log(this.userInfo)
        },
        oepnBank() {
            console.log("oepnBank")
            this.selectedBank = {};
            this.$refs['bank'].open('bottom');
        },
        withdrawal() {
            if (this.moeny <= 0 || this.moeny > this.info.supMoney) {
                return uni.$u.toast("提现金额有误！");
            }

            // 进行提现
            withdraw({agentId:  this.vuex_user.id,withMoney:this.moeny  }).then(res => {
                if(res.code !== 0 ) {
                    return uni.$u.toast(res.msg)
                }

                // 提现成功
                uni.showLoading({
                    title: res.msg,
                })
                setTimeout(() => {

                    uni.showModal({
                        content: '恭喜提现成功！',
                        showCancel:false,
                        confirmColor:"#86784B",
                        success: function (res) {
                        }
                    });
                    uni.hideLoading();
                    this.tixianSuccess = true
                }, 1000)

            })
        },
        allWithdrawal() {
            this.moeny = this.info.supMoney
        }
    }
}
</script>

<style scoped> /*head*/


.withdrawal-container {
    height: 100vh;
    background: url('@/static/img/my-bg.png') no-repeat;
    background-size: 100%;
    background-position: 0 -80rpx;

    .head {
        height: 400rpx;
        display: flex;
        justify-content: space-between;
        color: #fff;
        align-items: center;
        margin-left: 64rpx;

        .balance {
            font-family: PingFang HK;
            font-size: 24rpx;
            margin-bottom: 20rpx;
        }

        .money {
            font-family: Open Sans;
            font-size: 48rpx;
        }

        .recharge {

            width: 160rpx;
            line-height: 50rpx;
            border-radius: 23px 0px 0px 23px;
            font-family: ABeeZee;
            font-size: 13px;
            background: rgba(255, 255, 255, 0.12);
            text-align: center;
            border: 1px solid #86784B;
            font-weight: bolder;
        }
    }

    .withdrawal {
        background-color: #fff;
        margin-left: 30rpx;
        margin-right: 30rpx;
        border-radius: 16rpx;
        margin-top: -40rpx;
        padding-bottom: 140rpx;

        .opear {
            padding-top: 60rpx;
            padding-left: 30rpx;
            padding-right: 30rpx;
            padding-bottom: 56rpx;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);

            .title {
                font-family: PingFang HK;
                font-size: 32rpx;
                margin-bottom: 44rpx;
            }

            .input {
                display: flex;
                justify-content: space-between;

                .input-content {
                    display: flex;
                    align-items: center;
                    gap: 40rpx;
                }

                .unit {
                    font-family: ABeeZee;
                    font-size: 72rpx;

                }
            }

            .all {
                font-family: PingFang HK;
                font-size: 32rpx;
                color: #86784B;
            }
        }

        .target-card {
            display: flex;
            justify-content: space-between;
            margin: 30rpx;

            .blank {
                display: flex;
                align-items: center;
                gap: 20rpx;

                .img {
                    width: 16rpx;
                    height: 30rpx;
                }
            }
        }
    }

    .btn {
        height: 90rpx;
        text-align: center;
        background-color: #86784B;
        border-radius: 16rpx;
        margin-top: 40rpx;
        margin-left: 30rpx;
        margin-right: 30rpx;
    }
}

.blank-container {
    background-color: #fff;
    padding-left: 32rpx;
    padding-right: 32rpx;
    height: 30rem;
    .head {
        height: 100rpx;
        color: #333;
        font-family: PingFang HK;
        font-size: 28rpx;
        margin-left: 0;

        .img {
            width: 34rpx;
            height: 34rpx;
            margin-left: 0;
        }

        .done {
            color: #86784B;
        }

    }

    .list {
        height: 80vh;
        overflow-y: auto;

        .item {
            height: 100rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 20rpx;
            padding-right: 20rpx;
            border-bottom: 1px solid #F6F7FD;

            .img {
                width: 34rpx;
                height: 34rpx;
                margin-left: 0;
            }

            &.active {
                background-color: #F6F7FD;
                border-radius: 16rpx;
            }
        }
    }
}
</style>