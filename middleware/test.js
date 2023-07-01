const express = require('express');
const app = express();

// Example user data with roles and permissions
const users = [
    {
        id: 1,
        name: 'Admin',
        role: 'admin',
        permissions: ['read', 'create', 'update', 'delete'],
    },
    {
        id: 2,
        name: 'Student',
        role: 'student',
        permissions: ['read', 'create', 'update'],
    },
    {
        id: 3,
        name: 'Manager',
        role: 'manager',
        permissions: ['read', 'create', 'update'],
    },
];

// Middleware to check user's permissions for a given route
const authorize = (routePermission) => {
    return (req, res, next) => {
        const { role, permissions } = req.user;

        if (permissions.includes(routePermission)) {
            return next();
        }

        return res.status(403).json({ message: 'Unauthorized' });
    };
};

// GET route for all users
app.get('/users', authorize('read'), (req, res) => {
    // Return all users
    res.json(users);
});

// POST route for creating a new user
app.post('/users', authorize('create'), (req, res) => {
    // Create a new user object with a unique ID
    const newUser = {
        id: users.length + 1,
        ...req.body,
    };

    // Add the new user to the array of users
    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT route for updating a user
app.put('/users/:id', authorize('update'), (req, res) => {
    const { id } = req.params;

    // Find the user with the given ID
    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex !== -1) {
        // Update the user object
        users[userIndex] = {
            ...users[userIndex],
            ...req.body,
        };

        return res.json(users[userIndex]);
    }

    return res.status(404).json({ message: 'User not found' });
});

// DELETE route for deleting a user
app.delete('/users/:id', authorize('delete'), (req, res) => {
    const { id } = req.params;

    // Find the index of the user with the given ID
    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex !== -1) {
        // Remove the user from the array of users
        users.splice(userIndex, 1);

        return res.json({ message: 'User deleted successfully' });
    }

    return res.status(404).json({ message: 'User not found' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
