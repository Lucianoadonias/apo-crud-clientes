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
            error: "O ID deve ser um inteiro positivo.",
        });
    }

    const cliente = clientesService.buscarPorId(id);

    if (!cliente) {
        return res.status(404).json({
            error: "Cliente não encontrado.",
        });
    }

    return res.status(200).json(cliente);
}

function cadastrarCliente(req, res) {
    // Obtém o corpo da requisição.
    const body = req.body;

    // Verifica se recebemos um objeto JSON apropriado.
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            error: "Envie os dados do cliente em um objeto JSON.",
        });
    }

    // Aceita apenas textos nos campos obrigatórios.
    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email = typeof body.email === "string" ? body.email.trim() : "";

    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    // Valida os campos obrigatórios.
    if (!name || !email) {
        return res.status(400).json({
            error: "Nome e e-mail são obrigatórios.",
        });
    }

    // Verifica o formato básico do endereço de e-mail.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            error: "Informe um endereço de e-mail válido.",
        });
    }

    // Solicita ao service que cadastre o cliente.
    const novoCliente = clientesService.cadastrar({
        name,
        email,
        phone,
    });

    // Retorna o cliente criado e o status HTTP 201.
    return res.status(201).json(novoCliente);
}

module.exports = {
    listarClientes,
    buscarClientePorId,
    cadastrarCliente,
};
