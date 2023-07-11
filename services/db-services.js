const mysql = require('mysql2');
require('dotenv').config();

const dbConfigPool = mysql.createPool({
    host: process.env.DB_HOST_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PSWD_DEV,
    database: process.env.DB_NAME_DEV
});

module.exports = dbConfigPool;