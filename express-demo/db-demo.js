
require('dotenv').config({path:'./express-demo/.env'});
const mysql = require('mysql2')

const connection = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    dateStrings: true,
    });


module.exports = connection; // export connection object    