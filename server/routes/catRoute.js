'use strict';
// catRoute

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');
const catController = require('../controllers/catController');

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

const uploads = multer({dest:'uploads/'});

router.get('/',catController.getCats); 

router.get('/:catId', catController.getCat);

router.post('/',
    uploads.single('cat'),
    body('name').isAlphanumeric(),
    body('birthdate').isDate(),
    body('weight').isFloat({min:0.1, max: 30}),
    body('owner').isInt({min:1}),
    catController.createCat);

router.put('/', catController.modifyCat);

router.put('/:catId', catController.modifyCat);

router.delete('/:catId', catController.deleteCat);
  
module.exports = router;