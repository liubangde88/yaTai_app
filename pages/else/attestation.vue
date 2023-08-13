<template>
	<view class="attestation-container">
        <!--title 位置-->
        <view class="nav abs">
            <u-navbar leftIconColor="#fff"
                      height="60"
                      :title="$t('message.attestation')"
                      bgColor="#fff"
                      @leftClick="back">
            </u-navbar>
        </view>



        <view class="title">{{agent ?
                agent.cardStatus == 0 ?
                    $t('message.attestation')
                    : agent.cardStatus == 1 ?
                        "请耐心等待证件审核"
                        : agent.cardStatus == 2 ?
                            "我的证件信息" : $t('message.attestation')
                :$t('message.attestation')
            }}
        </view>

		<view class="sub-title">*{{$t('message.attestationSubTitle')}}</view>
		<view class="box bgWhite">
			<view class="card-title">{{$t('message.attestationBasicTitle')}}</view>
			<view clss="form">
				<u-form labelPosition="left" :model="data" :rules="rules" ref="form" :errorType="errorType"
					labelWidth="100">
                    <!--真是姓名-->
					<u-form-item :label="$t('message.withManTitle')" prop="withMan" borderBottom class="form-item">
						<u-input
                            :clearable="true"
                            v-model="data.withMan"
                            border="none"
                            :placeholder="agent ? agent.certName ? agent.certName : $t('message.withMan') : $t('message.withMan')"
                            :readonly="!!agent.cardStatus"></u-input>
					</u-form-item>

                    <!--身份证好-->
					<u-form-item :label="$t('message.documentNumTitle')" prop="documentNum" borderBottom class="form-item">
						<u-input :clearable="true"
                                 v-model="data.documentNum"
                                 border="none"
							    :placeholder="agent ? agent.certNum  ? agent.certNum  : $t('message.documentNum'):$t('message.documentNum')"
							    :readonly="!!agent.cardStatus"></u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="card-title">{{$t('message.attestationCarTitle')}}</view>
			<view class="car-desc">
				<view>{{$t('message.attestationCarDesc1')}}</view>
				<view>{{$t('message.attestationCarDesc2')}}</view>
			</view>
            <!--身份证正面-->
			<view class="car-title">{{$t('message.attestationCarTitle1')}}</view>
			<view class="car-img" @click="chooseImage(1)">
				<image :src="agent.cardFrontImg" v-if="!!agent.cardFrontImg" class="img"/>
				<image src="@/static/img/car-img1.png" v-else class="img"/>
			</view>

            <!--身份证反面-->
			<view class="car-title">{{$t('message.attestationCarTitle2')}}</view>
			<view class="car-img" @click="chooseImage(2)">
                <image :src="agent.cardRsImg" v-if="!!agent.cardRsImg" class="img"/>
                <image src="@/static/img/car-img1.png" v-else class="img"/>
			</view>
		</view>
		<view class="footer">
			<view class="tips" v-if="agent.cardStatus !== 0">{{$t('message.attestationTips')}}</view>
			<view class="btn" @click="submit" v-if="agent.cardStatus === 0">{{$t('message.attestationBtn')}}</view>
		</view>
	</view>
</template>

