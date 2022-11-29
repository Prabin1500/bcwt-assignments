'use strict';
// catController

const catModel = require('../models/catModel');
const {validationResult} = require("express-validator");
const {makeThumbnail} = require('../utils/image');

const cats = catModel.cats;

const getCats = async (req,res) =>{
    const cats = await catModel.getAllCats(res);
    cats.map(cat => {
        // convert birthdate date object to 'YYYY-MM-DD' string format
        cat.birthdate = cat.birthdate.toISOString().split('T')[0];
        return cat;
      });
    res.json(cats);
};

const getCat = async (req, res) => {
    //choose only one object with matching id
    const cat =  await catModel.getCatById(res, req.params.catId) ;
    if(cat){
        cat.birthdate = cat.birthdate.toISOString().split('T')[0];
        res.json(cat);
    }else{
        res.sendStatus(404);
    }
};

const modifyCat = async (req, res) => {
    
    const cat = req.body;
    const user = req.user;
    if(req.params.catId){
        cat.id = req.params.catId;
    }

    const result = await catModel.modifyCatById(cat,user, res);

    if(result.affectedRows > 0){
        res.json({message:'cat modified' + cat.id});
    }else{
        res.status(404).json({message:'Nothing changed'});
    }

};

const createCat = async (req, res) => {
    const errors = validationResult(req);

    //File is empty or missing ()
    if(!req.file){
        res.status(400).json({message: "file missing or invalid"});
    }else if(errors.isEmpty()){
        //generate
        await makeThumbnail(req.file.path, req.file.filename);
        const cat = req.body;
        cat.owner = req.user.user_id;
        cat.filename = req.file.filename;
        const catid = await catModel.addCat(cat, res);
        res.status(201).json({message: 'cat created', catid});
        //res.send("Success adding a cat with id:" + catid);
    }else{
        console.log('validation errors', errors);
        res.status(400).json({message: 'cat creation failed',
                            errors: errors.array()});
    }
};

const deleteCat = async (req, res) => {
    const deleteCatById = await catModel.deleteCatById(res, req.params.catId, req.user.user_id);
    if(deleteCat){
        res.json({message : 'cat deleted'});
    }else{
        res.status(401).json({message: 'Cat delete failed.'});
    }
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};