import axios from 'axios';

const auth = JSON.parse(localStorage.getItem('credit')) || null;
// cors request
axios.defaults.withCredentials = true;


export const getRequest = url => {
  return axios(url, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getAuthRequest = url => {
  return axios(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
    }).then(res => {
      return res.data
    })
    .catch(err => {
      return err;
    });
}

export const postRequest = (url, data) => {
  return axios({
      method: 'POST',
      url: url,
      data: data,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => { return res })
    .catch(err => {
      return err;
    });
}

export const postAuthRequest = (url, data) => {
  return axios({
      method: 'POST',
      url: url,
      data: data,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
    })
    .then(res => { return res })
    .catch(err => {
      return err;
    });
}

export const putAuthRequest = (url, data) => {
  return axios({
      method: 'PUT',
      url: url,
      data: data,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
    })
    .then(res => { return res })
    .catch(err => {
      return err;
    });
}

export const deleteRequest = url => {
  return axios.delete(url, {
      headers: { Authorization: 'Bearer ' + auth.token }
    }).then(res => {
      return res
    })
    .catch(err => {
      return err;
    });
}