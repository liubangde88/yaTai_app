<template>
	<view class="box">
		<view class="header-box fixed">
			<image src="@/static/img/other-ban.png" class="img"></image>
			<u-navbar leftIconColor="#fff" :title="$t('message.attestation')" bgColor="rgba(255,255,255,.0)"
				:titleStyle="{color: '#fff'}" @leftClick="back"></u-navbar>
		</view>
		<view class="login-box abs">
			<view class="login-from bgWhite">
				<!-- 表单 -->
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form" :errorType="errorType"
					labelWidth="100">
					<u-form-item :label="$t('message.withMan')" prop="withMan" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.withMan" border="none" :placeholder="$t('message.withMan')"
							:placeholderStyle="{color: '#999'}" :readonly="isAttestation"></u-input>
					</u-form-item>
					<u-form-item :label="$t('message.documentType')" prop="documentType" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.documentType" border="none"
							:placeholder="$t('message.documentType')" :placeholderStyle="{color: '#999'}"
							:readonly="isAttestation"></u-input>
					</u-form-item>
					<u-form-item :label="$t('message.documentNum')" prop="documentNum" borderBottom class="form-item">
						<u-input :clearable="true" v-model="userInfo.documentNum" border="none"
							:placeholder="$t('message.documentNum')" :placeholderStyle="{color: '#999'}"
							:readonly="isAttestation"></u-input>
					</u-form-item>
				</u-form>
				<view class="btn" @click="submit" v-if="!isAttestation">
					{{$t('message.confirmBtn')}}
				</view>
				<view class="tips fs24 col9" style="margin-top: 30rpx;" v-else>
					*{{$t('message.attestationTips')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		updateAgent
	} from "@/common/js/http.api.js"
	export default {
		data() {
			return {
				errorType: 'message',
				userInfo: {
					withMan: '',
					documentType: '',
					documentNum: ''
				},
				rules: {
					withMan: {
						type: 'string',
						required: true,
						message: this.$t('message.withMan'),
						trigger: ['blur', 'change']
					},
					documentType: {
						type: 'string',
						required: true,
						message: this.$t('message.documentType'),
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
			let {vuex_user: {certType,certName,certNum,withMan}} = this
			if(certType && certName && certNum) this.isAttestation = true
			this.userInfo.withMan = certName ? certName : withMan ? withMan : ''
			this.userInfo.documentType = certType ? certType : ''
			if(this.isAttestation) {
				let num = (certNum.length - 4)/2 > 0 ? (certNum.length - 4)/2 : 2
				certNum = certNum.substring(0, num) + ' **** ' + certNum.slice(-num)
			}
			this.userInfo.documentNum = certNum ? certNum : ''
		},
		onShow() {

		},
		methods: {
			// 提交
			submit() {
				this.$refs.form.validate().then(res => {
					this.edit()
				}).catch(errors => {

				})
			},
			edit() {
				let user = this.vuex_user
				let {
					userInfo: {
						withMan,
						documentType,
						documentNum
					}
				} = this
				if (user.withMan && withMan != user.withMan) {
					uni.$u.toast(this.$t('message.attestationText'))
					return
				}
				let params = {
					agentId: user.id,
					certType: documentType,
					certName: withMan,
					certNum: documentNum
				}
				user.certType = documentType
				user.certName = withMan
				user.certNum = documentNum
				updateAgent(params).then(res => {
					this.$u.vuex('vuex_user', user)
					this.$u.toast(this.$t('message.successText'))
					this.isAttestation = true
				})
			}
		}
	}
</script>

<style src="@/common/css/other.scss" lang="scss" scoped></style>
<style scoped>
	.login-box {
		/* #ifdef APP-PLUS */
		top: 300rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 250rpx;
		/* #endif */
		left: 0;
		width: 100vw;
		padding: 0 30rpx;
		box-sizing: border-box;
		z-index: 99;
	}

	.login-from {
		width: 100%;
		height: 50vh;
		border-radius: 20rpx;
		padding: 60rpx;
		box-sizing: border-box;
	}

	.form-item {
		margin: 40rpx 0;
	}

	.btn {
		width: 70vw;
		background: #24abcc;
		margin: 100rpx auto 50rpx auto;
	}
</style>