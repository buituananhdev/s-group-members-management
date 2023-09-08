const express = require('express');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const mailService = require('../services/mail.service');
const { validate_login } = require('../helpers/validator');
auth.use(express.json());
auth.use(express.urlencoded({ extended: true }));
const hashPassword = require('../helpers/HashPassword');
const {
    getUserByInformation,
    addUser
} = require('../database/UserContext');

const {
    createUserRole,
    getUserRole
} = require('../database/AuthorizationContext')
auth.post('/register', async (req, res) => {
    const { fullname, gender, age, username, password, email } = req.body;

    try {
        const user = await getUserByInformation('username', username);
        if (user) {
            return res.status(404).send('Username already exists');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error retrieving user');
    }
    const created_by = null;
    try {
        const user = await addUser({
            fullname,
            gender,
            age,
            created_by,
            email,
            username,
            password,
        });
        await createUserRole({ user_id: user, role_id: 1});
        return res.status(201).send({status: 'success', data: user});
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error register');
    }
});

auth.post('/login', validate_login, async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByInformation('username', username);
        if (!user) {
            return res.status(400).send({ status: 'failure', message: 'User not found'});
        }
        const { hashPass } = hashPassword(password, user.salt);
        if (hashPass === user.password) {
            const userRole = await getUserRole(user.id);
            console.log('role =', userRole);
            const token = jwt.sign(
                { username: username, user_id: user.id, user_role: userRole },
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
        } else {
            return res.status(400).json({
                message: 'Invalid username or password',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error retrieving user');
    }
});

auth.post('/forgot', (req, res) => {
    const { emailForm, emailTo, emailSubject, emailText } = req.body;
    try {
        let result = mailService.sendMail({
            emailForm,
            emailTo,
            emailSubject,
            emailText,
        });
        if (result) {
            res.status(200).send('Email sent successfully');
        } else {
            res.status(400).send('Error occurred while sending email');
        }
    } catch (err) {
        console.error(err);
        res.send('Error occurred while sending email');
    }
});

auth.post('/reset_password', async (req, res) => {
    try {
        const { email, new_pass, token } = req.body;
        const user = await knex('Users').select().where('email', email).first();

        if (!user) {
            return res.status(404).send('Email does not exist');
        }

        if (!token) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        const verify = jwt.verify(token, process.env.SECRET_KEY);

        if (verify) {
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(new_pass, salt);

            await knex('Users')
                .where('email', email)
                .update({ password: hashPass, salt: salt });

            return res.status(200).send('Update successfully');
        }

        return res.status(401).json({
            message: 'Invalid token',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error');
    }
});

// Exports cho biến user_router
module.exports = auth;
