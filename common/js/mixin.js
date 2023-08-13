export const mixin = {
	methods: {
		setTabLanguage(e) {
			this.$i18n.locale = e
			uni.setTabBarItem({
				index: 0,
				text: this.$t('tabbar.home'),
			})
			uni.setTabBarItem({
				index: 1,
				text: this.$t('tabbar.project'),
			})
			uni.setTabBarItem({
				index: 2,
				text: this.$t('tabbar.chat'),
			})
			uni.setTabBarItem({
				index: 3,
				text: this.$t('tabbar.me'),
			})
		},
		toLogin() {
			let that = this
			uni.showModal({

			  content: that.$t('message.prompt'),
			  confirmText: that.$t('message.goLogin'),
				cancelText: that.$t('message.cancel'),
			  success: function(res) {
			    if (res.confirm) {
			      uni.navigateTo({
			        url: '/pages/else/login'
			      })
			    }
			  }
			})
		},
		// 返回
		back() {
			uni.navigateBack({
				delta: 1
			})
		}
	}
}