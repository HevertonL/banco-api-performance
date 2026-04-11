# Banco — Testes de Performance da API (k6)

Este repositório contém scripts de teste de performance escritos para o k6, focados nas rotas de autenticação e transferência da API do projeto "banco".

O objetivo é fornecer scripts simples e reprodutíveis para validar tempo de resposta, status e comportamento em cenários básicos de carga.

## Pré-requisitos

- k6 (https://k6.io) instalado na sua máquina. Consulte a documentação do k6 para instalações em Windows/WSL/macOS/Linux.
- Acesso à API que será testada (endereço base configurado em `config/config.local.js` ou via `utils/variaveis.js`).
- Shell (o repositório foi desenvolvido usando imports ES modules e assume execução via k6 em um ambiente que suporte JavaScript moderno).

## Como usar

1. Clone este repositório:

	 git clone <url-do-repositorio>
	 cd banco-api-performance

2. Ajuste a configuração da API (se necessário):

- `config/config.local.js`: arquivo local de configuração (endpoint, credenciais de teste). Edite conforme o seu ambiente.
- `utils/variaveis.js`: função `pegarURL()` retorna a URL base utilizada pelos testes.

3. Executar um teste com k6

Exemplos:

- Executar o teste de transferências (script principal):

	k6 run test/transferencias.test.js

- Executar o teste de login:

	k6 run test/login.test.js

- Executar com um número de iterações definido (substitui a opção `options` no script):

	k6 run --iterations 10 test/transferencias.test.js

- Gerar saída JSON para análise ou geração de relatório:

	k6 run --iterations 10 --out json=output.json test/transferencias.test.js

Observação: este repositório inclui um arquivo `html-report.html` (provavelmente gerado a partir de um run anterior). Você pode abrir esse arquivo no navegador para visualizar o relatório salvo.

## Estrutura do repositório

- `test/`
	- `login.test.js` — script de performance para rota de login.
	- `transferencias.test.js` — script de performance para rota de transferências.
- `helpers/`
	- `autenticacao.js` — funções auxiliares para obter token/realizar login.
- `utils/`
	- `variaveis.js` — utilitários de configuração (ex.: função `pegarURL`).
- `config/`
	- `config.local.js` — configurações locais (endereço da API, credenciais de teste, etc.).
- `fixtures/` — arquivos JSON de exemplo (ex.: `post.login.json`).
- `html-report.html` — relatório HTML gerado (artefato).

## Contrato dos scripts (curto)

- Entrada: os scripts usam funções auxiliares para obter a URL base e um token de autenticação.
- Saída: logs no console do k6 e status code/validações feitas via `check()` nas respostas.
- Critérios de sucesso: checks dentro dos scripts (por exemplo, status 201 e mensagens de sucesso esperadas).

## Boas práticas e notas

- Ajuste `options` dentro dos scripts para modelar melhor sua carga (VU, duration, iterations, etc.).
- Para cenários mais avançados de reporte, exporte `--out json=output.json` e use ferramentas externas para gerar visualizações.
- Use variáveis de ambiente ou o arquivo `config/config.local.js` para não versionar credenciais sensíveis.

## Como adicionar novos testes

1. Crie um novo arquivo em `test/`, por exemplo `meuTeste.test.js`.
2. Reuse helpers existentes em `helpers/` para autenticação e fixtures.
3. Adicione asserts com `check()` para validar status e corpo.
4. Execute com `k6 run test/meuTeste.test.js`.

## Contribuição

Contribuições são bem-vindas. Abra uma issue descrevendo o que você deseja melhorar ou envie um pull request com testes e documentação.

## Licença

Este projeto não possui uma licença explícita no repositório. Se desejar adicionar uma, crie um arquivo `LICENSE` com a licença escolhida.
