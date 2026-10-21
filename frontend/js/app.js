
"use strict";

const clientForm = document.querySelector("#client-form");
const nameInput = document.querySelector("#client-name");
const emailInput = document.querySelector("#client-email");
const phoneInput = document.querySelector("#client-phone");

const clientsList = document.querySelector("#clients-list");
const emptyState = document.querySelector("#empty-state");
const formFeedback = document.querySelector("#form-feedback");
const listFeedback = document.querySelector("#list-feedback");

const clients = [
    {
        name: "Ana Souza",
        email: "ana.souza@example.com",
        phone: "(45) 99999-1111"
    },
    {
        name: "Carlos Lima",
        email: "carlos.lima@example.com",
        phone: "(45) 98888-2222"
    },
    {
        name: "Mariana Costa",
        email: "mariana.costa@example.com",
        phone: ""
    }
];


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


clientForm.addEventListener("submit", function (event) {
    event.preventDefault();


    formFeedback.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || email === "") {
        formFeedback.textContent =
            "Preencha o nome e o e-mail do cliente.";
        return;
    }

    if (!emailInput.validity.valid) {
        formFeedback.textContent =
            "Informe um endereço de e-mail válido.";
        return;
    }

    clients.push({
        name: name,
        email: email,
        phone: phone
    });

    renderClients();
    clientForm.reset();

    formFeedback.textContent =
        "Cliente cadastrado com sucesso.";
});

clientForm.addEventListener("reset", function () {
    formFeedback.textContent = "";
});

renderClients();
