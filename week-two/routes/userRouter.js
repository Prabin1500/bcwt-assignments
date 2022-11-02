'use strict';
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/', (req,res) => {
    res.send('From this endpoint you can add more users');
})

module.exports = router
