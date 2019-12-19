import { getRequest, getAuthRequest, postRequest } from './apiHelper';
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
        reject(error);
      }
    });
  }

  postSignIn(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL+'/signin', data);
        res.data.status === 'success' ? localStorage.setItem('credit', JSON.stringify(res.data)) : null;
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  postSignUp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL+'/signup', data);
        resolve (
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
        const res = await getAuthRequest(config.ROOT_URL+'/admin/products');
        resolve (
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
        resolve (
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default Request;
