import { getRequest } from './apiHelper';
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
}

export default Request;
