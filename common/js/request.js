/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import setting from "./config.js";
let baseURL = ''
//#ifdef APP-PLUS
baseURL = setting.IS_DEV ? setting.DEV_URL : setting.PRO_URL
//#endif
//#ifdef H5
let str = window.location.href.split("h5")[0] + 'beauty-manager'
baseURL = setting.IS_DEV ? setting.DEV_URL : str
//#endif
 
console.log(baseURL)
export default {
	config: {
		baseURL,
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},
		custom: {
			// 请求接口展示Loading
			ShowLoading: true,
			// Loading中是否遮罩
			LoadingMask: true,
			// Loading文本
			LoadingText:setting.LOADING_TEXT,
		},
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
		timeout :setting.TIMEOUT,
		// #endif
		// #ifdef APP-PLUS
		// 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
		sslVerify : true,
		// #endif
		// #ifdef H5
		// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
		withCredentials : false,
		// #endif
		// #ifdef APP-PLUS
		// DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
		firstIpv4 : false, 
		// #endif
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	 request(options) {
		 //请求前处理，相当于请求拦截
		 let config=Object.assign(this.config,options);//合并全局配置及局部配置项
		  //加载提示
		 if(config.custom.ShowLoading){
		 	uni.showLoading({
		 	    title: config.custom.LoadingText || '正在加载',
		 		mask: config.custom.LoadingMask || false
		 	});
		 }
		 config.url = config.baseURL + config.url
		 config.data = config.data || {}
		 
		 //如果token不为空则请求时携带token
		 // let _token =uni.getStorageSync('token') || ''
		 // if(_token!=''&&_token!=undefined){
		 // 	config.data['token'] = _token
		 // }
		 config.data['timestamp'] = Math.round(new Date() / 1000);//时间戳;
		 
		 //是否开启请求日志
		 if(setting.REQUEST_LOG){
		 	_reqlog(config)
		 }
		 return new Promise((resolve, reject) => { 
			uni.request(config).then(data=>{
				// data为一个数组
				// 数组第一项为错误信息 即为 fail 回调
				// 第二项为返回数据
				var [err, res] = data;
				
				//结束loading提示
				if(config.custom.ShowLoading){
					uni.hideLoading();
				}
				//是否开启响应日志
				if(setting.REQUEST_LOG){
					_reslog(res)
				}
				//如果第一项不为空，则表示请求失败fail
				if(err!=null&&err!=undefined&&err!=''){
					//错误处理
					console.log(err)
					reject(err)
				}else{
					console.log(res.statusCode);
					//请求成功，状态码200
					if (res.statusCode == 200) {
						let result = res.data;
						let isVerifyCode = options.isVerifyCode ? false : true
						//console.log(result);
						// if 与后台规定code代码进行处理数据返回
						if (result.code == 0 || !isVerifyCode) {
							resolve(result)
						} else {
							uni.showToast({
								title:result.msg,
								icon:'none'
							})
						}
					}else{
						//状态码不是200
						uni.showToast({
							title:res.statusCode,
							icon:'none'
						});
					}
				}
			});
		 })
	 },
}
/**
 * 请求接口日志记录
 */ 
//请求日志
function _reqlog(req) {
	console.log("请求地址："+req.url)
	console.log("请求参数："+JSON.stringify(req.data))
}
//响应日志
function _reslog(res) {
	 console.log("响应结果：" + JSON.stringify(res))
}
