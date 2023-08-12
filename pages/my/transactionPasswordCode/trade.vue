<template>
	<view class="transaction-password-container">
		<u-navbar bgColor="rgba(255,255,255)" @leftClick="back" />
		<view class="title">{{$t('message.verificationCode')}}</view>

        <!--  邮件发送说明-->
		<view class="desc">
            <span v-if="isSendEmail == true">{{$t('message.transactionPasswordCodeDesc')}}</span> <!--邮件已发送说明-->
            <span v-if="isSendEmail == false">{{$t('message.transactionPasswordCodeSend')}}</span> <!--邮件正在发送说明-->
            {{email}}
        </view>


		<view class="form bgWhite">
			<u-form :model="data" :rules="rules" ref="form" :errorType="errorType">
				<u-form-item prop="code" borderBottom class="form-item">
					<u-input
						border="none"
						:clearable="true"
						v-model="data.code"
						:maxlength="6"
						:placeholder="$t('message.transactionPasswordCodePlaceholder')" />
				</u-form-item>
			</u-form>
			<view class="btn" @click="submit">{{$t('message.transactionPasswordCodeBtn')}}</view>
		</view>
	</view>
</template>

<script>
import {
    sendEmail,
    checkCode,
    updatePasswd,
    getDetail
} from "@/common/js/http.api.js"
export default {
	data() {
		return {
            isSendEmail: false,
			errorType: 'message',
			email: '',
			rules: {
				code: {
					type: 'string',
					required: true,
					message: this.$t('message.code'),
					trigger: ['blur', 'change']
				},
			},
			data: {
				code: ''
			},
            passwd : ''
		}
	},
	onLoad(options) {

        // 接收到的参数
        const param = this.$route.query
        this.passwd = param.password // 交易密码


        // 从全局处获取用户id
        let {
            vuex_user: {
                id: agentId
            }
        } = this


        //邮件发送参数 mobile : param.account, email : param.account,


        // 获取用户信息
        getDetail({agentId : agentId}).then(res => {
           if(res.code === 0 ) {
               var emailParam = {  _register : 1 }
               emailParam.mobile = res.agent.mobile
               emailParam.email = res.agent.mobile
               this.email =  res.agent.mobile

               // 发送邮件
               Object.getOwnPropertyNames(emailParam).length
               sendEmail(emailParam).then(res => {
                   const  that = this
                   if(res.code == 0 ) {
                       this.isSendEmail = true
                       uni.$u.toast(that.$t('message.successText'));
                   }
               })
           }
        })


	},
	methods: {
		submit() {
			const that = this;
			this.$refs.form.validate().then(res => {
				// 进行验证码验证
                const param = { code : this.data.code, email : this.email}

                // 验证验证码是否正确
                checkCode(param).then(res => {
                   if(res.code === 0 ) {

                       // 进行密码修改
                       const  dataParams = {passwd : this.passwd, email : this.email, _register : 1}
                       console.log(dataParams)
                       updatePasswd(dataParams).then(ress => {
                           console.log(ress)
                            if( ress.code != 0  ) {
                              return  uni.$u.toast(that.$t('message.validateFail'));
                            }
                           // 修改成功，返回登陆页
                           if(ress.code === 0 ) { //pages/my/my/index
                                uni.showToast({
                                   title: that.$t('message.successText'),
                                   icon: 'hourglass-half-fill',
                               })

                               // 成功跳转
                               setTimeout(() => {
                                   this.$router.push({
                                       path: '/pages/my/my/index',
                                       query: this.data
                                   });
                               },2000)



                           }

                       })
                   }
                })
			}).catch(errors => {
				uni.$u.toast(that.$t('message.validateFail'));
			})
		}
	}
}
</script>

<style scoped>
.transaction-password-container{
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
		margin-top: 10rpx;
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