const {
    getSigleRolePermission
} = require('../database/AuthorizationContext');
function authorization(permissionID) {
    return async (req, res, next) => {
        const userRoles = req.body.user_role;
        const checkArr = [];
        for(let i = 0;i < userRoles.length;i++) {
            checkArr[i] = await getSigleRolePermission(userRoles[i].role_id, permissionID)
        }
        if (checkArr.length <= 0 || !checkArr.some(item => item !== undefined)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        } else {
            next();
        }
    };
}

module.exports = authorization;
