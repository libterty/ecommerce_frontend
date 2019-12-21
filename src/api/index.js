import { getRequest, getAuthRequest, postRequest, postAuthRequest, putAuthRequest } from './apiHelper';
import config from '../config';

class Request {
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

  getSpecificProduct(paramsId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + paramsId);
        resolve(res.data);
      } catch (error) {
        console.log(error)
        reject(error);
      }
    });
  }
  getCart() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getRequest(config.ROOT_URL + 'cart');
        console.log('getCart res.data', res.data)
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    })
  }

  postSignIn(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL + '/signin', data);
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
        console.log('postCart res.data', res.data)
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
        const res = await getAuthRequest(config.ROOT_URL + '/admin/products');
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
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
}

export default Request;