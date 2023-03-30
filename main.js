// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import store from '@/store'
const vuexStore = require('@/store/$u.mixin.js') // 引入uView提供的对vuex的简写法文件
const {mixin} = require('@/common/js/mixin.js') //

// 引入uview-ui
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.mixin(vuexStore)
Vue.mixin(mixin)

Vue.config.productionTip = false

App.mpType = 'app'

//多语言引入
import VueI18n from 'vue-i18n'
import zhHans from '@/common/js/zh-Hans.js' //简体中文
import zhHant from '@/common/js/zh-Hant.js' //繁体中文
import enUS from '@/common/js/en-US.js' //英文
import ko from '@/common/js/ko.js' //韩语
Vue.use(VueI18n)
const locales = {
	'en-US': enUS,
	'zh-Hans': zhHans,
	'zh-Hant': zhHant,
	'ko': ko
};
const i18n = new VueI18n({
	silentTranslationWarn: true,
	locale: uni.getStorageSync('lang') ? uni.getStorageSync('lang') : 'zh-Hant', //当前语言中文;
	messages: locales
})

const app = new Vue({
	store,
	i18n,
	...App
})

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
