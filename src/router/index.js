import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import FurniturePagination from '../views/FurniturePagination.vue';
import AdminProduct from '../views/AdminProduct.vue';
import AdminProductsCrate from '../views/AdminProductCreate.vue';
import AdminLogs from '../views/AdminLogs.vue';
import AdminOrders from '../views/AdminOrders.vue';
import AdminPayments from '../views/AdminPayments.vue';
import AdminCoupons from '../views/AdminCoupons.vue';
import AdminProducts from '../views/AdminProducts.vue';
import FurnituresSearch from '../views/FurnitureSearch.vue';
import FurnituresItem from '../views/Furnitures.vue';
import UsersProfile from '../views/UsersProfile.vue';
import Cart from '../views/Cart.vue';
import OrderSuccess from '../views/OrderSuccess.vue';
import OrderFailed from '../views/OrderFailed.vue';
import Order from '../views/Order.vue';
import Orders from '../views/Orders.vue';
import store from '../store';


Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/products'
  },
  {
    path: '/admin/products',
    name: 'admin-products',
    component: AdminProducts
  },
  {
    path: '/admin/coupons',
    name: 'admin-coupons',
    component: AdminCoupons
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: AdminOrders
  },
  {
    path: '/admin/payments',
    name: 'admin-payments',
    component: AdminPayments
  },
  {
    path: '/admin/logs',
    name: 'admin-logs',
    component: AdminLogs
  },
  {
    path: '/admin/products/create',
    name: 'admin-products-create',
    component: AdminProductsCrate
  },
  {
    path: '/admin/products/:id',
    name: 'admin-product',
    component: AdminProduct
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/furnitures',
    name: 'furniturePagination',
    component: FurniturePagination
  },
  {
    path: '/furnitures/search',
    name: 'furnitures-Search',
    component: FurnituresSearch
  },
  {
    path: '/furnitures/:id',
    name: 'furnituresItem',
    component: FurnituresItem
  },
  {
    path: '/users/:id',
    name: 'usersProfile',
    component: UsersProfile
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/orders/success',
    name: 'orderSuccess',
    component: OrderSuccess
  },
  {
    path: '/orders/fails',
    name: 'orderFailed',
    component: OrderFailed
  },
  {
    path: '/orders/:userId',
    name: 'order',
    component: Order
  },
  {
    path: '/orders/',
    name: 'orders',
    component: Orders
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('getCurrentUser');

  const userState = store.state;
  let credit = userState.isAuthenticated;
  let isAdmin = userState.currentUser.isAdmin;
  if (
    !credit &&
    to.name !== 'SignIn' &&
    to.name !== 'SignUp' &&
    to.name !== 'furniturePagination' &&
    to.name !== 'furnitures-Search' &&
    to.name !== 'furnituresItem' &&
    to.name !== 'cart'
  ) {
    next('/signin');
    return;
  }

  if (credit) {
    if (to.name === 'SignIn' || to.name === 'Signup') {
      next('/');
      return;
    }
  }

  if (credit && isAdmin === false) {
    if (to.path.includes('/admin')) {
      next('/404');
      return;
    }
  }

  next();
})

export default router;