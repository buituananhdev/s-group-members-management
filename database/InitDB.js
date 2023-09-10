const knex = require('./connection');
require('dotenv').config();

async function createTable() {
    await knex.schema.createTableIfNotExists('Users', (table) => {
        table.increments('id').primary();
        table.string('fullname', 30);
        table.string('username', 30);
        table.string('password', 500);
        table.string('email', 30);
        table.string('salt', 100);
        table.integer('gender');
        table.integer('age').check('age', '>', 0);
        table.timestamp('created_at').defaultTo(connection.fn.now());
        table.integer('created_by');
    });
}

createTable();

const users = [
    {
        fullname: 'Sarah Williams',
        username: 'sarahwilliams',
        password: 'password321',
        email: 'sarahwilliams@example.com',
        salt: 'ghi789',
        gender: 2,
        age: 28,
        created_at: new Date(),
        created_by: null,
    },
    {
        fullname: 'Robert Davis',
        username: 'robertdavis',
        password: 'password654',
        email: 'robertdavis@example.com',
        salt: 'jkl012',
        gender: 1,
        age: 40,
        created_at: new Date(),
        created_by: null,
    },
];

await knex('Users').insert(users);