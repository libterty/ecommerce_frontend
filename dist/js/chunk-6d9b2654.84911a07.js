(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d9b2654"],{e04c:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-nav",{attrs:{tabs:"",justified:""}},t._l(t.tabs,(function(e){return s("b-nav-item",{key:e.id,attrs:{href:e.path}},[t._v(" "+t._s(e.title)+" ")])})),1)},n=[],r=s("e1bd"),i=s.n(r),c={data:function(){return{tabs:[{id:i()(5),title:"建立新的產品",path:"/admin/products/create"},{id:i()(5),title:"產品資訊",path:"/admin/products"},{id:i()(5),title:"折價卷資訊",path:"/admin/coupons"},{id:i()(5),title:"銷售資訊",path:"/admin/payments"},{id:i()(5),title:"呆帳管理",path:"/admin/orders"},{id:i()(5),title:"系統日誌",path:"/admin/logs"},{id:i()(5),title:"前往前台",path:"/"}]}}},o=c,l=s("2877"),d=Object(l["a"])(o,a,n,!1,null,null,null);e["a"]=d.exports},e1bd:function(t,e,s){var a=self.crypto||self.msCrypto,n="QLUint8ARdomValuesObj0h6345-79BCrypgJzHKTNYDSMkXPZ_FfG1WcqvwxEI2";t.exports=function(t){t=t||21;var e="",s=a.getRandomValues(new Uint8Array(t));while(t--)e+=n[63&s[t]];return e}},ec5c:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{staticClass:"py-5"},[s("h3",[t._v("呆帳管理")]),s("AdminNav"),t.isShow?s("b-container",{staticClass:"py-5"},[s("AdminOrdersDetail",{attrs:{initOrders:t.initOrders},on:{"after-submit-notify":t.afterSubmitNotify}})],1):t._e()],1)},n=[],r=(s("d3b7"),s("96cf"),s("e04c")),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-table-simple",{attrs:{hover:"",small:"","caption-top":"",responsive:""}},[s("b-thead",{attrs:{"head-variant":"dark"}},[s("b-tr",[s("b-th",{attrs:{colspan:"6"}},[t._v("基本資訊")]),s("b-th",{attrs:{colspan:"5"}},[t._v("使用者資訊")])],1),s("b-tr",[s("b-th",{attrs:{colspan:"1"}},[t._v("#")]),s("b-th",{attrs:{colspan:"1"}},[t._v("sn單號")]),s("b-th",{attrs:{colspan:"1"}},[t._v("訂單狀態")]),s("b-th",{attrs:{colspan:"1"}},[t._v("物流狀態")]),s("b-th",{attrs:{colspan:"1"}},[t._v("交易狀態")]),s("b-th",{attrs:{colspan:"1"}},[t._v("交易金額")]),s("b-th",{attrs:{colspan:"1"}},[t._v("使用者名稱")]),s("b-th",{attrs:{colspan:"1"}},[t._v("聯絡信箱")]),s("b-th",{attrs:{colspan:"1"}},[t._v("聯絡地址")]),s("b-th",{attrs:{colspan:"1"}},[t._v("聯絡電話")]),s("b-th",{attrs:{colspan:"1"}},[t._v("寄信通知")])],1)],1),s("b-tbody",t._l(t.initOrders,(function(e){return s("b-tr",{key:e.id},[s("b-td",{staticClass:"text-center"},[t._v(t._s(e.id))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.sn))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.order_status))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.shipping_status))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.payment_status))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.total_amount))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.name))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.email))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.address))]),s("b-td",{staticClass:"text-center"},[t._v(t._s(e.phone))]),s("b-td",{staticClass:"text-center"},[s("b-button",{attrs:{type:"button",variant:"info",size:"sm"},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.notifyUser(e.id)}}},[t._v("通知使用者")])],1)],1)})),1)],1)],1)},c=[],o={name:"AdminOrdersDetail",props:{initOrders:{type:Array}},methods:{notifyUser:function(t){this.$emit("after-submit-notify",t)}}},l=o,d=s("2877"),u=Object(d["a"])(l,i,c,!1,null,null,null),p=u.exports,b=s("2fa3"),v=s("365c"),h=new v["a"],_={components:{AdminNav:r["a"],AdminOrdersDetail:p},data:function(){return{initOrders:[],isShow:!1}},created:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(h.getAdminOrders());case 3:t=e.sent,"success"===t.status&&(this.initOrders=t.orders,this.isShow=!0),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),b["a"].fire({icon:"warning",title:"Fetch Orders Fail"});case 10:case"end":return e.stop()}}),null,this,[[0,7]])},methods:{afterSubmitNotify:function(t){var e;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,regeneratorRuntime.awrap(h.getNotifyOrders(t));case 3:e=s.sent,b["a"].fire({icon:"".concat(e.status),title:"".concat(e.message)}),s.next=10;break;case 7:s.prev=7,s.t0=s["catch"](0),b["a"].fire({icon:"warning",title:"Submit Notify Fail"});case 10:case"end":return s.stop()}}),null,null,[[0,7]])}}},f=_,m=Object(d["a"])(f,a,n,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-6d9b2654.84911a07.js.map