(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-myBank-index"],{"14f9":function(t,e,a){var n=a("2802");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("4f06").default;o("8b18478e",n,!0,{sourceMap:!1,shadowMode:!1})},"15a3":function(t,e,a){var n=a("6801");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("4f06").default;o("13761e32",n,!0,{sourceMap:!1,shadowMode:!1})},"1de5":function(t,e,a){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"1f31":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var n={uNavbar:a("d9e6").default,uForm:a("9884").default,uFormItem:a("aecd").default,uInput:a("d0c1").default},o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"header-box fixed"},[a("u-navbar",{attrs:{bgColor:"rgba(255,255,255)",title:t.$t("message.bankCenter")},on:{leftClick:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}})],1),t.vuex_user.withMan&&t.vuex_user.withName&&t.vuex_user.withCount&&t.vuex_user.withAddress?a("v-uni-view",{staticClass:"login-box"},[a("v-uni-view",{staticClass:"bank-box"},[a("v-uni-view",{staticClass:"flex flex-sb fs30 colf",staticStyle:{"margin-bottom":"10rpx"}},[a("v-uni-text",[t._v(t._s(t.vuex_user.withName))]),a("v-uni-text",[t._v(t._s(t.bankNo))])],1),a("v-uni-view",{staticClass:"fs28 colf"},[t._v(t._s(t.vuex_user.withAddress))])],1),a("v-uni-view",{staticClass:"banl-tips fs24 col9",staticStyle:{"margin-top":"50rpx"}},[t._v("*"+t._s(t.$t("message.rebind"))+", "+t._s(t.$t("message.contact")))])],1):a("v-uni-view",{staticClass:"login-box"},[a("v-uni-view",{staticClass:"title"},[t._v(t._s(t.$t("message.addBank")))]),a("v-uni-view",{staticClass:"login-from bgWhite"},[a("u-form",{ref:"form",attrs:{model:t.userInfo,rules:t.rules,errorType:t.errorType}},[a("u-form-item",{staticClass:"form-item",attrs:{prop:"withMan",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.withMan"),placeholderStyle:{color:"#999"}},model:{value:t.userInfo.withMan,callback:function(e){t.$set(t.userInfo,"withMan",e)},expression:"userInfo.withMan"}})],1),a("u-form-item",{staticClass:"form-item",attrs:{prop:"withName",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.withName"),placeholderStyle:{color:"#999"}},model:{value:t.userInfo.withName,callback:function(e){t.$set(t.userInfo,"withName",e)},expression:"userInfo.withName"}})],1),a("u-form-item",{staticClass:"form-item",attrs:{prop:"openBank",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.openBank"),placeholderStyle:{color:"#999"}},model:{value:t.userInfo.openBank,callback:function(e){t.$set(t.userInfo,"openBank",e)},expression:"userInfo.openBank"}})],1),a("u-form-item",{staticClass:"form-item",attrs:{prop:"withCount",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.withCount"),placeholderStyle:{color:"#999"}},model:{value:t.userInfo.withCount,callback:function(e){t.$set(t.userInfo,"withCount",e)},expression:"userInfo.withCount"}})],1),a("u-form-item",{staticClass:"form-item",attrs:{prop:"count",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.bankCount"),placeholderStyle:{color:"#999"}},model:{value:t.userInfo.count,callback:function(e){t.$set(t.userInfo,"count",e)},expression:"userInfo.count"}})],1)],1),a("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v(t._s(t.$t("message.confirmBtn")))])],1)],1)],1)},i=[]},2802:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.header-box[data-v-201b4f20]{top:0;left:0;width:100vw;z-index:99;height:%?210?%}.header-ban[data-v-201b4f20]{top:0;left:0;z-index:9}.box-r[data-v-201b4f20]{padding:%?20?% %?20?%;box-sizing:border-box}.top-r[data-v-201b4f20]{border-top-left-radius:%?20?%;border-top-right-radius:%?20?%}.bottom-r[data-v-201b4f20]{border-bottom-left-radius:%?20?%;border-bottom-right-radius:%?20?%}.project-main[data-v-201b4f20]{width:100vw;padding:0 %?30?%;box-sizing:border-box}.project-box[data-v-201b4f20]{width:100%;padding-bottom:%?30?%}',""]),t.exports=e},"2bcf":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("fb6a");var n=a("547e"),o={data:function(){return{errorType:"message",userInfo:{withMan:"",withName:"",openBank:"",withCount:"",count:"",withPwd:""},rules:{withMan:{type:"string",required:!0,message:this.$t("message.withMan"),trigger:["blur","change"]},withName:{type:"string",required:!0,message:this.$t("message.withName"),trigger:["blur","change"]},openBank:{type:"string",required:!0,message:this.$t("message.openBank"),trigger:["blur","change"]},withCount:{type:"string",required:!0,message:this.$t("message.withCount"),trigger:["blur","change"]},count:{type:"string",required:!0,message:this.$t("message.bankCount"),trigger:["blur","change"]},withPwd:{type:"string",required:!0,message:this.$t("message.withPwd"),trigger:["blur","change"]}}}},computed:{bankNo:function(){var t=this.vuex_user.withCount;return t?t.substring(0,4)+" *** **** **** "+t.slice(-4):""}},onLoad:function(t){this.vuex_user.id&&(this.userInfo.withMan=this.vuex_user.withMan||"",this.userInfo.withName=this.vuex_user.withName||"",this.userInfo.openBank=this.vuex_user.withAddress||"",this.userInfo.withCount=this.vuex_user.withCount||"",this.userInfo.count=this.vuex_user.withCount||"")},onShow:function(){},methods:{submit:function(){var t=this;this.$refs.form.validate().then((function(e){t.edit()})).catch((function(t){}))},edit:function(){var t=this,e=this.userInfo,a=e.withName,o=e.openBank,i=e.withCount,r=e.count,s=(e.withPwd,e.withMan),u=e.certName,d=this.vuex_user;if(u&&s!=u)uni.$u.toast(this.$t("message.attestationText"));else if(i==r){var c={agentId:d.id,withMan:s,withCount:i,withName:a,withAddress:o};d.withCount=i,d.withName=a,d.withAddress=o,d.withMan=s,console.log(c),(0,n.updateAgent)(c).then((function(e){t.$u.vuex("vuex_user",d),t.$u.toast(t.$t("message.successText"))}))}else uni.$u.toast(this.$t("message.twoPwd"))},update:function(t){var e=this,a=this.vuex_user,o={agentId:this.vuex_user.id,withCount:t};a.withCount=t,(0,n.updateAgent)(o).then((function(t){e.$u.vuex("vuex_user",a),e.$u.toast(e.$t("message.successText")),setTimeout((function(){uni.navigateBack({delta:1})}),1e3)}))}}};e.default=o},"4aa3":function(t,e,a){"use strict";var n=a("14f9"),o=a.n(n);o.a},"4bfd":function(t,e,a){"use strict";a.r(e);var n=a("1f31"),o=a("ef44");for(var i in o)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(i);a("4aa3"),a("b660");var r=a("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"201b4f20",null,!1,n["a"],void 0);e["default"]=s.exports},6801:function(t,e,a){var n=a("24fb"),o=a("1de5"),i=a("77a7d");e=n(!1);var r=o(i);e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.box[data-v-201b4f20] .u-line-1.u-navbar__content__title{font-size:1rem;line-height:3rem;color:#fff}.box[data-v-201b4f20] .u-navbar--fixed > .u-navbar__content{background:url('+r+");padding-top:%?10?%;padding-bottom:%?10?%}.box[data-v-201b4f20] .u-navbar--fixed > .u-navbar__content .u-navbar__content__left .u-icon.u-icon--right .u-icon__icon.uicon-arrow-left{color:#fff}.box[data-v-201b4f20] .u-navbar--fixed{height:100%}.box .header-box[data-v-201b4f20]{max-height:%?120?%}.box .header-box .u-navbar[data-v-201b4f20]{height:100%}.login-box[data-v-201b4f20]{top:%?250?%;left:0;width:100vw;padding:0 %?30?%;box-sizing:border-box;z-index:99;margin-top:18%}.login-box .title[data-v-201b4f20]{font-family:Open Sans;font-size:%?40?%;font-weight:600;color:#333;margin-top:%?150?%;margin-bottom:%?32?%}.bank-box[data-v-201b4f20]{width:100%;min-height:%?150?%;border-radius:%?20?%;padding:%?30?%;box-sizing:border-box;background:#e05a5a}.login-from[data-v-201b4f20]{border-radius:%?16?%;padding:%?20?%;box-sizing:border-box}.form-item[data-v-201b4f20]{margin:%?40?% 0}.btn[data-v-201b4f20]{width:70vw;background:#86784b;margin:%?100?% auto %?50?% auto;border-radius:%?16?%}",""]),t.exports=e},"77a7d":function(t,e,a){t.exports=a.p+"static/img/other-ban.0c7ce6a3.jpg"},b660:function(t,e,a){"use strict";var n=a("15a3"),o=a.n(n);o.a},ef44:function(t,e,a){"use strict";a.r(e);var n=a("2bcf"),o=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a}}]);