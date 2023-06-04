const knex = require('./connection');
const hashPassword = require('../middleware/hashPassword');


// Function to retrieve users with pagination
const getUsers = async (page, pageSize, email, fullname) => {
    const offset = (page - 1) * pageSize;

    const query = knex('Users')
        .select('*')
        .where('email', 'like', `%${email}%`)
        .andWhere('fullname', 'like', `%${fullname}%`)
        .offset(offset)
        .limit(pageSize);

    const users = await query;

    const totalCountQuery = knex('Users')
        .count('id as count')
        .where('email', 'like', `%${email}%`)
        .andWhere('fullname', 'like', `%${fullname}%`);
    const totalCount = await totalCountQuery;

    const totalPages = Math.ceil(totalCount[0].count / pageSize);

    return {
        users,
        totalPages,
        totalCount: totalCount[0].count,
    };
};

// Function to get user information by id
const getUserByInformation = async (type, data) => {
    const [user] = await knex('Users').select('*').where(type, data);
    if (!user) {
        throw new Error('User not found');;
    }

    return user;
};

// Function to add a new user
const addUser = async (userData) => {
    const { fullname, gender, age, email, username, password, created_by } =
        userData;
    const created_at = new Date();
    const { hashPass, salt } = hashPassword(password);
    try {
        const user = await knex('Users').insert({
            fullname,
            gender,
            age,
            created_at,
            created_by,
            email,
            username,
            password: hashPass,
            salt: salt,
        });

        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding user');
    }
};

// Function to delete a user by id
const deleteUserById = async (id) => {
    try {
        const deletedUser = await knex('Users').where('id', id).del();

        if (deletedUser === 0) {
            throw new Error('User not found');
        }

        return deletedUser;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting user');
    }
};

// Function to update a user
const updateUser = async (id, userData) => {
    const { fullname, gender, age } = userData;

    try {
        const result = await knex('Users')
            .where('id', id)
            .update({ fullname, gender, age });

        if (result === 0) {
            throw new Error(`User with id ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error updating user');
    }
};

// Export all the functions
module.exports = {
    getUsers,
    getUserByInformation,
    addUser,
    deleteUserById,
    updateUser,
};
