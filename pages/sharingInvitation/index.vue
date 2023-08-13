<template>
	<view class="sharing-invitation-container box">

        <!--title 位置-->
        <view class="nav abs">
            <u-navbar leftIconColor="#fff"
                      height="60"
                      :title="$t('message.vipcenter')"
                      bgColor="#fff"
                      @leftClick="back">
            </u-navbar>
        </view>



		<view class="title" >
			{{$t('message.sharingInvitationTitle')}}
		</view>
		<view class="content">
			<view class="line"></view>
			<view class="sub-title">{{$t('message.sharingInvitationSubTitle')}}</view>
			<image src="@/static/img/code.png" class="code" />
			<view class="my-invitation-code">
				{{$t('message.sharingInvitationMyCode')}}：
			</view>
			<view class="my-code">
				{{code}}
				<image src="@/static/img/copy.png" class="copy" @click="copyCode" />
			</view>
			<view class="btn" @click="savePoster">复制到相册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: ''
			}
		},
		onLoad(res) {

			this.code =  'yyzz' + this.vuex_user.id;
		},
		methods: {
			copyCode() {
				const that = this;
				uni.setClipboardData({
					data: that.code,
					complete(res) {
						uni.hideToast();
						if(res.errMsg === 'setClipboardData:ok') {
							uni.showToast({
								icon: 'none',
								title: that.$t('message.copySuccess')
							})
						}
					}
				})
			},
			savePoster() {
                try {
                    uni.getSetting({ //获取用户的当前设置
                        success: (res) => {
                            if (res.authSetting['scope.writePhotosAlbum']) { //验证用户是否授权可以访问相册
                                this.saveImageToPhotosAlbum();
                            } else {
                                uni.authorize({ //如果没有授权，向用户发起请求
                                    scope: 'scope.writePhotosAlbum',
                                    success: () => {
                                        this.saveImageToPhotosAlbum();
                                    },
                                    fail: () => {
                                        uni.showToast({
                                            title: this.$t('message.promptSetting'),
                                            icon: "none",
                                            duration: 3000
                                        });
                                        setTimeout(() => {
                                            uni.openSetting({ //调起客户端小程序设置界面,让用户开启访问相册
                                                success: (res2) => {
                                                    // console.log(res2.authSetting)
                                                }
                                            });
                                        }, 3000);
                                    }
                                })
                            }
                        }
                    })
                }catch (error) {
                    uni.showToast({
                        icon: 'none',
                        title: this.$t('message.photoAlbum')
                    })
                    // Only runs when there is an error/exception
                }

            },
			saveImageToPhotosAlbum() {
				let base64 = this.src2.replace(/^data:image\/\w+;base64,/, ""); //去掉data:image/png;base64,
				let filePath = wx.env.USER_DATA_PATH + '/ph_fit_qrcode.png';
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.getFileSystemManager().writeFile({
					filePath: filePath, //创建一个临时文件名
					data: base64, //写入的文本或二进制数据
					encoding: 'base64', //写入当前文件的字符编码
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: filePath,
							success: function(res2) {
								uni.hideLoading();
								uni.showToast({
									title: this.$t('message.sharingInvitationSaveLocalSuccess'),
									icon: "none",
									duration: 5000
								})
							},
							fail: function(err) {
								uni.hideLoading();
							}
						})
					},
					fail: err => {
						uni.hideLoading();
					}
				})
			},
		}
	}
</script>

<style  scoped lang="scss">

.sharing-invitation-container{
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
	.back{
		width: 28rpx;
		height: 26rpx;
		margin-top: 100rpx;
		margin-left: 36rpx;
	}
	.title{
		font-family: Open Sans;
		font-size: 30rpx;
		font-weight: 400;
		margin-left: 36rpx;
		margin-top: 300rpx;
	}
	.content{
		width: 680rpx;
		height: 920rpx;
		background-image: url('@/static/img/sharing-invitation-bg.png');
		background-size: cover;
		margin-left: auto;
		margin-right: auto;
		padding-left: 34rpx;
		padding-right: 34rpx;
		margin-top: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		overflow: hidden;
		.line{
			width: 160rpx;
			height: 12rpx;
			background-color: #fff;
			border-radius: 6rpx;
			margin: 50rpx auto;
		}
		.sub-title{
			font-family: Acme;
			font-size: 32rpx;
			font-weight: 400;
		}
		.code{
			width: 320rpx;
			height: 320rpx;
			margin-top: 48rpx;
		}
		.my-invitation-code{
			font-family: PingFang HK;
			font-size: 28rpx;
			font-weight: 500;
			margin-top: 48rpx;
			margin-bottom: 20rpx;
		}
		.my-code{
			width: 352rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 60rpx;
			border: 1Px solid #fff;
			text-align: center;
			font-family: PingFang HK;
			font-size: 48rpx;
			font-weight: 600;
			position: relative;
			.copy{
				width: 34rpx;
				height: 40rpx;
				position: absolute;
				right: 20rpx;
				top: 26rpx;
			}
		}
	}
	.btn{
		font-family: PingFang HK;
		font-size: 30rpx;
		font-weight: 500;
		background-color: #86784B;
		width: 98%;
		margin-top: 72rpx;
	}
}
</style>
