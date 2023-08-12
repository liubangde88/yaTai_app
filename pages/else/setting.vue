<template>
	<view class="box setting-container">
		<view class="header-box fixed">
			<u-navbar :title="$t('message.set')" bgColor="rgba(255,255,255,.0)" @leftClick="back"></u-navbar>
		</view>
		<view class="my-main">
			<view class="user-ul bgWhite">
				<!-- 头像 -->
				<view class="user-li fs30 flex">
					<text class="col1">{{$t('message.avatar')}}</text>
					<view class="input col9">
						<image :src="headImg || baseImg" mode="" class="avatar" @click.stop="upload"></image>
					</view>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
				<!-- 昵称 -->
				<view class="user-li fs30 flex">
					<text class="col1">{{$t('message.nickname')}}</text>
					<u-input :placeholder="$t('message.nickname')" :placeholderStyle="{color: '#999'}"
						inputAlign="right" border="none" v-model="nickName" @change="editHandle('nickName')"></u-input>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
				<!-- 手机号 -->
				<view class="user-li fs30 flex">
					<text class="col1">{{$t('message.emailText')}}</text>
					<view class="input col9">
						{{vuex_user.mobile || '-'}}
					</view>
				</view>

				<!-- 修改密码 -->
				<view class="user-li fs30 flex" @click.stop="toPath('/pages/else/editPwd?type=2','pwd')">
					<text class="col1">{{$t('message.editPwd')}}</text>
					<view class="input col9">
						{{$t('message.edit')}}
					</view>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
				<!-- 银行名称 -->
				<view class="user-li fs30 flex">
					<text class="col1">{{$t('message.withName')}}</text>
					<!-- <u-input :placeholder="$t('message.withName')" :placeholderStyle="{color: '#999'}"
						inputAlign="right" border="none" v-model="withName" @change="editHandle('withName')"></u-input>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon> -->
					<view class="input col9">
						{{vuex_user.withName || '-'}}
					</view>
				</view>
				<!-- 银行卡号 -->
				<!-- @click="toPath('/pages/else/editBank','bank')" -->
				<view class="user-li fs30 flex">
					<text class="col1">{{$t('message.withCount')}}</text>
					<!-- <u-input :placeholder="$t('message.withCount')" :placeholderStyle="{color: '#999'}"
						inputAlign="right" border="none" v-model="withCount" @change="editHandle('withCount')">
					</u-input> -->

					<!-- <view class="input col9">
						{{withCount || '修改'}}
					</view>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon> -->
					<view class="input col9">
						{{withCount || '-'}}
					</view>
				</view>
				<!-- 语言 -->
				<view class="user-li fs30 flex" @click.stop="show = true">
					<text class="col1">{{$t('message.langSet')}}</text>
					<view class="input col9">
						{{language}}
					</view>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
		</view>
		<u-action-sheet :actions="languages" :title="$t('message.langSet')" :show="show" :safeAreaInsetBottom="true"
			:closeOnClickOverlay="false" round="5" @close="showClose" @select="selectHandle"></u-action-sheet>
	</view>
</template>

