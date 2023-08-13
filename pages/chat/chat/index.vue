<template>
    <view class="box">
        <view class="header-box fixed">
            <image src="@/static/img/other-ban.jpg" class="header-ban img"></image>
            <u-navbar leftIcon="" :title="$t('tabbar.chat')" bgColor="rgba(255,255,255,.0)"
                      :titleStyle="{color: '#fff'}"></u-navbar>
        </view>
        <view class="chat-main">
            <view class="chat-ul bgWhite flexColumn" v-if="list.length > 0">
                <view class="chat-li flexColumn" v-for="(item,index) in list" :key="index">
                    <text class="fs30 col1">{{ item.qrName }}:</text>
                    <view class="chat-info fs28 flex" v-if="item.qrAccount">{{ item.qrAccount }}
                        <view class="copy-btn fs28 colf" @click="copy(item.qrAccount)">{{ $t('message.copy') }}</view>
                    </view>
                    <view class="chat-info fs28 flex" v-if="item.qrAddress">
                        <!-- {{item.qrAddress}} -->
                        <view class="copy-btn fs28 colf" style="flex: 1;" @click="toPath(item.qrAddress)">
                            {{ $t('message.goTo') }}
                        </view>
                    </view>
                    <image :src="item.qrUrl" mode="" class="kefu-img" @click="previewImage(item.qrUrl)"
                           v-if="item.qrUrl"></image>
                </view>
            </view>
            <view class="chat-ul bgWhite flex flex-cen" style="height: 500rpx;" v-else>
                <u-empty mode="list" :text="$t('message.emptyText')"></u-empty>
            </view>
        </view>
    </view>
</template>

<script>
import {
    getListQrcode
} from "@/common/js/http.api.js"

export default {
    data() {
        return {
            list: []
        }
    },
    onLoad(option) {
        this.getInfo()
    },
    onShow() {

    },
    methods: {
        // 获取客服信息
        getInfo() {
            getListQrcode().then(res => {
                if (res.ls.length > 0) {
                    res.ls.map(item => {
                        item.qrName = item.qrName + this.$t('message.kefu')
                    })
                }
                console.log(res)
                this.list = res.ls
            })
        },
        // 复制客服账号
        copy(account) {
            let that = this
            uni.setClipboardData({
                data: account,
                success: function () {
                    that.$u.toast(that.$t('message.successText'))
                }
            });
        },
        // 预览图片
        previewImage(url) {
            let that = this
            uni.previewImage({
                urls: [url],
                longPressActions: {
                    itemList: ['保存图片'],
                    success: function () {
                        that.$u.toast(that.$t('message.successText'))
                    },
                    fail: function (err) {
                    }
                }
            });
        },
        // 前往
        toPath(url) {
            url = encodeURIComponent(url)
            console.log(unescape(url))
            window.location.href = unescape(url);
            // uni.navigateTo({
            //     url: url
            // })
        }

    }
}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
/* #ifdef H5 */
.header-ban {
    height: 260rpx;
    top: -50rpx;
}

/* #endif */

.chat-main {
    width: 100vw;
    min-height: calc(100vh - 500rpx);
    /* #ifdef APP-PLUS */
    margin-top: 280rpx;
    /* #endif */
    /* #ifdef H5 */
    margin-top: 230rpx;
    /* #endif */
    padding: 30rpx;
    box-sizing: border-box;
}

.chat-ul {
    width: 100%;
    height: 100%;
    padding: 20rpx 50rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    /* justify-content: center; */
}

.chat-li {
    min-height: 150rpx;
    margin-bottom: 100rpx;
    justify-content: space-between;
}

.chat-info {
    width: 100%;
    height: 80rpx;
    justify-content: space-between;
    color: blue;
    margin-right: 10rpx;
    background: #A19878;
    border-radius: 20rpx;
}

.copy-btn {
    width: 150rpx;
    height: 60rpx;
    border-radius: 15rpx;
    line-height: 60rpx;
    text-align: center;
    background: #A19878;

}

.kefu-img {
    width: 200rpx;
    height: 200rpx;
}
</style>
