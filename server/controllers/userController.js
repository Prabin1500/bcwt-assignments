'use strict';
//userController

const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

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
    const newUser = req.body;
    if(!newUser.role){
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);

    if (errors.isEmpty()) {
        const result = await userModel.addUser(newUser, res);
        res.status(201).json({message: 'user created', userId: result});
    }else{
        res.status(400).json({
            message: 'user creation failed',
            errors: errors.array()
        });
    }
};

const deleteUser = async (req, res) => {
    const deleteUserById = await userModel.deleteUser(res, req.params.userId);
    res.send("User deleted with id: " + req.params.userId);
    res.json(deleteUserById);
};

const checkToken = (req, res) => {
    delete req.use.password;
    res.json({user: req.user});
};

module.exports = {
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser,
    checkToken,
}