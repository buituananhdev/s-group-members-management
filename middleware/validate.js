function validate_name(req, res, next) {
    const regex = /^[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9 ]+$/;
    if (!regex.test(req.body.fullname)) {
        return res
            .status(400)
            .json('Full name cannot contain numbers and special characters!');
    }
    if (req.body.age <= 0) {
        return res.status(400).json('Age must be greater than 0!');
    }
    next();
}

function validate_login(req, res, next) {
    const { username, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!usernameRegex.test(username)) {
        return res
            .status(400)
            .json('Username can only contain letters, numbers, and underscores and must be at least 3 characters long!');
    }
    else if(!passwordRegex.test(password)) {
        return res
            .status(400)
            .json('Password must must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!');
    }
    next();
}

module.exports = {
    validate_name,
    validate_login,
};