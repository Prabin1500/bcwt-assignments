'use strict';
//userController


const userModel = require('../models/userModel');

const users = userModel.users;

const getUsers = (req, res) => {
    users.map(user =>{
        delete user.password;
        return user;
    });

    res.json(users);
};

const getUser = (req,res) => {
    //choose only one user with matching id
    const user = users.filter(user => req.params.userId == user.id)[0];

    if(user){
        delete user.password;
        res.json(user);
    }else{
        res.sendStatus(404);
    }
};

const modifyUser = (req, res) => {
    
};

const createUser =  (req, res) => {
    const message = `username: ${req.body.name}, email: ${req.body.email}`;
    res.send(message);
};

const deleteUser =  (req, res) => {
    
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,

}