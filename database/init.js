const connection = require('../database/connection');

const createTableSql = `CREATE TABLE IF NOT EXISTS abc (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fullname VARCHAR(30),
        gender INT,
        age INT CHECK(age > 0))`;
connection.query(createTableSql, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Table created successfully');
    }
});

const query = "INSERT INTO Users (fullname, gender, age) VALUES ('Bui Tuan Anh', true, 18), ('Bui Tuan Anh', true, 20), ('Nguyen Huy Tuong', true, 20)";
connection.query(query, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Data inserted successfully');
    }
});
