(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0be78f94"],{db23:function(t,i,e){},e09e:function(t,i,e){"use strict";var r=e("db23"),s=e.n(r);s.a},e1bd:function(t,i,e){var r=self.crypto||self.msCrypto,s="QLUint8ARdomValuesObj0h6345-79BCrypgJzHKTNYDSMkXPZ_FfG1WcqvwxEI2";t.exports=function(t){t=t||21;var i="",e=r.getRandomValues(new Uint8Array(t));while(t--)i+=s[63&e[t]];return i}},ed7b:function(t,i,e){"use strict";e.r(i);var r=function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.isShow?e("b-container",{staticStyle:{"max-width":"75%"},attrs:{fluid:""}},[e("FurnituresDashboard",{attrs:{initProduct:t.initProduct,initImages:t.initImages,initColors:t.initColors},on:{"after-add-to-cart":t.afterAddToCart}}),e("ShoppingCart",{attrs:{"init-cart":t.initCart,"init-total-price":t.initTotalPrice},on:{"click-to-get-cart":t.clickToGetCart}}),e("hr"),e("FurnituresDimension",{attrs:{initProduct:t.initProduct,initImages:t.initImages}})],1):t._e()},s=[],a=(e("d3b7"),e("96cf"),e("365c")),n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("b-card",{staticClass:"overflow-hidden",attrs:{"no-body":""}},[e("b-row",{attrs:{"no-gutters":""}},[e("b-col",{attrs:{md:"6"}},[e("b-card-img",{staticClass:"rounded-0",attrs:{src:t.initImages[0].url,alt:t.initProduct.name}}),e("div",{directives:[{name:"viewer",rawName:"v-viewer",value:{movable:!1},expression:"{movable: false}"}],staticClass:"image-information images"},t._l(t.initImages,(function(t){return e("b-img-lazy",{key:t.id,staticClass:"image-information-item",attrs:{center:"",thumbnail:"",fluid:"",src:t.url}})})),1)],1),e("b-col",{attrs:{md:"6"}},[e("b-card-body",{attrs:{title:t.initProduct.name}},[e("b-list-group",{attrs:{flush:""}},[e("b-list-group-item",{staticClass:"text-left"},[t._v(" Rating : "),e("div",[t._l(t.stars,(function(i){return e("i",{key:i.id,staticClass:"material-icons"},[t._v("star")])})),t.isHalf?e("i",{staticClass:"material-icons"},[t._v("star_half")]):t._e()],2)])],1),e("br"),e("b-card-text",[t._v(t._s(t.initProduct.description))]),e("b-list-group",{attrs:{flush:""}},[e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("顏色風格 :")]),e("div",{staticClass:"product_color"},t._l(t.initColors,(function(i){return e("b-button",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:i.Inventory.quantity,expression:"color.Inventory.quantity",modifiers:{hover:!0,top:!0}}],key:i.id,staticClass:"product_color_item",class:t._f("convertClass")(i.name),attrs:{title:"庫存量"},on:{click:function(e){return t.selectedColor(i.id,i.Inventory.quantity)}}})})),1)]),e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("庫存 :")]),t._l(t.Colors,(function(i){return e("div",{key:i.id,staticClass:"inventory-status"},[e("i",{staticClass:"material-icons"},[t._v(t._s(t._f("showInventory")(i.Inventory.quantity)))]),e("p",[t._v(" "+t._s(t._f("convertLanguage")(i.name))+" "+t._s(t._f("showResponse")(i.Inventory.quantity))+" ")])])}))],2),e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v(t._s(t.initProduct.price)+" $")])])],1),e("b-form",[e("b-form-group",{staticClass:"mb-0 cartCreate",attrs:{"label-for":"cartCreate"}},[e("b-col",{attrs:{sm:"12"}},[e("div",{staticClass:"row"},[e("b-form-input",{staticClass:"col-sm-3",attrs:{id:"cart_input_number",type:"number",min:"1",value:t.form.quantity},model:{value:t.form.quantity,callback:function(i){t.$set(t.form,"quantity",i)},expression:"form.quantity"}}),e("b-button",{staticClass:"col-sm-5 cart_input_button",attrs:{variant:"primary",type:"submit",size:"lg"},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),t.addToCart(i)}}},[t._v("Add to Cart")])],1)])],1)],1),e("br"),e("b-list-group",{attrs:{flush:""}},[e("b-list-group-item",{staticClass:"text-left"},[e("i",{staticClass:"material-icons"},[t._v("local_shipping")]),e("p",{staticClass:"text-muted"},[t._v("黑貓宅急便")])])],1)],1)],1)],1)],1)],1)},o=[],c=e("e1bd"),u=e.n(c),l=e("2708"),d=e("2fa3"),f={mixins:[l["a"],l["b"]],props:{initProduct:{type:Object,required:!0},initImages:{type:Array,required:!0},initColors:{type:Array,required:!0}},filters:{showInventory:function(t){return 0===t?"close":"done"},showResponse:function(t){return 0===t?"補貨中":"有現貨"}},data:function(){return{nanoid:u()(5),product:{},Images:[],Colors:[],stars:[],isHalf:!1,form:{quantity:1,productId:-1,colorId:-1,price:-1}}},created:function(){this.switchImage=this.initImages[0].url},mounted:function(){var t=this;this.generateStar(),setTimeout((function(){t.Images=t.initImages,t.Colors=t.initColors,t.product=t.initProduct}),500)},methods:{generateStar:function(){var t=this;setTimeout((function(){var i=t.initProduct.rating;while(i>1)t.stars.push({id:u()(5),stars:"stars"}),i-=2;1===i&&(t.isHalf=!0)}),500)},addToCart:function(){if(-1===this.form.colorId)return d["a"].fire({icon:"warning",title:"Please select product's color"});this.form.productId=this.initProduct.id,this.form.price=this.initProduct.price;var t=JSON.stringify(this.form);this.form.colorId=-1,this.$emit("after-add-to-cart",t)},selectedColor:function(t,i){return i<1?(this.form.colorId=-1,d["a"].fire({icon:"warning",title:"No storage for this color"})):this.form.colorId=t}},watch:{initProduct:function(t){this.initProduct=t},initImages:function(t){this.initImages=t},initColors:function(t){this.initColors=t}}},m=f,h=(e("e09e"),e("2877")),p=Object(h["a"])(m,n,o,!1,null,"21315517",null),g=p.exports,v=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("b-card",{staticClass:"overflow-hidden",attrs:{"no-body":""}},[e("b-row",{attrs:{"no-gutters":""}},[e("b-col",{attrs:{md:"6"}},[e("div",{staticClass:"wrap"},[e("div",{staticClass:"cube"},[e("b-card-img",{ref:"profileId",staticClass:"rounded-0",attrs:{id:"profileId",src:t.initImages[0].url,crossorigin:""}})],1)])]),e("b-col",{attrs:{md:"6"}},[e("b-card-text",[e("b-list-group",{attrs:{flush:""}},[e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("原料 :")]),e("small",[t._v(t._s(t.initProduct.material))])]),e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("長 :")]),e("small",[t._v(t._s(t.initProduct.length)+" (公分)")])]),e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("寬 :")]),e("small",[t._v(t._s(t.initProduct.width)+" (公分)")])]),e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("高 :")]),e("small",[t._v(t._s(t.initProduct.height)+" (公分)")])]),e("b-list-group-item",{staticClass:"text-left"},[e("strong",[t._v("重量 :")]),e("small",[t._v(t._s(t.initProduct.weight)+" (公斤)")])])],1)],1)],1)],1)],1)],1)},b=[],C={props:{initProduct:{required:!0},initImages:{required:!0}},data:function(){return{base64:""}},mounted:function(){var t=this;setTimeout((function(){t.base64=t.getBase64Image(t.$refs.profileId)}),1e3)},methods:{getBase64Image:function(t){var i=document.createElement("canvas");i.width=t.width,i.height=t.height;var e=i.getContext("2d");e.drawImage(t,0,0);var r=i.toDataURL("image/png");return r}},watch:{initProduct:function(t){this.initProduct=t},initImages:function(t){this.initImages=t}}},_=C,w=Object(h["a"])(_,v,b,!1,null,null,null),y=w.exports,I=e("c6c8"),P=new a["a"],x={components:{FurnituresDashboard:g,FurnituresDimension:y,ShoppingCart:I["a"]},data:function(){return{isShow:!1,initProduct:{},initImages:[],initColors:[],error:"",initCart:[],initTotalPrice:0}},created:function(){var t;return regeneratorRuntime.async((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,regeneratorRuntime.awrap(P.getCart());case 3:t=i.sent,this.fetchFurniture(document.location.pathname),"success"===t.status&&(this.initCart=t.cart,this.initTotalPrice=t.totalPrice,this.isShow=!0),i.next=11;break;case 8:i.prev=8,i.t0=i["catch"](0),d["a"].fire({icon:"error",title:"Fetch cart failed"});case 11:case"end":return i.stop()}}),null,this,[[0,8]])},beforeRouteUpdate:function(t,i,e){var r=t.params.id;this.fetchFurniture("/furnitures/".concat(r)),e()},methods:{fetchFurniture:function(t){var i;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(P.getSpecificProduct(t));case 3:i=e.sent,"success"===i.status&&(this.initProduct=i.product,this.initImages=i.Images,this.initColors=i.Colors,this.isShow=!0),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),d["a"].fire({icon:"error",title:"Fetch cart failed"});case 10:case"end":return e.stop()}}),null,this,[[0,7]])},afterAddToCart:function(t){var i;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(P.postCart(t));case 3:i=e.sent,"success"===i.status&&d["a"].fire({icon:"success",title:"Added to cart"}),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),d["a"].fire({icon:"error",title:"Fail to add to cart"});case 10:case"end":return e.stop()}}),null,null,[[0,7]])},clickToGetCart:function(){var t;return regeneratorRuntime.async((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,regeneratorRuntime.awrap(P.getCart());case 3:t=i.sent,"success"===t.status&&(this.initCart=t.cart,this.initTotalPrice=t.totalPrice),i.next=10;break;case 7:i.prev=7,i.t0=i["catch"](0),d["a"].fire({icon:"error",title:"Fetch cart failed"});case 10:case"end":return i.stop()}}),null,this,[[0,7]])}},watch:{initProduct:function(t){this.initProduct=t},initImages:function(t){this.initImages=t},initColors:function(t){this.initColors=t}}},k=x,q=Object(h["a"])(k,r,s,!1,null,null,null);i["default"]=q.exports}}]);
//# sourceMappingURL=chunk-0be78f94.7d11b1ac.js.map