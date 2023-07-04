const knex = require('./Connection');
// USER ROLE API
const createUserRole = async (userRoleData) => {
    try {
        const userRole = await knex('UserRole').insert(userRoleData);
        return userRole;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding user role');
    }
};

const getUserRoles = async () => {
    try {
        const userRoles = await knex('UserRole').select('*');
        return userRoles;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving user roles');
    }
};

const getUserRole = async (userId) => {
    try {
        const userRole = await knex('UserRole')
            .join('Users', 'UserRole.user_id', '=', 'Users.id')
            .where('Users.id', userId)
            .select('UserRole.*');
        return userRole;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving user role');
    }
};

const deleteUserRole = async (userid) => {
    try {
        const deletedUserRole = await knex('UserRole')
            .where('Userid', userid)
            .del();
        return deletedUserRole;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting user role');
    }
};

// ROLE API
const createRole = async (roleData) => {
    try {
        const role = await knex('Role').insert(roleData);
        return role;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding role');
    }
};

const getRoles = async () => {
    try {
        const roles = await knex('Role').select('*');
        return roles;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving roles');
    }
};

const updateRole = async (roleID, updatedRoleData) => {
    try {
        const updatedRole = await knex('Role')
            .where('id', roleID)
            .update(updatedRoleData);
        return updatedRole;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating role');
    }
};

const getRoleById = async (roleID) => {
    try {
        const [deletedRole] = await knex('Role').select('*').where('id', roleID);
        return deletedRole.role_name;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting role');
    }
};

const deleteRole = async (roleID) => {
    try {
        const deletedRole = await knex('Role').where('id', roleID).del();
        return deletedRole;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting role');
    }
};

// ROLE PERMISSION API
const createRolePermission = async (rolePermissionData) => {
    try {
        const rolePermission = await knex('RolePermission').insert(
            rolePermissionData
        );
        return rolePermission;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding role permission');
    }
};

const getSigleRolePermission = async (roleID, permissionID) => {
    try {
        const [rolePermission] = await knex('RolePermission').select('*').where({
            role_id: roleID,
            permission_id: permissionID
            });
        return rolePermission;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving role permissions');
    }
}

const getRolePermissions = async () => {
    try {
        const rolePermissions = await knex('RolePermission').select('*');
        return rolePermissions;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving role permissions');
    }
};

const deleteRolePermission = async (rolePermissionID) => {
    try {
        const deletedRolePermission = await knex('RolePermission')
            .where('RolePermissionID', rolePermissionID)
            .del();
        return deletedRolePermission;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting role permission');
    }
};

// PERMISSION API
const createPermission = async (permissionData) => {
    try {
        const permission = await knex('Permission').insert(permissionData);
        return permission;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding permission');
    }
};

const getPermissions = async () => {
    try {
        const permissions = await knex('Permission').select('*');
        return permissions;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving permissions');
    }
};

const updatePermission = async (permissionID, updatedPermissionData) => {
    try {
        const updatedPermission = await knex('Permission')
            .where('PermissionID', permissionID)
            .update(updatedPermissionData);
        return updatedPermission;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating permission');
    }
};

const deletePermission = async (permissionID) => {
    try {
        const deletedPermission = await knex('Permission')
            .where('PermissionID', permissionID)
            .del();
        return deletedPermission;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting permission');
    }
};


module.exports = {
    createUserRole,
    getUserRoles,
    deleteUserRole,
    createRole,
    getRoles,
    getUserRole,
    updateRole,
    deleteRole,
    createRolePermission,
    getRolePermissions,
    deleteRolePermission,
    createPermission,
    getPermissions,
    updatePermission,
    deletePermission,
    getRoleById,
    getSigleRolePermission
};
