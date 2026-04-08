import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<5', 'max<5'], // 95% das requisições devem ser menores que 500ms
    http_req_failed: ['rate<0.01'],
  },
  iterations: 10,
}

export default function () {
  const url = 'http://localhost:3000/login';

  const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
  });

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

  sleep(3);

}