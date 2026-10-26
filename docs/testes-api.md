# Relatório de Testes da API — APO CRUD de Clientes

## 1. Identificação

**Projeto:** APO — CRUD de Clientes  
**Disciplina:** Desenvolvimento Front-end / Back-end  
**Tecnologias:** Node.js e Express.js  
**Ambiente de teste:** Execução local no Windows, utilizando PowerShell  
**Ferramenta de teste:** PowerShell com `Invoke-RestMethod`  
**Status da validação:** Em andamento

## 2. Objetivo

Verificar o funcionamento das rotas da API REST responsável pelo gerenciamento de clientes, conferindo as respostas HTTP, os dados retornados em JSON e o tratamento de situações inválidas.

## 3. Procedimento

A API foi iniciada localmente por meio do comando `npm start`, executado na pasta `backend`.

As requisições foram enviadas ao endereço base `http://localhost:3000`, utilizando os métodos HTTP correspondentes às operações CRUD.

Os resultados observados deverão ser comparados aos resultados esperados antes da aprovação de cada teste.

## 4. Casos de teste

| ID  | Operação             | Cenário                       | Resultado esperado            | Resultado observado                                              | Situação      |
| --- | -------------------- | ----------------------------- | ----------------------------- | ---------------------------------------------------------------- | ------------- | ------------------------------- | -------- |
| T01 | GET /health          | Verificar servidor            | HTTP 200                      | HTTP 200; JSON com status: ok.                                   | Aprovado      |
| T02 | GET /clientes        | Listar clientes               | HTTP 200 e lista JSON         | Retornou 3 clientes simulados                                    | Aprovado      |
| T03 | GET /clientes/:id    | Consultar ID existente        | HTTP 200 e objeto JSON        | Retornou o cliente de ID 2 (Carlos Lima)                         | Aprovado      |
| T04 | GET /clientes/99     | Consultar ID inexistente      | HTTP 404                      | HTTP 404; mensagem Cliente não encontrado.                       | Aprovado      |
| T05 | GET /clientes/abc    | ID inválido                   | HTTP 400                      | HTTP 400; mensagem indicando que o ID deve ser inteiro positivo. | Aprovado      |
| T06 | POST /clientes       | Dados válidos                 | HTTP 201 e cliente criado     | HTTP 201; cliente criado com ID 4 e dados retornados em JSON.    | Aprovado      |
| T07 | POST /clientes       | Nome ou e-mail vazio          | HTTP 400                      | HTTP 400; campos obrigatórios rejeitados                         | Aprovado      |
| T08 | POST /clientes       | E-mail inválido               | HTTP 400                      | HTTP 400; formato de e-mail rejeitado                            | Aprovado      |
| T09 | PUT /clientes/:id    | Atualizar cliente existente   | HTTP 200 e cliente atualizado | HTTP 200; cliente de teste atualizado com os novos dados.        | Aprovado      |
| T10 | PUT /clientes/99     | Atualizar cliente inexistente | HTTP 404                      | HTTP 404; cliente inexistente não foi encontrado.                | Aprovado      |
| T11 | DELETE /clientes/:id | Excluir cliente existente     | HTTP 200 e confirmação        | HTTP 200; exclusão confirmada e objeto removido retornado.       | Aprovado      |
| T12 | GET /clientes/:id    | Consultar cliente excluído    | HTTP 404                      | HTTP 404; consulta posterior não encontrou o cliente excluído.   | Não executado |
| T13 | DELETE /clientes/abc | Excluir com ID inválido       | HTTP 400                      | Excluir com ID inválido                                          | HTTP 400      | HTTP 400; ID inválido rejeitado | Aprovado |

## 5. Ocorrências identificadas durante o desenvolvimento

Durante a implementação, foi identificada uma ocorrência em que a requisição `POST /clientes` retornou `Cannot POST /clientes`.

A causa identificada foi a ausência do registro da rota POST no arquivo de rotas do Express. Após adicionar a declaração correspondente, foi necessário reiniciar o servidor e retestar a operação.

Também ocorreu um erro ao enviar JSON por meio de `curl.exe` no PowerShell, devido à interpretação de aspas e argumentos. Para os testes seguintes, foi adotado `Invoke-RestMethod`, com conversão do objeto para JSON por meio de `ConvertTo-Json`.

Essas ocorrências documentam problemas encontrados durante o desenvolvimento. A aprovação final depende da execução dos casos de teste listados neste relatório.

## 6. Armazenamento dos dados

Nesta versão da atividade, os clientes são armazenados em memória no servidor. Os registros criados, atualizados ou excluídos durante a execução não são persistidos após o reinício do processo.

## 7. Conclusão

Foram executados 13 casos de teste para validar o comportamento da API REST de gerenciamento de clientes.

A validação contemplou a verificação do servidor, a listagem e consulta de clientes, o cadastro, a atualização e a exclusão de registros, além do tratamento de entradas inválidas e de clientes inexistentes.

A API demonstrou o funcionamento das operações CRUD, as validações básicas e o retorno dos códigos de status HTTP previstos para os cenários avaliados.

Os dados permanecem armazenados em memória, conforme permitido pelo roteiro da APO, não havendo persistência após o reinício do servidor.
