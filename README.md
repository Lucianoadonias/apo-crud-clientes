# APO - CRUD de Clientes

Aplicação web para cadastro e gerenciamento de clientes,
desenvolvida como atividade prática da disciplina de
Desenvolvimento Front-end / Back-end.

## Objetivo

Construir uma aplicação web que permita cadastrar, listar,
consultar, editar e excluir clientes.

## Tecnologias

### Front-end

- HTML
- CSS
- JavaScript puro

### Back-end

- Node.js
- Express.js

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js e npm.
- Um navegador web atualizado.

O Visual Studio Code é recomendado para visualizar e editar o código-fonte.

## Instalação e execução

1. Abra um terminal na pasta principal do projeto.

2. Entre na pasta do backend:

    ```powershell
    cd backend
    ```

3. Instale as dependências:

    ```powershell
    npm install
    ```

4. Inicie o servidor:

    ```powershell
    npm start
    ```

5. Com o servidor em execução, abra o navegador e acesse:

    http://localhost:3000/

O backend utiliza Node.js e Express.js para disponibilizar a API REST e servir os arquivos do frontend.

Não é necessário iniciar um segundo servidor para a interface.

Para interromper o servidor, pressione `Ctrl + C` no terminal em que ele está sendo executado.

## Funcionamento da aplicação

A interface permite:

- Consultar a lista de clientes cadastrados.
- Cadastrar clientes informando nome, e-mail e telefone.
- Editar os dados de clientes existentes.
- Excluir clientes após confirmação.

Os campos nome e e-mail são obrigatórios. O telefone é opcional.

A interface utiliza JavaScript e `fetch()` para enviar requisições HTTP ao backend.

O backend processa as requisições e retorna respostas em JSON.

## Persistência dos dados

Os dados são armazenados em memória durante a execução do servidor.

Ao reiniciar o backend, as alterações realizadas durante a execução são perdidas e os dados iniciais são recriados.

Esta abordagem foi adotada para a atividade acadêmica, que não exige banco de dados.

## Etapas do desenvolvimento

- [x] Etapa 1 — Construção do front-end.
- [x] Etapa 2 — Desenvolvimento da API REST.
- [x] Etapa 3 — Integração e testes do CRUD.
- [ ] Revisão final da documentação e preparação da entrega.

## Status

As funcionalidades de cadastro, listagem, consulta, edição
e exclusão de clientes estão implementadas.

O CRUD foi integrado à API REST e passou pelos testes
funcionais e de tratamento de erros realizados durante
o desenvolvimento.

A documentação final está em revisão para a entrega da APO.

## API REST

A aplicação disponibiliza uma API REST para consultar e gerenciar clientes.

### Endpoints

| Método HTTP | Rota            | Descrição                                 |
| ----------- | --------------- | ----------------------------------------- |
| GET         | `/clientes`     | Lista todos os clientes                   |
| GET         | `/clientes/:id` | Consulta um cliente pelo identificador    |
| POST        | `/clientes`     | Cadastra um novo cliente                  |
| PUT         | `/clientes/:id` | Atualiza os dados de um cliente existente |
| DELETE      | `/clientes/:id` | Exclui um cliente existente               |

### Formato dos dados

A API recebe e retorna dados em JSON.

Exemplo de objeto de cliente:

```json
{
    "name": "Ana Souza",
    "email": "ana.souza@example.com",
    "phone": "(45) 99999-1111"
}
```

O identificador `id` é atribuído pela aplicação.

Os campos `name` e `email` são obrigatórios. O campo `phone` pode ficar vazio.

### Principais códigos de status HTTP

| Código          | Significado no projeto                                  |
| --------------- | ------------------------------------------------------- |
| 200 OK          | Consulta, atualização ou exclusão concluída com sucesso |
| 201 Created     | Cliente cadastrado com sucesso                          |
| 400 Bad Request | Dados inválidos ou identificador inválido               |
| 404 Not Found   | Cliente não encontrado                                  |

### Armazenamento

Nesta versão acadêmica, os dados dos clientes são armazenados em memória no servidor. As alterações não são persistidas após o reinício do processo.

## Testes

Os testes da aplicação foram realizados manualmente e estão
documentados nos seguintes relatórios:

- [Testes da API REST](docs/testes-api.md)
- [Testes de integração](docs/testes-integracao.md)

Os relatórios apresentam os cenários avaliados, os resultados
esperados, os resultados observados e a situação de cada teste.
