import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { pegarURL } from '../utils/variaveis.js';



export const options = {
  iterations: 1
};

export default function () {
  const token = obterToken();
  console.log('Token obtido:', token);

  const url = pegarURL() + '/transferencias';

  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 123.45,
    token: ""
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };

  let resp = http.post(url, payload, params);
  console.log('Resposta da API:', resp.body);
  check(resp, {
    'Validar que o status seja 201': (resp) => resp.status === 201,
    'Validar que a resposta contém a mensagem de sucesso': (resp) => resp.body.includes('Transferência realizada com sucesso.'),
  });

  sleep(1);
}
