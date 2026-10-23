
"use strict";

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", function (req, res) {
    res.status(200).json({
        status: "ok",
        message: "API de clientes funcionando"
    });
});

app.listen(PORT, function () {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
