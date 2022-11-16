'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/',
    body('name').isLength({min : 3}).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('passwd').isLength({min:8}).trim,
    userController.createUser);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit users.');
});

router.delete('/:userId', userController.deleteUser);

module.exports = router
