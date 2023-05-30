const express = require('express');
const user_router = express.Router();
const jwt = require('jsonwebtoken');
const { validate_name } = require('../middleware/validate');
const authentication = require('../middleware/authentication');
user_router.use(express.json());
user_router.use(express.urlencoded({ extended: true }));
const knex = require('../database/connection');
// get all users
user_router.get('', authentication, async (req, res) => {
    try {
        const users = await knex('Users').select('*');
        return res.status(200).json({ status: 'success', data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error retrieving users');
    }
});

// get information user by id
user_router.get('/:id', authentication, async (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM Users WHERE id = ?';
    const [user] = await connection.query(query, [id]);
    try {
        if (!user) {
            return res.status(404).send('User not found');
        }
    } catch (error) {
        return res.status(404).send('User not found');
    }
});

// add new user
user_router.post('', authentication, validate_name, async (req, res) => {
    const { fullname, gender, age, email, username, password } = req.body;
    const created_at = new Date();
    const token = req.headers['authorization'].slice(7);
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const created_by = verify.user_id;
    try {
        const user = await knex('Users').insert({
            fullname,
            gender,
            age,
            created_at,
            created_by,
            email,
            username,
            password,
        });
        return res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error deleting user');
    }
});

// delete user by id
user_router.delete('/:id', authentication, async (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM Users WHERE id = ?';
    try {
        const deletedUser = await knex('Users').where('id', id).del();
        if (deletedUser === 0) {
            return res.status(404).send('User not found');
        }
        return res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error deleting user');
    }
});

// update user
user_router.put('/:id', authentication, validate_name, async (req, res) => {
    const id = parseInt(req.params.id);
    const { fullname, gender, age } = req.body;
    const query =
        'UPDATE Users SET fullname = ?, gender = ?, age = ? WHERE id = ?';
    try {
        const [result] = await connection.query(query, [
            fullname,
            gender,
            age,
            id,
        ]);
        if (!result) {
            return res.status(404).send(`User with id ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error updating user');
    }
    return res.status(204).end();
});

// Exports cho biến user_router
module.exports = user_router;
