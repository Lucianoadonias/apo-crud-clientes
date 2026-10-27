
"use strict";

const API_URL = "/clientes";

const clientForm = document.querySelector("#client-form");
const clientsList = document.querySelector("#clients-list");
const emptyState = document.querySelector("#empty-state");
const listFeedback = document.querySelector("#list-feedback");
const formFeedback = document.querySelector("#form-feedback");

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

clientForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formFeedback.textContent =
        "O cadastro pela API será integrado na próxima tarefa.";
});

clientForm.addEventListener("reset", function () {
    formFeedback.textContent = "";
});

carregarClientes();
