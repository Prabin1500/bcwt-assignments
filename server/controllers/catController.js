'use strict';
// catController

const {rawListeners} = require('../database/db');
const catModel = require('../models/catModel');
const {validationResult} = require("express-validator");

const cats = catModel.cats;

const getCats = async (req,res) =>{
    const cats = await catModel.getAllCats(res);
    res.json(cats);
};

const getCat = async (req, res) => {
    //choose only one object with matching id
    const cat =  await catModel.getCatById(res, req.params.catId) ;
    if(cat){
        res.json(cat);
    }else{
        res.sendStatus(404);
    }
};

const modifyCat = async (req, res) => {
    
    const cat = req.body;
    if(req.params.catId){
        cat.id = req.params.catId;
    }

    const result = await catModel.modifyCatById(cat, res);

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
        const cat = req.body;
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
    const deleteCatById = await catModel.deleteCatById( res, req.params.catId);
    if(deleteCat){
        res.json({message : 'cat deleted'});
    }else{
        res.status(404).json('Not found');
    }
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};