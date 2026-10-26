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

## Etapas do desenvolvimento

- [ ] Etapa 1 — Construção do front-end.
- [ ] Etapa 2 — Desenvolvimento da API REST.
- [ ] Etapa 3 — Integração, testes e documentação final.

## Status

Projeto em desenvolvimento acadêmico.

As instruções completas de execução serão adicionadas
conforme a implementação avançar.

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

### Testes da API

Os testes das operações CRUD e dos cenários de erro são registrados em [`docs/testes-api.md`](docs/testes-api.md).

O relatório registra os resultados esperados, os resultados observados e a situação de cada caso de teste.
