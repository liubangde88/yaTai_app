(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-else-attestation"],{"1b76":function(t,e,o){"use strict";var a=o("36a1"),n=o.n(a);n.a},"1f05":function(t,e,o){var a=o("6f74");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=o("4f06").default;n("27e72775",a,!0,{sourceMap:!1,shadowMode:!1})},"36a1":function(t,e,o){var a=o("f577");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=o("4f06").default;n("7841779f",a,!0,{sourceMap:!1,shadowMode:!1})},"36fe":function(t,e,o){"use strict";var a=o("1f05"),n=o.n(a);n.a},"5e2b":function(t,e,o){"use strict";o("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o("25b6"),n={data:function(){return{errorType:"message",userInfo:{withMan:"",documentType:"",documentNum:""},rules:{withMan:{type:"string",required:!0,message:this.$t("message.withMan"),trigger:["blur","change"]},documentType:{type:"string",required:!0,message:this.$t("message.documentType"),trigger:["blur","change"]},documentNum:{type:"string",required:!0,message:this.$t("message.documentNum"),trigger:["blur","change"]}},isAttestation:!1}},onLoad:function(t){var e=this.vuex_user,o=e.certType,a=e.certName,n=e.certNum,r=e.withMan;o&&a&&n&&(this.isAttestation=!0),this.userInfo.withMan=a||(r||""),this.userInfo.documentType=o||"",this.userInfo.documentNum=n||""},onShow:function(){},methods:{submit:function(){var t=this;this.$refs.form.validate().then((function(e){t.edit()})).catch((function(t){}))},edit:function(){var t=this,e=this.vuex_user,o=this.userInfo,n=o.withMan,r=o.documentType,i=o.documentNum;if(e.withMan&&n!=e.withMan)uni.$u.toast(this.$t("message.attestationText"));else{var s={agentId:e.id,certType:r,certName:n,certNum:i};e.certType=r,e.certName=n,e.certNum=i,(0,a.updateAgent)(s).then((function(o){t.$u.vuex("vuex_user",e),t.$u.toast(t.$t("message.successText")),t.isAttestation=!0}))}}}};e.default=n},"6e96":function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return a}));var a={uNavbar:o("d3f8").default,uForm:o("9040").default,uFormItem:o("f1c9").default,uInput:o("2dfa").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"header-box fixed"},[a("v-uni-image",{staticClass:"img",attrs:{src:o("95b7")}}),a("u-navbar",{attrs:{leftIconColor:"#fff",title:t.$t("message.attestation"),bgColor:"rgba(255,255,255,.0)",titleStyle:{color:"#fff"}},on:{leftClick:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"login-box abs"},[a("v-uni-view",{staticClass:"login-from bgWhite"},[a("u-form",{ref:"form",attrs:{labelPosition:"left",model:t.userInfo,rules:t.rules,errorType:t.errorType,labelWidth:"100"}},[a("u-form-item",{staticClass:"form-item",attrs:{label:t.$t("message.withMan"),prop:"withMan",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.withMan"),placeholderStyle:{color:"#999"},readonly:t.isAttestation},model:{value:t.userInfo.withMan,callback:function(e){t.$set(t.userInfo,"withMan",e)},expression:"userInfo.withMan"}})],1),a("u-form-item",{staticClass:"form-item",attrs:{label:t.$t("message.documentType"),prop:"documentType",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.documentType"),placeholderStyle:{color:"#999"},readonly:t.isAttestation},model:{value:t.userInfo.documentType,callback:function(e){t.$set(t.userInfo,"documentType",e)},expression:"userInfo.documentType"}})],1),a("u-form-item",{staticClass:"form-item",attrs:{label:t.$t("message.documentNum"),prop:"documentNum",borderBottom:!0}},[a("u-input",{attrs:{clearable:!0,border:"none",placeholder:t.$t("message.documentNum"),placeholderStyle:{color:"#999"},readonly:t.isAttestation},model:{value:t.userInfo.documentNum,callback:function(e){t.$set(t.userInfo,"documentNum",e)},expression:"userInfo.documentNum"}})],1)],1),t.isAttestation?a("v-uni-view",{staticClass:"tips fs24 col9",staticStyle:{"margin-top":"30rpx"}},[t._v("*"+t._s(t.$t("message.attestationTips")))]):a("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v(t._s(t.$t("message.confirmBtn")))])],1)],1)],1)},r=[]},"6f74":function(t,e,o){var a=o("24fb");e=a(!1),e.push([t.i,".login-box[data-v-979e48d4]{\n\n\ntop:%?250?%;\nleft:0;width:100vw;padding:0 %?30?%;box-sizing:border-box;z-index:99}.login-from[data-v-979e48d4]{width:100%;height:50vh;border-radius:%?20?%;padding:%?60?%;box-sizing:border-box}.form-item[data-v-979e48d4]{margin:%?40?% 0}.btn[data-v-979e48d4]{width:70vw;background:#24abcc;margin:%?100?% auto %?50?% auto}",""]),t.exports=e},"7bf5":function(t,e,o){"use strict";o.r(e);var a=o("6e96"),n=o("d478");for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o("1b76"),o("36fe");var i=o("f0c5"),s=Object(i["a"])(n["default"],a["b"],a["c"],!1,null,"979e48d4",null,!1,a["a"],void 0);e["default"]=s.exports},"95b7":function(t,e,o){t.exports=o.p+"static/img/other-ban.38d2766c.png"},d478:function(t,e,o){"use strict";o.r(e);var a=o("5e2b"),n=o.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},f577:function(t,e,o){var a=o("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.header-box[data-v-979e48d4]{top:0;left:0;width:100vw;z-index:99;background-color:#edf7f9;height:%?210?%}.header-ban[data-v-979e48d4]{top:0;left:0;z-index:9}.box-r[data-v-979e48d4]{padding:%?20?% %?20?%;box-sizing:border-box;border-bottom:%?4?% solid #e3f1f4}.top-r[data-v-979e48d4]{border-top-left-radius:%?20?%;border-top-right-radius:%?20?%}.bottom-r[data-v-979e48d4]{border-bottom-left-radius:%?20?%;border-bottom-right-radius:%?20?%}.project-main[data-v-979e48d4]{width:100vw;padding:0 %?30?%;box-sizing:border-box}.project-box[data-v-979e48d4]{width:100%;padding-bottom:%?30?%}',""]),t.exports=e}}]);