const express = require('express');
const user_router = express.Router();
const { validate_name } = require('../middleware/validate');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const getCreatedBy = require('../middleware/getCreatedBy');
user_router.use(express.json());
user_router.use(express.urlencoded({ extended: true }));
const {
    getUsers,
    getUserByInformation,
    addUser,
    deleteUserById,
    updateUser,
} = require('../database/UserContext');

const {
    createUserRole,
} = require('../database/AuthorizationContext');

// Get users with pagination
user_router.get(
    '',
    authentication,
    authorization(['admin', 'moderator']),
    async (req, res) => {
        try {
            const PAGE_SIZE = parseInt(req.query.pageSize) || 10;
            const { page = 1, email = '', fullname = '' } = req.query;

            const { users, totalPages, totalCount } = await getUsers(
                page,
                PAGE_SIZE,
                email,
                fullname
            );

            return res.status(200).json({
                status: 'success',
                data: users,
                meta: {
                    currentPage: parseInt(page),
                    totalPages,
                    pageSize: PAGE_SIZE,
                    totalCount,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error retrieving users');
        }
    }
);

// Get user information by id
user_router.get(
    '/:id',
    authentication,
    authorization(['admin', 'moderator']),
    async (req, res) => {
        const id = parseInt(req.params.id);

        try {
            const user = await getUserByInformation('id', id);
            if (!user) {
                return res
                    .status(400)
                    .send({ status: 'failure', message: 'User not found' });
            }
            return res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            console.error(error);
            return res.status(404).send('User not found');
        }
    }
);

// Add new user
user_router.post(
    '',
    authentication,
    authorization(['admin', 'moderator']),
    validate_name,
    getCreatedBy,
    async (req, res) => {
        const {
            fullname,
            gender,
            age,
            email,
            username,
            password,
            created_by,
            role_id,
        } = req.body;
        const created_at = new Date();

        try {
            const user = await addUser({
                fullname,
                gender,
                age,
                created_at,
                created_by,
                email,
                username,
                password,
            });
            await createUserRole(user.id, role_id);
            return res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            console.error(error);
            return res
                .status(404)
                .send({ status: 'failure', message: 'Error adding user' });
        }
    }
);

// Delete user by id
user_router.delete(
    '/:id',
    authentication,
    authorization(['admin', 'moderator']),
    async (req, res) => {
        const id = parseInt(req.params.id);

        try {
            const result = await deleteUserById(id);
            if (!result) {
                return res
                    .status(404)
                    .send({ status: 'failure', message: 'User not found' });
            }
            return res
                .status(200)
                .send({
                    status: 'success',
                    message: 'User deleted successfully',
                });
        } catch (error) {
            console.error(error);
            return res
                .status(404)
                .send({ status: 'failure', message: 'Error remove user' });
        }
    }
);

// Update user
user_router.put(
    '/:id',
    authentication,
    authorization(['admin', 'moderator']),
    validate_name,
    async (req, res) => {
        const id = parseInt(req.params.id);
        const { fullname, gender, age } = req.body;

        try {
            const result = await updateUser(id, { fullname, gender, age });
            if (!result) {
                return res
                    .status(400)
                    .send({ status: 'failure', message: 'User not found ' });
            }
            return res.status(204).end();
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error updating user');
        }
    }
);

// Export the user_router
module.exports = user_router;
