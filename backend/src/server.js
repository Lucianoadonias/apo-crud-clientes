"use strict";

const express = require("express");
const clientesRoutes = require("./routes/clientes.routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/clientes", clientesRoutes);

app.get("/health", function (req, res) {
    res.status(200).json({
        status: "ok",
        message: "API de clientes funcionando",
    });
});

app.listen(PORT, function () {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
