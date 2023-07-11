const mysql = require('mysql2');
require('dotenv').config();

const dbConfigPool = mysql.createPool({
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER_LOCAL,
    password: '',
    database: process.env.DB_NAME_LOCAL
});

module.exports = dbConfigPool;