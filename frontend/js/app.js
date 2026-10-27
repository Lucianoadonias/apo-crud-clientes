
"use strict";

const API_URL = "/clientes";

const clientForm = document.querySelector("#client-form");
const clientsList = document.querySelector("#clients-list");
const emptyState = document.querySelector("#empty-state");
const listFeedback = document.querySelector("#list-feedback");
const formFeedback = document.querySelector("#form-feedback");
const clientNameInput = document.querySelector("#client-name");
const clientEmailInput = document.querySelector("#client-email");
const clientPhoneInput = document.querySelector("#client-phone");
const submitButton = clientForm.querySelector('button[type="submit"]');

let clients = [];
let editingClientId = null;

function renderClients() {
    clientsList.replaceChildren();

    emptyState.hidden = clients.length > 0;

    clients.forEach(function (client) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = client.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = client.email;

        const phoneCell = document.createElement("td");
        phoneCell.textContent = client.phone || "Não informado";

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");

        editButton.type = "button";
        editButton.textContent = "Editar";
        editButton.className = "edit-button";

        editButton.addEventListener("click", function () {
        iniciarEdicao(client);
        });

        actionsCell.appendChild(editButton);

        row.append(
            nameCell,
            emailCell,
            phoneCell,
            actionsCell
        );

        clientsList.appendChild(row);
    });

    listFeedback.textContent = clients.length > 0
        ? `Total de clientes: ${clients.length}`
        : "";
}

function iniciarEdicao(client) {
  editingClientId = client.id;

  clientNameInput.value = client.name;
  clientEmailInput.value = client.email;
  clientPhoneInput.value = client.phone || "";

  submitButton.textContent = "Salvar alterações";

  formFeedback.textContent =
    `Editando cliente: ${client.name}`;
}

function encerrarEdicao() {
  editingClientId = null;
  clientForm.reset();

  submitButton.textContent = "Cadastrar";
}

async function carregarClientes() {
    listFeedback.textContent = "Carregando clientes...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dados = await response.json();

        if (!Array.isArray(dados)) {
            throw new Error("A API não retornou uma lista de clientes.");
        }

        clients = dados;
        renderClients();

    } catch (error) {

        clientsList.replaceChildren();
        emptyState.hidden = true;

        listFeedback.textContent =
            "Não foi possível carregar os clientes. Verifique a API.";

        console.error("Erro ao carregar clientes:", error);
    }
}

clientForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  formFeedback.textContent = "";

  const name = clientNameInput.value.trim();
  const email = clientEmailInput.value.trim();
  const phone = clientPhoneInput.value.trim();

  if (!name || !email) {
    formFeedback.textContent =
      "Preencha o nome e o email do cliente.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formFeedback.textContent = "Informe um e-mail válido.";
    return;
  }

  try {
    const isEditing = editingClientId !== null;

    const url = isEditing
        ? `${API_URL}/${editingClientId}`
        : API_URL;

    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
        method: method,
         headers: {
    "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone
      })
    });

    const dados = await response.json();

    if (!response.ok) {
      formFeedback.textContent =
        dados.error || "Não foi possível cadastrar o cliente.";
      return;
    }

    const successMessage = isEditing
        ? `Cliente "${dados.name}" atualizado com sucesso.`
        : `Cliente "${dados.name}" cadastrado com sucesso.`;

    encerrarEdicao();

    await carregarClientes();

    formFeedback.textContent = successMessage;

  } catch (error) {

    console.error("Erro ao cadastrar cliente:", error);

    formFeedback.textContent =
      "Não foi possível concluir o cadastro. Verifique a conexão com o servidor e tente novamente.";
  }
});

clientForm.addEventListener("reset", function () {
  editingClientId = null;
  submitButton.textContent = "Cadastrar";
  formFeedback.textContent = "";
});

carregarClientes();
