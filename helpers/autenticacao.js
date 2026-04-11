import http from 'k6/http';
import { pegarURL } from '../utils/variaveis.js';

const postLogin = JSON.parse(open('../fixtures/post.login.json'));

export function obterToken() {
  const url = `${pegarURL()}/login`;

  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resp = http.post(url, payload, params);

  return resp.json('token');
}