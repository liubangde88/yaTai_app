<template>
    <view class="login-container">
        <image src="@/static/img/close-icon.png" class="common-close" @click="$router.go(-1)"/>
        <view class="login-box">
            <text class="app-name">{{ $t('message.forgot') }}</text>
            <view class="login-from">
                <!-- 表单 -->
                <u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType">
                    <u-form-item prop="account" class="form-item">
                        <u-input
                            :clearable="true"
                            v-model="userInfo.account"
                            :placeholder="$t('message.account')"
                            placeholderStyle="{color: '#333'}"/>
                    </u-form-item>
                    <u-form-item prop="pwd" class="form-item">
                        <u-input
                            :clearable="true"
                            v-model="userInfo.pwd"
                            :placeholder="$t('message.pwd')"
                            placeholderStyle="{color: '#333'}"/>
                    </u-form-item>
                    <u-form-item prop="password" class="form-item">
                        <u-input
                            :clearable="true"
                            v-model="userInfo.password"
                            :placeholder="$t('message.password')"
                            placeholderStyle="{color: '#333'}"/>
                    </u-form-item>
                </u-form>
                <view class="btn" @click="submit">
                    {{ $t('message.confirmBtn') }}
                </view>
                <view class="option flex flex-cen fs28 col9">
                    <text @click="toPath">{{ $t('message.loginText') }}</text>
                </view>
            </view>
        </view>
    </view>
</template>


<script>
import {
    emailIsRegister
} from "@/common/js/http.api.js"

export default {
    data() {
        return {
            errorType: 'message',
            userInfo: {
                account: '',
                pwd: '',
                password: ''
            },
            rules: {
                account: {
                    type: 'string',
                    required: true,
                    message: this.$t('message.account'),
                    trigger: ['blur', 'change']
                },
                pwd: {
                    type: 'string',
                    required: true,
                    message: this.$t('message.pwd'),
                    trigger: ['blur', 'change']
                },
                password: {
                    type: 'string',
                    required: true,
                    message: this.$t('message.password'),
                    trigger: ['blur', 'change']
                },
            },
        }
    },
    onLoad(option) {

    },
    onShow() {

    },
    methods: {

        // 提交
        submit() {
            this.$refs.form.validate().then(res => {
                const email = this.userInfo.account
                console.log(!this.userInfo.account)

                // 检查是否是邮箱
                const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!regEmail.test(email)) {
                    // 合法的邮箱
                    return uni.$u.toast('邮箱不合法')
                }

                // 验证邮箱是否注册
                emailIsRegister({email: email}).then(res => {
                    if (res.code == 500) {
                        return uni.$u.toast('邮箱未注册')
                    }
                })

                // 验证两次密码是否一致
                if (this.userInfo.pwd != this.userInfo.password) {
                    return uni.$u.toast('两次密码不一致')
                }

                this.$router.push({
                    path: '/pages/my/transactionPasswordCode/index',
                    query: this.userInfo
                });
            }).catch(errors => {
                errors.forEach((v, i) => {
                    return uni.$u.toast(v.message)
                })
            })
        },
        toPath() {
            uni.navigateBack({
                delta: 1
            })
        }
    }
}
</script>

<style src="@/common/css/login.scss" lang="scss" scoped></style>
