import axios from 'axios';

// 登录接口
// eslint-disable-next-line import/prefer-default-export
export function login(username, password) {
  const url = '/api/user/login';
  return axios.post(url, {
    username,
    password,
  }).then(res => Promise.resolve(res));
}
