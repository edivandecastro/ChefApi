import axios from 'axios'

export const Credentials = {
  'username': 'chefapi',
  'password': '123456'
}

export const baseURL = {
  'heimdall': 'http://localhost:3002/heimdall',
  'chef': 'http://localhost:3003/chef'
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
