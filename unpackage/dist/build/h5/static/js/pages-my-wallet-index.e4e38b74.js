(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-wallet-index"],{"2c09":function(t,e,a){"use strict";a.r(e);var n=a("db33"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"32a0":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.header-box[data-v-ec04a986]{top:0;left:0;width:100vw;z-index:99;background-color:#edf7f9;height:%?210?%}.header-ban[data-v-ec04a986]{top:0;left:0;z-index:9}.box-r[data-v-ec04a986]{padding:%?20?% %?20?%;box-sizing:border-box;border-bottom:%?4?% solid #e3f1f4}.top-r[data-v-ec04a986]{border-top-left-radius:%?20?%;border-top-right-radius:%?20?%}.bottom-r[data-v-ec04a986]{border-bottom-left-radius:%?20?%;border-bottom-right-radius:%?20?%}.project-main[data-v-ec04a986]{width:100vw;padding:0 %?30?%;box-sizing:border-box}.project-box[data-v-ec04a986]{width:100%;padding-bottom:%?30?%}',""]),t.exports=e},"38c0":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var n={uNavbar:a("d3f8").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"box"},[n("v-uni-view",{staticClass:"header-box fixed"},[n("v-uni-image",{staticClass:"header-ban img",attrs:{src:a("c1bf")}}),n("u-navbar",{attrs:{leftIconColor:"#fff",title:t.$t("message.wallet"),bgColor:"rgba(255,255,255,.0)",titleStyle:{color:"#fff"}},on:{leftClick:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"wallet-main flexColumn"},[n("v-uni-image",{staticClass:"wallet-img",attrs:{src:a("c910"),mode:""}}),n("v-uni-text",{staticClass:"fs30 col1"},[t._v(t._s(t.$t("message.balance")))]),n("v-uni-text",{staticClass:"fs30 col1"},[t._v("￥"),n("span",{staticClass:"bold",staticStyle:{"font-size":"70rpx",margin:"20rpx 0"}},[t._v(t._s(t.info.supMoney))]),t._v("（HK$）")]),n("v-uni-text",{staticClass:"fs30",staticStyle:{color:"red","margin-bottom":"20rpx"}},[t._v(t._s(t.$t("message.freeze"))+": "+t._s(t.info.freezeMoney)+"（HK$）")]),n("v-uni-view",{staticClass:"btn cash",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPath("/pages/my/cash/index?money="+t.info.supMoney,"cash")}}},[t._v(t._s(t.$t("message.cash")))]),n("v-uni-view",{staticClass:"btn bank",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPath("/pages/my/cashRecord/index","record")}}},[t._v(t._s(t.$t("message.cashRecord")))]),n("v-uni-view",{staticClass:"btn bank",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPath("/pages/my/myBank/index","bank")}}},[t._v(t._s(t.$t("message.bank")))])],1)],1)},s=[]},"3e1e":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.header-box[data-v-ec04a986]{height:%?210?%}.wallet-main[data-v-ec04a986]{margin-top:%?310?%;width:100vw;height:calc(100vh - %?400?%);align-items:center}.wallet-img[data-v-ec04a986]{width:%?200?%;height:%?200?%;margin-bottom:%?50?%}.btn[data-v-ec04a986]{width:70vw;margin-top:%?50?%}.cash[data-v-ec04a986]{background:#55c4d8}.bank[data-v-ec04a986]{background:#fff;color:#55c4d8}',""]),t.exports=e},"53a2":function(t,e,a){"use strict";var n=a("97d2"),i=a.n(n);i.a},"97d2":function(t,e,a){var n=a("32a0");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("773ad5f6",n,!0,{sourceMap:!1,shadowMode:!1})},b70f:function(t,e,a){"use strict";var n=a("ee1c"),i=a.n(n);i.a},c1bf:function(t,e,a){t.exports=a.p+"static/img/agent-ban.60e5c537.png"},c910:function(t,e,a){t.exports=a.p+"static/img/wallet.f97d6836.png"},cb44:function(t,e,a){"use strict";a.r(e);var n=a("38c0"),i=a("2c09");for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("53a2"),a("b70f");var o=a("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"ec04a986",null,!1,n["a"],void 0);e["default"]=c.exports},db33:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("25b6"),i={data:function(){return{info:{}}},onLoad:function(t){},onShow:function(){this.getWallet()},onPullDownRefresh:function(){this.getWallet(),setTimeout((function(){uni.stopPullDownRefresh()}),1e3)},methods:{getWallet:function(){var t=this,e={agentId:this.vuex_user.id};(0,n.getWallet)(e).then((function(e){t.info=e.wallet}))},toPath:function(t,e){var a=this.vuex_user,n=a.withCount,i=a.withName,s=a.withPwd,o=a.withAddress,c=a.withMan,r=a.certType,l=a.certName,d=a.certNum;if("cash"!=e&&"bank"!=e||r||l||d)if("cash"!=e||c&&n&&o&&i&&s)uni.navigateTo({url:t});else{var u="",f="";c&&n&&i&&o||(u=this.$t("message.tips4"),f="/pages/my/myBank/index"),s||(u=this.$t("message.tips1"),f="/pages/else/setting"),uni.showModal({title:this.$t("message.promptText"),content:u,confirmText:this.$t("message.goSet"),cancelText:this.$t("message.cancel"),success:function(t){t.confirm&&uni.navigateTo({url:f})}})}else uni.showModal({title:this.$t("message.promptText"),content:this.$t("message.attestationTips1"),confirmText:this.$t("message.goSet"),cancelText:this.$t("message.cancel"),success:function(t){t.confirm&&uni.navigateTo({url:"/pages/else/attestation"})}})}}};e.default=i},ee1c:function(t,e,a){var n=a("3e1e");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("2fc4eda0",n,!0,{sourceMap:!1,shadowMode:!1})}}]);