const express = require('express');
const user_router = express.Router();
const { validate_name } = require('../middleware/validate');
const authentication = require('../middleware/authentication');
user_router.use(express.json());
user_router.use(express.urlencoded({ extended: true }));
const connection = require('../database/connection');
// get all users
user_router.get('', authentication, (req, res) => {
    connection.query('SELECT * FROM Users', (error, results) => {
        if (error) {
            throw error;
        }
        return res.json(results);
    });
});

// get information user by id
user_router.get('/:id', authentication, (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM Users WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error retrieving user');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        return res.send({status: "success", data: results[0]});
    });
});

// add new user
user_router.post('', authentication, validate_name, (req, res) => {
    const { fullname, gender, age } = req.body;
    const query = 'INSERT INTO Users (fullname, gender, age) VALUES (?, ?, ?)';
    connection.query(query, [fullname, gender, age], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error inserting new item');
        }
        return res.status(201).send('New item inserted successfully');
    });
});

// delete user by id
user_router.delete('/:id', authentication, (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM Users WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting user');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        return res.status(200).send('User deleted successfully');
    });
});

// update user
user_router.put('/:id', authentication, validate_name, (req, res) => {
    const id = parseInt(req.params.id);
    const { fullname, gender, age } = req.body;
    const query =
        'UPDATE Users SET fullname = ?, gender = ?, age = ? WHERE id = ?';
    connection.query(query, [fullname, gender, age, id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error updating user');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send(`User with id ${id} not found`);
        }
        return res.status(204).end();
    });
});

// Exports cho biến user_router
module.exports = user_router;
