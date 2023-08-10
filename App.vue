<script>
	export default {
		onLaunch: function() {
			// 获取系统语言，并判断本地储存是否设置语言，若本地设置了就使用本地设置的语言
			let sys = uni.getSystemInfoSync().language
			console.log(sys);
			let sysLanguage = 'zh-Hant'
			if(sys.indexOf('en') != '-1') sysLanguage = 'en'
			if(sys.indexOf('zh-Hans') != '-1' || sys.indexOf('zh-CN') != '-1') sysLanguage = 'zh-Hans'
			if(sys.indexOf('zh-Hant') != '-1' || sys.indexOf('zh-HK') != '-1') sysLanguage = 'zh-Hans'
			if(sys.indexOf('ko') != '-1') sysLanguage = 'ko'
			let language = uni.getStorageSync('lang') ? uni.getStorageSync('lang') : sysLanguage
			
			// 根据选择的语言配置
			this.setTabLanguage(language)
			
			// uni.showToast({
			// 	title: sysLanguage,
			// 	icon: 'none'
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import "@/uni_modules/uview-ui/index.scss";

	@import '@/common/css/base.css';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f9f9f9;
		width: 100vw;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	.u-form-item__body__right__message{
		margin-left: 0 !important;
	}
	.home-search{
		.u-search{
			.u-search__content{
				border-radius: 8px !important;
				background-color: #fff !important;
				input{
					background-color: #fff !important;
					&::placeholder, &::-webkit-input-placeholder{
					color: #B8BBC3 !important;
					}
				}
			}
		}
	}
	.product-search{
		.u-search{
			.u-search__content{
				border-radius: 32px !important;
				background-color: #fff !important;
				box-shadow: 0px 0px 5px 0px #E8E1D9 inset;
				input{
					background-color: transparent !important;
					&::placeholder, &::-webkit-input-placeholder{
					color: #B8BBC3 !important;
					}
				}
			}
		}
	}
	.common-close{
		width: 40rpx;
		height: 40rpx;
		position: fixed;
		top: 40rpx;
		left: 40rpx;
	}
</style>
