
"use strict";

const clientes = [
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

function listarTodos() {
    return clientes;
}

function buscarPorId(id) {
    const cliente = clientes.find(function (item) {
        return item.id === id;
    });

    return cliente || null;
}

module.exports = {
    listarTodos,
    buscarPorId
};
