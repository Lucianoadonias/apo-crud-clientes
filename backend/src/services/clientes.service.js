"use strict";

const clientes = [
    {
        id: 1,
        name: "Ana Souza",
        email: "ana.souza@example.com",
        phone: "(45) 99999-1111",
    },
    {
        id: 2,
        name: "Carlos Lima",
        email: "carlos.lima@example.com",
        phone: "(45) 98888-2222",
    },
    {
        id: 3,
        name: "Mariana Costa",
        email: "mariana.costa@example.com",
        phone: "",
    },
];

let proximoId = 4;

function listarTodos() {
    return clientes;
}

function buscarPorId(id) {
    const cliente = clientes.find(function (item) {
        return item.id === id;
    });

    return cliente || null;
}

function cadastrar(dados) {
    const novoCliente = {
        id: proximoId,
        name: dados.name,
        email: dados.email,
        phone: dados.phone,
    };

    proximoId++;

    clientes.push(novoCliente);

    return novoCliente;
}

module.exports = {
    listarTodos,
    buscarPorId,
    cadastrar,
};
