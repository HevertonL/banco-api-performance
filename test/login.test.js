import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
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

  http.post(url, payload, params);

  sleep(1);

}