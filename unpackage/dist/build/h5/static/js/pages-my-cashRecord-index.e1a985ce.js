(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-cashRecord-index"],{"0cda":function(t,e,i){"use strict";var a=i("c6fe"),n=i.n(a);n.a},"1c18":function(t,e,i){"use strict";i.r(e);var a=i("2cda"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},2054:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("d81d"),i("fb6a"),i("99af");var a=i("547e"),n={data:function(){return{status:"nomore",list:[],page:1,pagesize:10,nextPage:!1}},onLoad:function(t){this.getList()},onShow:function(){},onReachBottom:function(){this.pagesize,this.page;var t=this.nextPage;t&&(this.page+=1,this.getList())},methods:{getList:function(){var t=this,e=this.page,i=this.pagesize,n={agentId:this.vuex_user.id,page:e,pagesize:i};(0,a.getListWithdraw)(n).then((function(e){1==t.page&&uni.pageScrollTo({scrollTop:0}),e.ls.length>0&&e.ls.map((function(t){t.withCount="**** "+t.withCount.slice(-4)})),t.list=t.list.concat(e.ls),t.nextPage=e.ls.length==i}))}}};e.default=n},"2cda":function(t,e,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("c975");var n=a(i("65aa")),o={name:"u-empty",mixins:[uni.$u.mpMixin,uni.$u.mixin,n.default],data:function(){return{icons:{car:"购物车为空",page:"页面不存在",search:"没有搜索结果",address:"没有收货地址",wifi:"没有WiFi",order:"订单为空",coupon:"没有优惠券",favor:"暂无收藏",permission:"无权限",history:"无历史记录",news:"无新闻列表",message:"消息列表为空",list:"列表为空",data:"数据为空",comment:"暂无评论"}}},computed:{emptyStyle:function(){var t={};return t.marginTop=uni.$u.addUnit(this.marginTop),uni.$u.deepMerge(uni.$u.addStyle(this.customStyle),t)},textStyle:function(){var t={};return t.color=this.textColor,t.fontSize=uni.$u.addUnit(this.textSize),t},isSrc:function(){return this.icon.indexOf("/")>=0}}};e.default=o},"31d4":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uNavbar:i("d9e6").default,uLoadmore:i("7d17").default,uEmpty:i("4e82f").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"header-box fixed"},[a("v-uni-image",{staticClass:"header-ban img",attrs:{src:i("77a7d")}}),a("u-navbar",{attrs:{leftIconColor:"#fff",title:t.$t("message.cashRecord"),bgColor:"rgba(255,255,255,.0)",titleStyle:{color:"#fff"}},on:{leftClick:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}})],1),t.list.length>0?a("v-uni-view",{staticClass:"record-ul"},[t._l(t.list,(function(e,i){return a("v-uni-view",{key:i,staticClass:"record-li bgWhite flex"},[a("v-uni-view",{staticClass:"cash-icon flex fs30 colf"},[t._v(t._s(t.$t("message.cash")))]),a("v-uni-view",{staticClass:"li-right flex-1 flexColumn flex-sa"},[a("v-uni-view",{staticClass:"info flex flex-sb"},[a("v-uni-view",{staticClass:"fs32 bold flex-1"},[t._v("￥"),a("span",{staticStyle:{"font-size":"40rpx"}},[t._v(t._s(e.withMoney))]),t._v("（HK$）")]),a("v-uni-view",{staticClass:"fs24 col1",staticStyle:{width:"250rpx","text-align":"right"}},[t._v(t._s(t.$t("message.transfer"))+t._s(t.$t("message.bank"))+" "+t._s(e.withCount))])],1),a("v-uni-view",{staticClass:"info flex flex-sb fs24 col9"},[a("v-uni-view",{staticClass:"flex-1"},[t._v(t._s(t.$t("message.balanceText"))+": ￥"+t._s(e.supMoney)+"（HK$）")]),a("v-uni-view",{staticStyle:{width:"250rpx","text-align":"right"}},[t._v(t._s(e.createTime))])],1)],1)],1)})),a("u-loadmore",{attrs:{status:t.status,loadmoreText:t.$t("message.loadmoreText"),loadingText:t.$t("message.loadingText"),nomoreText:t.$t("message.nomoreText")}})],2):a("v-uni-view",{staticClass:"record-ul flex flex-cen",staticStyle:{height:"500rpx"}},[a("u-empty",{attrs:{mode:"list",text:"暂无记录~"}})],1)],1)},o=[]},"4b07":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.box[data-v-621df976] .u-line-1.u-navbar__content__title{font-size:1rem;line-height:3rem}.record-ul[data-v-621df976]{width:100vw;margin-top:%?210?%;padding:%?20?% %?30?%;box-sizing:border-box}.record-li[data-v-621df976]{width:100%;min-height:%?140?%;border-radius:%?20?%;padding:%?20?%;box-sizing:border-box;margin-bottom:%?20?%}.cash-icon[data-v-621df976]{width:%?100?%;height:%?100?%;border-radius:%?50?%;justify-content:center;background:#a19878;margin-right:%?30?%}.li-right[data-v-621df976]{height:100%}.info[data-v-621df976]{width:100%;line-height:2rem}.fs32[data-v-621df976]{font-size:%?20?%!important}',""]),t.exports=e},"4e82f":function(t,e,i){"use strict";i.r(e);var a=i("5a55"),n=i("1c18");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("e6c9");var r=i("f0c5"),s=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"6fa087a0",null,!1,a["a"],void 0);e["default"]=s.exports},"5a55":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uIcon:i("793b").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("v-uni-view",{staticClass:"u-empty",style:[t.emptyStyle]},[t.isSrc?i("v-uni-image",{style:{width:t.$u.addUnit(t.width),height:t.$u.addUnit(t.height)},attrs:{src:t.icon,mode:"widthFix"}}):i("u-icon",{attrs:{name:"message"===t.mode?"chat":"empty-"+t.mode,size:t.iconSize,color:t.iconColor,"margin-top":"14"}}),i("v-uni-text",{staticClass:"u-empty__text",style:[t.textStyle]},[t._v(t._s(t.text?t.text:t.icons[t.mode]))]),t.$slots.default||t.$slots.$default?i("v-uni-view",{staticClass:"u-empty__wrap"},[t._t("default")],2):t._e()],1):t._e()},o=[]},6536:function(t,e,i){"use strict";i.r(e);var a=i("2054"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"65aa":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3");var a={props:{icon:{type:String,default:uni.$u.props.empty.icon},text:{type:String,default:uni.$u.props.empty.text},textColor:{type:String,default:uni.$u.props.empty.textColor},textSize:{type:[String,Number],default:uni.$u.props.empty.textSize},iconColor:{type:String,default:uni.$u.props.empty.iconColor},iconSize:{type:[String,Number],default:uni.$u.props.empty.iconSize},mode:{type:String,default:uni.$u.props.empty.mode},width:{type:[String,Number],default:uni.$u.props.empty.width},height:{type:[String,Number],default:uni.$u.props.empty.height},show:{type:Boolean,default:uni.$u.props.empty.show},marginTop:{type:[String,Number],default:uni.$u.props.empty.marginTop}}};e.default=a},"77a7d":function(t,e,i){t.exports=i.p+"static/img/other-ban.0c7ce6a3.jpg"},"82c1":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */uni-view[data-v-6fa087a0], uni-scroll-view[data-v-6fa087a0], uni-swiper-item[data-v-6fa087a0]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-empty[data-v-6fa087a0]{display:flex;flex-direction:row;flex-direction:column;justify-content:center;align-items:center}.u-empty__text[data-v-6fa087a0]{display:flex;flex-direction:row;justify-content:center;align-items:center;margin-top:%?20?%}.u-slot-wrap[data-v-6fa087a0]{display:flex;flex-direction:row;justify-content:center;align-items:center;margin-top:%?20?%}',""]),t.exports=e},ba53:function(t,e,i){"use strict";var a=i("be18"),n=i.n(a);n.a},be18:function(t,e,i){var a=i("dbb3");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("09ed22fb",a,!0,{sourceMap:!1,shadowMode:!1})},be87:function(t,e,i){"use strict";i.r(e);var a=i("31d4"),n=i("6536");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("ba53"),i("0cda");var r=i("f0c5"),s=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"621df976",null,!1,a["a"],void 0);e["default"]=s.exports},c6fe:function(t,e,i){var a=i("4b07");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("e3943ff6",a,!0,{sourceMap:!1,shadowMode:!1})},d3b1:function(t,e,i){var a=i("82c1");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("422d2824",a,!0,{sourceMap:!1,shadowMode:!1})},dbb3:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.header-box[data-v-621df976]{top:0;left:0;width:100vw;z-index:99;height:%?210?%}.header-ban[data-v-621df976]{top:0;left:0;z-index:9}.box-r[data-v-621df976]{padding:%?20?% %?20?%;box-sizing:border-box}.top-r[data-v-621df976]{border-top-left-radius:%?20?%;border-top-right-radius:%?20?%}.bottom-r[data-v-621df976]{border-bottom-left-radius:%?20?%;border-bottom-right-radius:%?20?%}.project-main[data-v-621df976]{width:100vw;padding:0 %?30?%;box-sizing:border-box}.project-box[data-v-621df976]{width:100%;padding-bottom:%?30?%}',""]),t.exports=e},e6c9:function(t,e,i){"use strict";var a=i("d3b1"),n=i.n(a);n.a}}]);