const express = require('express');
const api = require("./routers")
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", api)
const { swaggerUi, specs } = require("./swagger/swagger.js")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
app.listen(3000);