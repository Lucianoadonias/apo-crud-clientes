
"use strict";


const clientForm = document.querySelector("#client-form");
const nameInput = document.querySelector("#client-name");
const emailInput = document.querySelector("#client-email");
const phoneInput = document.querySelector("#client-phone");

const clientsList = document.querySelector("#clients-list");
const emptyState = document.querySelector("#empty-state");
const formFeedback = document.querySelector("#form-feedback");
const listFeedback = document.querySelector("#list-feedback");

const submitButton = clientForm.querySelector('button[type="submit"]');

const clients = [
    {
        id: 1,
        name: "Ana Souza",
        email: "ana.souza@example.com",
        phone: "(45) 99999-1111"
    },
    {
        id: 2,
        name: "Carlos Lima",
        email: "carlos.lima@example.com",
        phone: "(45) 98888-2222"
    },
    {
        id: 3,
        name: "Mariana Costa",
        email: "mariana.costa@example.com",
        phone: ""
    }
];

let nextClientId = 4;
let editingClientId = null;

function createActionButton(label, action, client) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `action-button action-button--${action}`;
    button.dataset.action = action;
    button.dataset.clientId = String(client.id);
    button.textContent = label;

    button.setAttribute(
        "aria-label",
        `${label} cliente ${client.name}`
    );

    return button;
}

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

        const editButton = createActionButton(
            "Editar",
            "edit",
            client
        );

        const deleteButton = createActionButton(
            "Excluir",
            "delete",
            client
        );

        actionsCell.append(editButton, deleteButton);

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

    let successMessage;

    if (editingClientId !== null) {

        const clientToUpdate = clients.find(function (client) {
            return client.id === editingClientId;
        });

        if (!clientToUpdate) {
            formFeedback.textContent =
                "Não foi possível localizar o cliente.";
            return;
        }

        clientToUpdate.name = name;
        clientToUpdate.email = email;
        clientToUpdate.phone = phone;

        successMessage = "Cliente atualizado com sucesso.";
    } else {

        clients.push({
            id: nextClientId,
            name: name,
            email: email,
            phone: phone
        });

        nextClientId++;

        successMessage = "Cliente cadastrado com sucesso.";
    }

    renderClients();
    clientForm.reset();

    formFeedback.textContent = successMessage;
});


clientsList.addEventListener("click", function (event) {
   
    const clickedButton = event.target.closest(
        "button[data-action]"
    );

    if (!clickedButton || !clientsList.contains(clickedButton)) {
        return;
    }

    const clientId = Number(clickedButton.dataset.clientId);

    const action = clickedButton.dataset.action;

    const client = clients.find(function (item) {
        return item.id === clientId;
    });

    if (!client) {
        listFeedback.textContent =
            "Não foi possível localizar esse cliente.";
        return;
    }

    if (action === "edit") {
        nameInput.value = client.name;
        emailInput.value = client.email;
        phoneInput.value = client.phone;

        editingClientId = client.id;

        submitButton.textContent = "Salvar alterações";

        formFeedback.textContent =
            `Editando o cliente ${client.name}.`;

        nameInput.focus();
    }


    if (action === "delete") {
        const confirmed = window.confirm(
            `Deseja realmente excluir o cliente ${client.name}?`
        );

        if (!confirmed) {
            return;
        }

        const clientIndex = clients.findIndex(function (item) {
            return item.id === clientId;
        });

        if (clientIndex === -1) {
            listFeedback.textContent =
                "Não foi possível localizar esse cliente.";
            return;
        }

        clients.splice(clientIndex, 1);

        if (editingClientId === clientId) {
            clientForm.reset();
        }

        renderClients();

        listFeedback.textContent =
            `Cliente ${client.name} excluído com sucesso.`;
    }
});

clientForm.addEventListener("reset", function () {
    editingClientId = null;

    submitButton.textContent = "Cadastrar cliente";

    formFeedback.textContent = "";
});

renderClients();
