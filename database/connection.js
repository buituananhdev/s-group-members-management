const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456Anh@',
    database: 'SGROUP_BACKEND',
});

module.exports = connection;