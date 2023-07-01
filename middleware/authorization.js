const {
    getRoleById
} = require('../database/AuthorizationContext');
function authorization(roles) {
    return async (req, res, next) => {
        const userRoles = req.body.user_role;
        const roleNames = [];
        for(let i = 0;i< userRoles.length;i++) {
            console.log(userRoles[i].role_id);
            roleNames[i] = await getRoleById(userRoles[i].role_id)
        }
        const hasAuthorizedRole = roleNames.some((roleName) =>
            roles.includes(roleName)
        );
        if (!hasAuthorizedRole) {
            return res.status(403).json({ message: 'Unauthorized access' });
        } else {
            next();
        }
    };
}

module.exports = authorization;
