const jwt = require('jsonwebtoken');

const createdByMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'].slice(7);
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const created_by = verify.user_id;
    req.body.created_by = created_by;
    next();
};

module.exports = createdByMiddleware;
