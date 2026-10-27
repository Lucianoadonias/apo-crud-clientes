
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

let clients = [];

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
        actionsCell.textContent = "—";

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
    const response = await fetch(API_URL, {
      method: "POST",
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

    clientForm.reset();
    await carregarClientes();

    formFeedback.textContent =
      `Cliente "${dados.name}" cadastrado com sucesso.`;

  } catch (error) {

    console.error("Erro ao cadastrar cliente:", error);

    formFeedback.textContent =
      "Não foi possível concluir o cadastro. Verifique a conexão com o servidor e tente novamente.";
  }
});

clientForm.addEventListener("reset", function () {
    formFeedback.textContent = "";
});

carregarClientes();
