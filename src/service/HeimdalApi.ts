import { getAxios, baseURL } from './Api'

export const AuthenticateUser = (username, password) => {
  let api = getAxios({}, baseURL['heimdall']);
  return api.post('/authenticate', {username, password});
}

export const TokenValidate = (token) => {
  let api = getAxios({ token }, baseURL['heimdall']);
  return api.get('/authenticate/validate');
}

export const VerifyAcesss = (token, user_id, resource, action) => {
  let api = getAxios({ token }, baseURL['heimdall']);
  return api.post('/rules/authorize', { rule: {user_id, resource, action} });
}
