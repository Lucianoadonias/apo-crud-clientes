# Relatório de Testes de Integração — APO CRUD de Clientes

## 1. Identificação

## 1. Identificação

**Projeto:** APO — CRUD de Clientes

**Disciplina:** Desenvolvimento Front-end / Back-end

**Tecnologias:** HTML, CSS, JavaScript, Node.js e Express.js

**Ambiente de teste:** Windows, navegador web e servidor local

**Ferramentas:** Navegador, DevTools e PowerShell

**Status:** Testes funcionais e cenários de erro concluídos.

## 1. Objetivo

Verificar o funcionamento integrado da aplicação CRUD de clientes, incluindo a comunicação entre o front-end desenvolvido com HTML, CSS e JavaScript e a API REST desenvolvida com Node.js e Express.js.

Os testes verificam as operações de cadastro, listagem, edição e exclusão de clientes, além das validações do formulário e do tratamento de erros.

## 2. Ambiente de teste

- Aplicação executada localmente.
- Back-end iniciado com `npm start`.
- Interface acessada pelo navegador em `http://localhost:3000/`.
- Comunicação entre front-end e back-end realizada por meio de requisições HTTP utilizando `fetch()`.

## 3. Casos de teste

| ID  | Cenário                             | Resultado esperado                                              | Resultado observado                                       | Situação |
| --- | ----------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| I01 | Carregar lista de clientes          | Clientes retornados pela API devem aparecer na interface        | A lista de clientes foi carregada e apresentada na página | Aprovado |
| I02 | Cadastrar cliente com dados válidos | Cliente deve ser cadastrado e aparecer na listagem              | Cadastro realizado e listagem atualizada                  | Aprovado |
| I03 | Editar cliente existente            | Dados do cliente devem ser atualizados                          | Alteração realizada e apresentada na listagem             | Aprovado |
| I04 | Excluir cliente existente           | Cliente deve ser removido após confirmação                      | Exclusão realizada e listagem atualizada                  | Aprovado |
| I05 | Cancelar exclusão                   | Cliente não deve ser excluído                                   | Operação cancelada e cliente mantido                      | Aprovado |
| I06 | Cadastrar sem nome                  | Formulário deve impedir o cadastro e informar o problema        | Validação apresentada e cadastro não realizado            | Aprovado |
| I07 | Cadastrar sem e-mail                | Formulário deve impedir o cadastro e informar o problema        | Validação apresentada e cadastro não realizado            | Aprovado |
| I08 | Cadastrar com e-mail inválido       | Formulário deve rejeitar o formato inválido                     | E-mail inválido rejeitado                                 | Aprovado |
| I09 | Editar utilizando e-mail inválido   | Alteração não deve ser enviada com e-mail inválido              | Validação apresentada e alteração não realizada           | Aprovado |
| I10 | Falha de comunicação com a API      | Aplicação deve tratar a falha sem interromper seu funcionamento | Mensagem de erro apresentada ao usuário                   | Aprovado |

## 4. Testes de registros inexistentes

Também foram realizadas requisições diretamente à API para verificar o comportamento diante de identificadores inexistentes.

A tentativa de atualizar `PUT /clientes/99999` retornou HTTP 404.

A tentativa de excluir `DELETE /clientes/99999` também retornou HTTP 404.

Nos dois casos, a API respondeu indicando que o cliente não foi encontrado.

Esses cenários complementam os testes registrados em `docs/testes-api.md`.

## 5. Teste de falha de comunicação

A falha de comunicação foi simulada utilizando o modo offline das ferramentas de desenvolvedor do navegador.

Com a aplicação previamente carregada, a conexão foi definida como offline e foi realizada uma tentativa de operação que dependia da API.
