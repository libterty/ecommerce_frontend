import { getRequest, getAuthRequest, postRequest, postAuthRequest, putAuthRequest, deleteRequest } from './apiHelper';
import config from '../config';

class Request {
  getCurrentUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + 'get_current_user');
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  getHomePageProduts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + 'furnitures');
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getSearchNav(serachItem) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + `furnitures/search${serachItem}`);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getSpecificProduct(paramsId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + paramsId);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCart() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + 'cart');
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    })
  }

  deleteCartItem(cartItemId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await deleteRequest(`${config.ROOT_URL}cart/${cartItemId}`);
        console.log('delete res.data', res.data)
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    })
  }

  addCartItem(cartItemId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(`${config.ROOT_URL}cart/${cartItemId}/add`);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    })
  }
  subCartItem(cartItemId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(`${config.ROOT_URL}cart/${cartItemId}/sub`);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    })
  }

  postSignIn(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL + 'signin', data);
        res.data.status === 'success' ? localStorage.setItem('credit', JSON.stringify(res.data)) : null;
        resolve(res.data)
      } catch (error) {
        reject(error);
      }
    })
  }

  postCart(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL + 'cart', data);
        resolve(res.data)
      } catch (error) {
        reject(error);
      }
    })
  }

  postSignUp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL + '/signup', data);
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  getAdminHomePage() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + 'admin/products');
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  getAdminCoupons() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + 'admin/coupons');
        resolve (
          res
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  postAdminCoupon(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postAuthRequest(config.ROOT_URL + 'admin/coupons', data);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  putAdminCoupon(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await putAuthRequest(config.ROOT_URL + `admin/coupons/${id}`, data);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteAdminCoupon(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await deleteRequest(config.ROOT_URL + `admin/coupons/${id}`);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getAdminOrders() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + 'admin/orders');
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getAdminPayments() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + 'admin/payments');
        resolve (
          res
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getNotifyOrders(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + `admin/orders/notify/${id}`);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getAdminSpecificProduct(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + url);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  putAdminProduct(url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await putAuthRequest(config.ROOT_URL + url, data);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  postNewColor(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postAuthRequest(config.ROOT_URL + 'admin/products/colors', data);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  putReviseColor(pId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await putAuthRequest(config.ROOT_URL + `/admin/products/colors/${pId}`, data);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  putNewInventory(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await putAuthRequest(config.ROOT_URL + 'admin/products/inventories/' + id, data);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  postNewImage(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postAuthRequest(config.ROOT_URL + 'admin/products/images/' + id, data);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  postNewProduct(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postAuthRequest(config.ROOT_URL + 'admin/products', data);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  deleteExistProduct(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await deleteRequest(config.ROOT_URL + `admin/products/${id}`);
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  getUser(path) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + path);
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  putUser(path, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await putAuthRequest(config.ROOT_URL + path, data);
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  getProducts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + 'furnitures/pagination');
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  getSearchProducts(search) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + 'furnitures/pagination' + search);
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default Request;