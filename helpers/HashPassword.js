const crypto = require('crypto');

function hashPassword(password, salt) {
    if (!salt) {
        salt = crypto.randomBytes(16).toString('hex');
    }
    const hashPass = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    return { hashPass: hashPass, salt: salt };
}

module.exports = hashPassword;