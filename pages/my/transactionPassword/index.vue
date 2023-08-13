<template>
	<view class="transaction-password-container">
        <!--title 位置-->
        <view class="nav abs">
            <u-navbar leftIconColor="#fff"
                      height="60"
                      :title="$t('message.vipcenter')"
                      bgColor="#fff"
                      @leftClick="back">
            </u-navbar>
        </view>


        <view class="title">{{ withPwdEmpty ? $t('message.resetJiaoyiPasswd') : $t('message.transactionPasswordTitle')}}</view>
		<view class="desc" >*{{withPwdEmpty ? $t('message.resetjiaoyitxt'):$t('message.transactionPasswordDesc')}}</view>




        <view class="form bgWhite" v-if="!withPwdEmpty">
			<u-form :model="data" :rules="rules" ref="form" :errorType="errorType">
				<u-form-item prop="password" borderBottom class="form-item">
					<u-input
						border="none"
						:clearable="true"
						v-model="data.password" 
						:password="true"
						:maxlength="12"
						:placeholder="$t('message.transactionPasswordPlaceholder')" />
				</u-form-item>
				<u-form-item prop="confirmPassword" borderBottom class="form-item">
					<u-input
						border="none"
						:clearable="true"
						v-model="data.confirmPassword" 
						:password="true"
						:maxlength="12"
						:placeholder="$t('message.transactionPasswordConfirmPlaceholder')" />
				</u-form-item>
			</u-form>
			<view class="btn" @click="submit">{{$t('message.confirmBtn')}}</view>
		</view>


        <view class="btn resetbtn" v-if="withPwdEmpty" @click="resetPasswd"  >{{$t('message.resetJiaoyiPasswd')}}</view>
	</view>
</template>


<script>
import {
    getDetail
} from "@/common/js/http.api.js"
export default {
	data() {
		return {
            withPwdEmpty : true,
			errorType: 'message',
			rules: {
				password: {
					type: 'string',
					required: true,
					message: this.$t('message.pwd'),
					trigger: ['blur', 'change']
				},
				confirmPassword: {
					type: 'string',
					required: true,
					message: this.$t('message.password'),
					trigger: ['blur', 'change']
				},
			},
			data: {
				password: '',
				confirmPassword: ''
			}
		}
	},
    created() {
        // 从全局处获取用户id
        let {
            vuex_user: {
                id: agentId
            }
        } = this

        // 获取我的信息
        getDetail({agentId :agentId}).then(res => {
            console.log(res)
            this.withPwdEmpty = res.agent.withPwd ? true : false
        })
    },
	methods: {
        resetPasswd() {
            this.withPwdEmpty = false
        },
		submit() {
			const that = this;
			this.$refs.form.validate().then(res => {
				uni.$u.toast(that.$t('message.validateSuccess'));
				// 成功跳转
                this.$router.push({
                    path: '/pages/my/transactionPasswordCode/trade',
                    query: this.data
                });

			}).catch(errors => {
				uni.$u.toast(that.$t('message.validateFail'));
			})
		}
	}
}
</script>

<style scoped lang="scss">

.transaction-password-container{
    padding-top: 30rpx;
    /deep/ .u-line-1.u-navbar__content__title{
        font-size: 1rem;
        line-height: 3rem;
        color: #FFFFFF !important;
    }
    /deep/ .u-navbar--fixed > .u-navbar__content {
        background: url("@/static/img/other-ban.jpg");
        height: 100rpx !important;
        .u-navbar__content__left{
            .u-icon.u-icon--right {
                .u-icon__icon.uicon-arrow-left {
                    color: #FFFFFF !important;
                }
            }
        }
    }
    .resetbtn {
        margin-top: 100px;
    }
	padding-left: 30rpx;
	padding-right: 30rpx;
	.title{
		font-family: Open Sans;
		font-size: 40rpx;
		font-weight: 600;
		margin-top: 120rpx;
	}
	.desc{
		font-family: PingFang HK;
		font-size: 24rpx;
		color: #A1A0A0;
		margin-top: 30rpx;
	}
	.form{
		padding: 40rpx;
		border-radius: 16rpx;
		margin-top: 42rpx;
		.form-item{
			margin-bottom: 40rpx;
		}
	}
	.btn{
		background-color: #86784B;
		border-radius: 16rpx;
	}
}
</style>