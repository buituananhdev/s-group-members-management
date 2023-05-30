const connection = require('../database/connection');
require('dotenv').config();

async function createTable() {
    const createTableSql = `CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(30),
    username VARCHAR(30),
    password VARCHAR(500),
    email NVARCHAR(30),
    salt NVARCHAR(100),
    gender INT,
    age INT CHECK(age > 0))`;
    await connection.query(createTableSql);
}

createTable();

// const query = "INSERT INTO Users (fullname, username, password, email, gender, age) VALUES ('Bui Tuan Anh', 'anh', '123','anhaanh2003@gmail.com', true, 18)";
// connection.query(query, (err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Data inserted successfully');
//     }
// });