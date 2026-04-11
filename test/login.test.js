import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarURL } from '../utils/variaveis.js';

const postLogin = JSON.parse(open('./fixtures/post.login.json'));

export const options = {

  stages: [
    { duration: '10s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 50 },
    { duration: '5s', target: 20 },
    { duration: '5s', target: 10 },
    { duration: '5s', target: 5 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'], // 95% das requisições devem ser menores que 500ms
    http_req_failed: ['rate<0.01'],
  },
}

export default function () {
  const url = `${pegarURL()}/login`;

  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resp = http.post(url, payload, params);

  check(resp, {
    'Validar que o status seja 200': (r) => r.status === 200,
    'Validar que o body contém um token': (r) => r.json().hasOwnProperty('token'),
    'Validar que o token é uma string': (r) => typeof r.json().token === 'string',
  });

  sleep(1);

}