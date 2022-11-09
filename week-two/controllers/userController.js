'use strict';
//userController

const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

const getUser = async (req,res) => {
    //choose only one user with matching id
    const user = await userModel.getUserById(req.params.userId, res);

    if(user){
        res.json(user);
    }else{
        res.sendStatus(404);
    }
};

const modifyUser = (req, res) => {
    
};

const createUser = async (req, res) => {
    //const message = `username: ${req.body.name}, email: ${req.body.email}, password: ${req.body.password}`;
    const user = req.body;
    const result = await userModel.addUser(user, res);
    res.send("User added.");
};

const deleteUser = async (req, res) => {
    const deleteUserById = await userModel.deleteUser(res, req.params.userId);
    res.send("User deleted with id: " + req.params.userId);
    res.json(deleteUserById);
};

module.exports = {
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser,

}