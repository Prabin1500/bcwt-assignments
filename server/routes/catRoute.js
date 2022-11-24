'use strict';
// catRoute

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');
const catController = require('../controllers/catController');
const { ContextBuilder } = require("express-validator/src/context-builder");

const fileFilter = (req, file, cb) => {
    //this function should call cb with a boolean
    //to indicate if the file should be accepted
    const acceptedTypes = ['image/jpeg', 'image/png','image/gif'];

    if(acceptedTypes.includes(file.mimetype)){
        cb(null, true);
    }else {
        cb(null, false);
    }
};

const upload = multer({dest:'uploads/'});

router
    .get('/',catController.getCats)
    .get('/:catId', catController.getCat)
    .post('/',
        upload.single('cat'),
        body('name').isLength({min: 2}).trim().escape(),
        body('birthdate').isDate(),
        body('weight').isFloat({min:0.1, max: 30}),
        body('owner').isInt({min:1}),
        catController.createCat)
    .put('/', catController.modifyCat)
    .put('/:catId', catController.modifyCat)    
    .delete('/:catId', catController.deleteCat);
  
module.exports = router;