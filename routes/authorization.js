const express = require('express');
const authore = express.Router();
authore.use(express.json());
authore.use(express.urlencoded({ extended: true }));

const {
    createUserRole,
    getUserRoles,
    deleteUserRole,
    createRole,
    getRoles,
    updateRole,
    deleteRole,
    createRolePermission,
    getRolePermissions,
    deleteRolePermission,
    createPermission,
    getPermissions,
    updatePermission,
    deletePermission,
    createPermissionGroup,
    getPermissionGroups,
    updatePermissionGroup,
    deletePermissionGroup,
    getUserRole,
} = require('../database/AuthorizationContext');

authore.post('/user_role', async (req, res) => {
    const userRoleData = req.body;

    try {
        const userRole = await createUserRole(userRoleData);
        res.json(userRole);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user role' });
    }
});

authore.get('/user_role/:userRoleId', async (req, res) => {
    const { userRoleId } = req.params;
    try {
        const userRole = await getUserRole(userRoleId);
        if(userRole) {
            return res.status(200).json({status: 'success', data: userRole})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve user roles' });
    }
})

authore.get('/user_roles', async (req, res) => {
    try {
        const userRoles = await getUserRoles();
        res.json(userRoles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve user roles' });
    }
});

authore.delete('/user_role/:userRoleId', async (req, res) => {
    const { userRoleId } = req.params;
    try {
        const deletedUserRole = await deleteUserRole(userRoleId);
        res.json(deletedUserRole);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user role' });
    }
});

authore.post('/role', async (req, res) => {
    const roleData = req.body;
    try {
        const role = await createRole(roleData);
        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create role' });
    }
});

authore.get('/roles', async (req, res) => {
    try {
        const roles = await getRoles();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve roles' });
    }
});

authore.get('/role/:roleId', async (req, res) => {
    const { roleId } = req.params;
    try {
        const role = await getRoleById(roleId);
        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve role' });
    }
});

authore.put('/role/:roleId', async (req, res) => {
    const { roleId } = req.params;
    const updatedRoleData = req.body;
    try {
        const updatedRole = await updateRole(roleId, updatedRoleData);
        res.json(updatedRole);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update role' });
    }
});

authore.delete('/role/:roleId', async (req, res) => {
    const { roleId } = req.params;
    try {
        const deletedRole = await deleteRole(roleId);
        res.json(deletedRole);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete role' });
    }
});

authore.post('/role_permission', async (req, res) => {
    const rolePermissionData = req.body;

    try {
        const rolePermission = await createRolePermission(rolePermissionData);
        res.json(rolePermission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create role permission' });
    }
});

authore.get('/role_permissions', async (req, res) => {
    try {
        const rolePermissions = await getRolePermissions();
        res.json(rolePermissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve role permissions' });
    }
});

authore.delete('/role_permission/:rolePermissionId', async (req, res) => {
    const { rolePermissionId } = req.params;
    try {
        const deletedRolePermission = await deleteRolePermission(
            rolePermissionId
        );
        res.json(deletedRolePermission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete role permission' });
    }
});

authore.post('/permission', async (req, res) => {
    const permissionData = req.body;
    try {
        const permission = await createPermission(permissionData);
        res.json(permission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create permission' });
    }
});

authore.get('/permissions', async (req, res) => {
    try {
        const permissions = await getPermissions();
        res.json(permissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve permissions' });
    }
});

authore.get('/permission/:permissionId', async (req, res) => {
    const { permissionId } = req.params;
    try {
        const permission = await getPermissionById(permissionId);
        res.json(permission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve permission' });
    }
});

authore.put('/permission/:permissionId', async (req, res) => {
    const { permissionId } = req.params;
    const updatedPermissionData = req.body;
    try {
        const updatedPermission = await updatePermission(
            permissionId,
            updatedPermissionData
        );
        res.json(updatedPermission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update permission' });
    }
});

authore.delete('/permission/:permissionId', async (req, res) => {
    const { permissionId } = req.params;
    try {
        const deletedPermission = await deletePermission(permissionId);
        res.json(deletedPermission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete permission' });
    }
});

authore.post('/permission_group', async (req, res) => {
    const permissionGroupData = req.body;
    try {
        const permissionGroup = await createPermissionGroup(
            permissionGroupData
        );
        res.json(permissionGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create permission group' });
    }
});

authore.get('/permission_groups', async (req, res) => {
    try {
        const permissionGroups = await getPermissionGroups();
        res.json(permissionGroups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve permission groups' });
    }
});

authore.put('/permission_group/:permissionGroupId', async (req, res) => {
    const { permissionGroupId } = req.params;
    const updatedPermissionGroupData = req.body;
    try {
        const updatedPermissionGroup = await updatePermissionGroup(
            permissionGroupId,
            updatedPermissionGroupData
        );
        res.json(updatedPermissionGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update permission group' });
    }
});

authore.delete('/permission_group/:permissionGroupId', async (req, res) => {
    const { permissionGroupId } = req.params;
    try {
        const deletedPermissionGroup = await deletePermissionGroup(
            permissionGroupId
        );
        res.json(deletedPermissionGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete permission group' });
    }
});

module.exports = authore;
