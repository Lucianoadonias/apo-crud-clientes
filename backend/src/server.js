"use strict";

const express = require("express");
const path = require("path");
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

const frontendPath = path.join(__dirname, "../../frontend");

app.use(express.static(frontendPath));

app.listen(PORT, function () {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
