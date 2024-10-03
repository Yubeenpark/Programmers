const express = require('express');
const app = express();
const api = require("./routes");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", api)


app.listen(process.env.PORT);
console.log('open server...in '+process.env.PORT);