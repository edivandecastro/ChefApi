import axios from 'axios'

export const baseURL = {
  'heimdall': 'http://localhost:3002/heimdall'
}

export const getAxios = ({ token }, urlApi) => {
  let options = {}
  if (token) {
    options.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: urlApi,
    headers: options
  });
}
