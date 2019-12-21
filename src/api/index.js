import { getRequest, postRequest } from './apiHelper';
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
  postCart(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL + 'cart', data);
        console.log('postCart res.data', res.data)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default Request;