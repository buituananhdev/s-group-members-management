var jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    const token = req.headers['authorization'].slice(7);
    if (!token) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
    try {
        // eslint-disable-next-line no-undef
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        if (verify) {
            // Lưu thông tin về vai trò và quyền của người dùng vào request
            const user_role = verify.user_role;
            req.body.user_role = user_role;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
}

module.exports = authentication;