(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d9b2654"],{e04c:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-nav",{attrs:{tabs:"",justified:""}},t._l(t.tabs,(function(e){return n("b-nav-item",{key:e.id,attrs:{href:e.path}},[t._v(" "+t._s(e.title)+" ")])})),1)},a=[],r=n("e1bd"),i=n.n(r),c={data:function(){return{tabs:[{id:i()(5),title:"建立新的產品",path:"/admin/products/create"},{id:i()(5),title:"產品資訊",path:"/admin/products"},{id:i()(5),title:"折價卷資訊",path:"/admin/coupons"},{id:i()(5),title:"庫存資訊",path:"/admin/inventories"},{id:i()(5),title:"銷售資訊",path:"/admin/payments"},{id:i()(5),title:"呆帳管理",path:"/admin/orders"},{id:i()(5),title:"前往前台",path:"/"}]}}},o=c,l=n("2877"),d=Object(l["a"])(o,s,a,!1,null,null,null);e["a"]=d.exports},e1bd:function(t,e,n){var s=self.crypto||self.msCrypto,a="QLUint8ARdomValuesObj0h6345-79BCrypgJzHKTNYDSMkXPZ_FfG1WcqvwxEI2";t.exports=function(t){t=t||21;var e="",n=s.getRandomValues(new Uint8Array(t));while(t--)e+=a[63&n[t]];return e}},ec5c:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"py-5"},[n("h3",[t._v("呆帳管理")]),n("AdminNav"),t.isShow?n("b-container",{staticClass:"py-5"},[n("AdminOrdersDetail",{attrs:{initOrders:t.initOrders},on:{"after-submit-notify":t.afterSubmitNotify}})],1):t._e()],1)},a=[],r=(n("d3b7"),n("96cf"),n("e04c")),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-table-simple",{attrs:{hover:"",small:"","caption-top":"",responsive:""}},[n("b-thead",{attrs:{"head-variant":"dark"}},[n("b-tr",[n("b-th",{attrs:{colspan:"6"}},[t._v("基本資訊")]),n("b-th",{attrs:{colspan:"5"}},[t._v("使用者資訊")])],1),n("b-tr",[n("b-th",{attrs:{colspan:"1"}},[t._v("#")]),n("b-th",{attrs:{colspan:"1"}},[t._v("sn單號")]),n("b-th",{attrs:{colspan:"1"}},[t._v("訂單狀態")]),n("b-th",{attrs:{colspan:"1"}},[t._v("物流狀態")]),n("b-th",{attrs:{colspan:"1"}},[t._v("交易狀態")]),n("b-th",{attrs:{colspan:"1"}},[t._v("交易金額")]),n("b-th",{attrs:{colspan:"1"}},[t._v("使用者名稱")]),n("b-th",{attrs:{colspan:"1"}},[t._v("聯絡信箱")]),n("b-th",{attrs:{colspan:"1"}},[t._v("聯絡地址")]),n("b-th",{attrs:{colspan:"1"}},[t._v("聯絡電話")]),n("b-th",{attrs:{colspan:"1"}},[t._v("寄信通知")])],1)],1),n("b-tbody",t._l(t.initOrders,(function(e){return n("b-tr",{key:e.id},[n("b-td",{staticClass:"text-center"},[t._v(t._s(e.id))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.sn))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.order_status))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.shipping_status))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.payment_status))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.total_amount))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.name))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.email))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.address))]),n("b-td",{staticClass:"text-center"},[t._v(t._s(e.phone))]),n("b-td",{staticClass:"text-center"},[n("b-button",{attrs:{type:"button",variant:"info",size:"sm"},on:{click:function(n){return n.stopPropagation(),n.preventDefault(),t.notifyUser(e.id)}}},[t._v("通知使用者")])],1)],1)})),1)],1)],1)},c=[],o={name:"AdminOrdersDetail",props:{initOrders:{type:Array}},methods:{notifyUser:function(t){this.$emit("after-submit-notify",t)}}},l=o,d=n("2877"),u=Object(d["a"])(l,i,c,!1,null,null,null),p=u.exports,b=n("2fa3"),v=n("365c"),h=new v["a"],_={components:{AdminNav:r["a"],AdminOrdersDetail:p},data:function(){return{initOrders:[],isShow:!1}},created:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(h.getAdminOrders());case 3:t=e.sent,"success"===t.status&&(this.initOrders=t.orders,this.isShow=!0),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),b["a"].fire({icon:"warning",title:"Something went wrong"});case 10:case"end":return e.stop()}}),null,this,[[0,7]])},methods:{afterSubmitNotify:function(t){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,regeneratorRuntime.awrap(h.getNotifyOrders(t));case 3:e=n.sent,b["a"].fire({icon:"".concat(e.status),title:"".concat(e.message)}),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),b["a"].fire({icon:"warning",title:"Something went wrong"});case 10:case"end":return n.stop()}}),null,null,[[0,7]])}}},f=_,m=Object(d["a"])(f,s,a,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-6d9b2654.ae7383d8.js.map