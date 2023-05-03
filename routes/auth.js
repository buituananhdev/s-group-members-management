const express = require('express');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const { validate_login } = require('../middleware/validate');
auth.use(express.json());
auth.use(express.urlencoded({ extended: true }));
const connection = require('../database/connection');
const hashPassword = require('../middleware/hashPassword');

auth.post('/register', (req, res) => {
    const { fullname, gender, age, username, password } = req.body;
    const query1 = 'SELECT * FROM Users WHERE username = ?';
    let check = false;
    connection.query(query1, [username], (error, results) => {
        if (error) {
            console.error(error);
            check = true;
            return res.status(500).send('Error retrieving user');
        }
        if (results.length != 0) {
            check = true;
            return res.status(404).send('Username already exist');
        }
    });
    if(check) {
        return;
    }
    const { hashPass, salt } = hashPassword(password);
    // insert to db
    const query2 =
        'INSERT INTO Users (fullname, gender, age, username, password, salt) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(
        query2,
        [fullname, gender, age, username, hashPass, salt],
        (error) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error register');
            }
            return res.status(201).send('Register successfully');
        }
    );
});

auth.post('/login', validate_login, (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM Users WHERE username = ?';
    connection.query(query, [username], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error retrieving user');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        const userFind = results[0];
        const { hashPass } = hashPassword(password, userFind.salt);
        if (hashPass === userFind.password) {
            var token = jwt.sign(
                { username: username },
                // eslint-disable-next-line no-undef
                process.env.SECRET_KEY,
                {
                    algorithm: 'HS256',
                    expiresIn: '1d',
                    issuer: 'TuanAnh',
                }
            );
            return res
                .status(200)
                .json({ status: 'success', access_token: token });
        } 
        return res.status(400).json({
            message: 'Invalid username or password',
        });
    });
});
// Exports cho biến user_router
module.exports = auth;
