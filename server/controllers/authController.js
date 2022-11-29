'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {validationResult} = require('express-validator');
const {addUser} = require('../models/userModel');
require('dotenv').config();

const login = (req, res) => {
    passport.authenticate('local',{session: false}, (err, user, info) =>{
        if(err || !user ){
            return res.status(400).json({
                message:'something went wrong',
                user: user,
            });
        }

        req.login(user, {session:false}, (err) => {
            if(err){
                res.render(err);
            }

            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({user,token});
        });
    })(req,res);
};

const register = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser = req.body;
    if (!newUser.role) {
      // default user role (normal user)
      newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
      const result = await addUser(newUser, res);
      res.status(201).json({ message: 'user created', userId: result });
    } else {
      res.status(400).json({
        message: 'user creation failed',
        errors: errors.array(),
      });
    }
  };
  
  const logout = (req, res) => {
    console.log('some user logged out');
    res.json({message: 'logged out'});
  };

module.exports = {
    login,
    logout,
    register,
};