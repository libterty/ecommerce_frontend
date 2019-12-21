import axios from 'axios';
// cors request
axios.defaults.withCredentials = true

export const getRequest = url => {
  return axios(url, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      console.log('res', res)
      return res;
    })
    .catch(err => console.log('fetch get err', err.message));
};


export const postRequest = (url, data) => {
  return axios({
      method: 'POST',
      url,
      data,

      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      console.log('res', res)
      return res;
    })
    .catch(err => console.log('fetch POST err', err.message));
}