<script>
	import {
        getDetail,
        verifiedCard
	} from "@/common/js/http.api.js"
    import {
        pathToBase64,base64ToPath
    } from  "@/utils/tool.js"

	export default {
		data() {
			return {
                agent : {},
				errorType: 'message',
				data: {
					withMan: '',
					documentNum: ''
				},
				rules: {
					withMan: {
						type: 'string',
						required: true,
						message: this.$t('message.withMan'),
						trigger: ['blur', 'change']
					},
					documentNum: {
						type: 'string',
						required: true,
						message: this.$t('message.documentNum'),
						trigger: ['blur', 'change']
					},
				},
				isAttestation: false
			}
		},
		onLoad(option) {
            // 获取用户id
            let {
                vuex_user: {
                    id: agentId
                }
            } = this

            // 获取个人信息
            getDetail({agentId :agentId}).then(res =>  {
                if(res.code !== 0 ) {
                   return  uni.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 1500
                    })
                }

                // 参数组装
                this.agent = res.agent
                console.log(this.agent)
            })

		},
		methods: {
			// 提交
			submit() {
                let that_ = this
                //参数验证
				this.$refs.form.validate().then(res => {
                    // 检查图片是否存在
                    if(!this.agent.cardFrontImg) {
                         return uni.showToast({
                            title: "身份证正面图片需上传！",
                            icon: 'none',
                            duration: 1500
                        })
                    }

                    if(!this.agent.cardRsImg) {
                        return uni.showToast({
                            title: "身份证反面需上传！",
                            icon: 'none',
                            duration: 1500
                        })
                    }

                    // 获取用户id
                    let {
                        vuex_user: {
                            id: agentId
                        }
                    } = this

                    // 提交参数
					const  params = {
                        certName : this.data.withMan, // 姓名
                        certNum : this.data.documentNum,  // 身份证号
                        cardFrontImg : this.agent.cardFrontImg, // 正面图
                        cardRsImg : this.agent.cardRsImg, // 反面图
                        id : agentId // 用户id
                    }

                    // 提交数据到服务器
                    verifiedCard(params).then( res => {
                        if(res.code !== 0) {
                            return uni.showToast({
                                title: res.msg,
                                icon: 'none',
                                duration: 1500
                            })
                        }

                        that_.agent = res.agent
                    })
				}).catch(errors => {

				})
			},
            // 上传身份证
			chooseImage(type) {
                console.log(type)
				uni.chooseImage({
                    success: (chooseImageRes) => {
                        // 获取file
                        const tempFilePaths = chooseImageRes.tempFilePaths;

                        // 转为base64
                        pathToBase64(tempFilePaths[0]).then(baseUrl => {
                            type === 1 ? this.agent.cardFrontImg = baseUrl : this.agent.cardRsImg = baseUrl
                        })
                    }
				})
			}
		}
	}
</script>

<style scoped lang="scss">

.attestation-container{
    /deep/ .u-line-1.u-navbar__content__title{
        font-size: 1rem;
        line-height: 90rpx;
        color: #FFFFFF;

    }
    /deep/ .u-navbar--fixed > .u-navbar__content {
        height: 100rpx !important;
        background: url("@/static/img/other-ban.jpg");
        .u-navbar__content__left{
            .u-icon.u-icon--right {
                .u-icon__icon.uicon-arrow-left {
                    color: #FFFFFF !important;
                }
            }
        }
    }

	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-bottom: 280rpx;
	.title{
		font-family: Open Sans;
		font-size: 40rpx;
		font-weight: 600;
		margin-top: 25%;
	}

	.sub-title{
		font-family: PingFang HK;
		font-size: 24rpx;
		font-weight: 500;
		color: #A1A0A0;
		margin-bottom: 34rpx;
		margin-top: 10rpx;
        line-height: 2rem;
	}
	.form{
		margin-bottom: 40rpx;

	}
    /deep/ .u-form-item__body {
        line-height: 2.5rem;
    }
	.card-title{
		font-family: Open Sans;
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 60rpx;
	}
	.box{
		padding: 16rpx;
		border-radius: 16rpx;
		.car-desc{
			font-family: PingFang HK;
			font-size: 24rpx;
			color: #C4C4C4;
            line-height: 2.5rem;
		}
		.car-title{
			font-family: PingFang HK;
			font-size: 28rpx;
			font-weight: 500;
			color: #A1A0A0;
			margin-top: 30rpx;
			margin-bottom: 10rpx;
		}
		.car-img{
			height: 320rpx;
			border-radius: 16rpx;
			border: 1px solid #F6F7FD;
			display: flex;
			justify-content: center;
			align-items: center;
			.img{
				width: 168rpx;
				height: 136rpx;
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx 52rpx 70rpx;
		.tips{
			font-family: PingFang HK;
			font-size: 24rpx;
			margin-bottom: 40rpx;
			text-align: center;
			color: #A1A0A0;
		}
	}
	.btn {
		background: #86784B;
		border-radius: 16rpx;
	}
}
</style>