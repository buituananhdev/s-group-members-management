const express = require('express');
const user_router = express.Router();


const fs = require('fs');
const path = require('path');
// get the path to the users.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// get the initial users from the users.json file
let arr = [];
if (fs.existsSync(usersFilePath)) {
    arr = JSON.parse(fs.readFileSync(usersFilePath));
}

// get all users
user_router.get('', (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.status(200).send(arr);
})

// get information user by id
user_router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userFind = arr.find((user) => user.id === id);
    if (userFind) {
        res.status(200).send(userFind);
    } else {
        res.status(400).send("User not found!");
    }
})

// add new user
user_router.post('', (req, res) => {
    let newUser = Object.assign({id: arr.length + 1}, {...req.body});
    arr.push(newUser);
    // write the updated users array to the users.json file
    fs.writeFileSync(usersFilePath, JSON.stringify(arr));
    res.status(201).send(arr[arr.length -1 ]);
})

// delete user by id
user_router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = arr.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        res.status(404).send(`User with id ${id} not found`);
        return;
    }
    arr = arr.filter((user) => user.id !== id);
    fs.writeFileSync(usersFilePath, JSON.stringify(arr));
    res.status(204).end();
});

// update user by id
user_router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = arr.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        res.status(404).send(`User with id ${id} not found`);
        return;
    }
    const userUpdate = Object.assign({}, arr[userIndex], req.body);
    arr[userIndex] = userUpdate;
    fs.writeFileSync(usersFilePath, JSON.stringify(arr));
    res.status(204).end();
});

// Exports cho biến user_router
module.exports = user_router;