<script>
	import setting from "@/common/js/config.js";
	import {
		updateAgent
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				baseImg: require('@/static/img/avator_img.png'),
				show: false,
				headImg: '',
				nickName: '',
				withCount: '',
				withName: ''
			}
		},
		computed: {
			languages() {
				let arr = [{
						name: this.$t('message.zhHant'),
						id: 'zh-Hant'
					},
					{
						name: this.$t('message.chinese'),
						id: 'zh-Hans'
					},
					{
						name: this.$t('message.english'),
						id: 'en'
					},
					{
						name: this.$t('message.koText'),
						id: 'ko'
					}
				]
				return arr
			},
			language() {
				let lang = this.$t('message.chinese')
				if (uni.getStorageSync('lang')) {
					let sysLan = uni.getStorageSync('lang')
					switch (sysLan) {
						case 'en':
							lang = this.$t('message.english')
							break;
						case 'zh-Hans':
							lang = this.$t('message.chinese')
							break;
						case 'zh-Hant':
							lang = this.$t('message.zhHant')
							break;
						case 'ko':
							lang = this.$t('message.koText')
							break;
					}
					// lang = uni.getStorageSync('lang') == 'en' ? this.$t('message.english') : uni.getStorageSync('lang') == 'zh-Hans' ? this.$t(
					// 	'message.chinese') : this.$t('message.zhHant')
				}
				return lang
			}
		},
		onLoad(option) {

		},
		onShow() {
			if (this.vuex_user.id) {
				this.headImg = this.vuex_user.headImg
				this.nickName = this.vuex_user.nickName
				let str = this.vuex_user.withCount
				if(str) this.withCount = str.substring(0, 4) + ' *** **** **** ' + str.slice(-4)
				this.withName = this.vuex_user.withName
			}
		},
		methods: {
			// 上传头像
			upload() {
				if (!this.vuex_user.id) {
					this.toLogin()
					return
				}
				uni.chooseImage({
					count: 1, //图片可选择数量
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。
					success: res => {
						let imgFiles = res.tempFilePaths //图片的本地文件路径列表
						this.uploadTheImg(imgFiles)
					}
				})
			},
			//上传图片
			uploadTheImg(imgFiles) {
				let that = this
				let base_url = setting.IS_DEV ? setting.DEV_URL : setting.PRO_URL
				uni.showLoading({
					mask: true,
					title: that.$t('message.loadingText')
				})
				uni.uploadFile({
					url: base_url + '/api/file/imgUpload', //后端用于处理图片并返回图片地址的接口
					filePath: imgFiles[0],
					name: 'file',
					success: res => {
						uni.hideLoading()
						let data = JSON.parse(res.data)
						console.log(data)
						if (data.code == 0) {
							// uni.showToast({
							// 	title: that.$t('message.successText'),
							// 	duration: 1500
							// })
							that.headImg = data.fileName
							that.update('headImg')
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg,
								duration: 2000
							})
							that.headImg = ''
						}
					},
					fail: (err) => {

					}
				})
			},
			// 编辑
			editHandle(type) {
				console.log(111111, type)
				if (!this.vuex_user.id) {
					this.toLogin()
					return
				}
				let str = this[type]
				console.log(str);
				if (str) this.update(type)
			},
			// 更新信息
			update(type, str) {
				let user = this.vuex_user
				let params = {
					agentId: this.vuex_user.id
				}
				let val = this[type]
				params[type] = val
				user[type] = val
				console.log(user);
				updateAgent(params).then(res => {
					this.$u.vuex('vuex_user', user)
					this.$u.toast(this.$t('message.successText'))
				})
			},
			// 跳转
			toPath(url,type) {
				if (!this.vuex_user.id) {
					this.toLogin()
					return
				}
				if(type == 'bank' && !this.vuex_user.withPwd) {
					this.$u.toast(this.$t('message.tips1'))
					return
				}
				uni.navigateTo({
					url
				})
			},
			// 选中语言
			selectHandle(e) {
				console.log(e.id, uni.getStorageSync('lang'));
				if (e.id != uni.getStorageSync('lang')) {
					let lang = e.id
					// 根据选择的语言配置
					this.setTabLanguage(lang)
					uni.setStorageSync('lang', lang)
				}

			},
			// 关闭语言设置
			showClose() {
				this.show = false
			}
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.setting-container{
		background: url('@/static/img/notice-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}
	.my-main {
		margin-top: 80rpx;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.user-ul {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
	}

	.user-li {
		min-height: 100rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.user-li+.user-li {
		border-top: 4rpx solid #F2F2F2;
	}

	.input {
		text-align: right;
		flex: 1;
		padding: 0 5rpx;
		box-sizing: border-box;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		border: 1px solid #999;
		box-sizing: border-box;
	}
</style>
