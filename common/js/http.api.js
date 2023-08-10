import http from '@/common/js/request.js';

//代理注册
export function agentRegist(params){
	return http.post('/api/agent/agentRegist', params)
}
//登录
export function login(params){
	return http.post('/api/agent/login', params)
}
//修改个人信息
export function updateAgent(params){
	return http.post('/api/agent/updateAgent', params)
}
//获取我的项目
export function getListMyProject(params){
	return http.get('/api/project/getListMyProject', params)
}
//获取项目列表
export function getListProject(params){
	return http.get('/api/project/getListProject', params)
}
//获取项目类型
export function getProjectType(params){
	return http.get('/api/project/type/list/', params,{isVerifyCode: 'no'})
}
//预约项目
export function addProject(params){
	return http.post('/api/project/addProject', params)
}
//获取佣金总金额
export function getMyTotal(params){
	return http.get('/api/project/getMyTotal', params)
}
//获取项目图片
export function getProjectPhoto(params){
	return http.get('/api/project/getProjectPhoto', params)
}
//获取项目详情
export function getProjectDetail(params){
	return http.get('/api/project/getProjectDetail', params)
}
//获取钱包详情
export function getWallet(params){
	return http.get('/api/wallet/getWallet', params)
}
//验证提现密码
export function checkWithPwd(params){
	return http.post('/api/wallet/checkWithPwd', params)
}
//提现
export function withdraw(params){
	return http.post('/api/wallet/withdraw', params)
}
//获取提现记录
export function getListWithdraw(params){
	return http.get('/api/wallet/getListWithdraw', params)
}
//发送验证码
export function sendEmail(params){
	return http.post('/api/agent/sendEmail', params)
}
//获取客服二维码列表
export function getListQrcode(params){
	return http.get('/api/set/getListQrcode', params)
}
//获取首页banner
export function getIndexBanner(params){
	return http.get('/api/set/getIndexBanner', params)
}
//获取附件列表
export function getListAtt(params){
	return http.get('/api/set/getListAtt', params)
}
//获取公告列表
export function getListNotice(params){
	return http.get('/api/set/getListNotice', params)
}
//获取公告详情
export function getNoticeDetail(params){
	return http.get('/api/set/getNoticeDetail', params)
}
//退出登录
export function logout(params){
	return http.post('/api/agent/logout', params)
}
//获取我的信息
export function getDetail(params){
	return http.post('/api/agent/getDetail', params)
}

// 获取会员信息
// export  function getVipInfo(params) {
// 	return http.post('',params)
// }