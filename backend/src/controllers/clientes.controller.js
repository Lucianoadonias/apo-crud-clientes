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
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            error: "Envie os dados do cliente em um objeto JSON.",
        });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email = typeof body.email === "string" ? body.email.trim() : "";

    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || !email) {
        return res.status(400).json({
            error: "Nome e e-mail são obrigatórios.",
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            error: "Informe um endereço de e-mail válido.",
        });
    }

    const novoCliente = clientesService.cadastrar({
        name,
        email,
        phone,
    });

    return res.status(201).json(novoCliente);
}

function atualizarCliente(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "O ID deve ser um inteiro positivo.",
        });
    }

    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            error: "Envie os dados do cliente em um objeto JSON.",
        });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email = typeof body.email === "string" ? body.email.trim() : "";

    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || !email) {
        return res.status(400).json({
            error: "Nome e e-mail são obrigatórios.",
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            error: "Informe um endereço de e-mail válido.",
        });
    }

    const clienteAtualizado = clientesService.atualizar(id, {
        name,
        email,
        phone,
    });

    if (!clienteAtualizado) {
        return res.status(404).json({
            error: "Cliente não encontrado.",
        });
    }

    return res.status(200).json(clienteAtualizado);
}

function excluirCliente(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "O ID deve ser um inteiro positivo.",
        });
    }

    const clienteExcluido = clientesService.excluir(id);

    if (!clienteExcluido) {
        return res.status(404).json({
            error: "Cliente não encontrado.",
        });
    }

    return res.status(200).json({
        message: "Cliente excluído com sucesso.",
        cliente: clienteExcluido,
    });
}

module.exports = {
    listarClientes,
    buscarClientePorId,
    cadastrarCliente,
    atualizarCliente,
    excluirCliente,
};
