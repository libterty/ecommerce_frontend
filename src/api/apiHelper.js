import axios from 'axios';

export const getRequest = url => {
  return axios(url, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      return res;
    })
    .catch(err => console.log('fetch get err', err.message));
};
