
"use strict";

const clientesService = require("../services/clientes.service");

function listarClientes(req, res) {
    const clientes = clientesService.listarTodos();

    return res.status(200).json(clientes);
}

function buscarClientePorId(req, res) {
  
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "O ID deve ser um inteiro positivo."
        });
    }

    const cliente = clientesService.buscarPorId(id);

    if (!cliente) {
        return res.status(404).json({
            error: "Cliente não encontrado."
        });
    }

    return res.status(200).json(cliente);
}

module.exports = {
    listarClientes,
    buscarClientePorId
};
