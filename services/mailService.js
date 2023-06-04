const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const mailService = {
    async sendMail({ emailForm, emailTo, emailSubject, emailText }) {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        var token = jwt.sign(
            { email: emailTo },
            // eslint-disable-next-line no-undef
            process.env.SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: '1h',
                issuer: 'TuanAnh',
            }
        );

        const resetUrl = `http://localhost:3000/reset_password/${token}`;
        await transporter.sendMail({
            from: emailForm,
            to: emailTo,
            subject: emailSubject,
            text: `If the confirm button does not work.
            Please copy and paste this link into your web browser, ${resetUrl}
            Thank you!`,
            html: `To complete the password reset process. Please click <a href="${resetUrl}">here</a> to reset your password`,
        });
    },
};

Object.freeze(mailService);

module.exports = mailService;
