'use strict';
// catController

const {rawListeners} = require('../database/db');
const catModel = require('../models/catModel');

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
    const cat = req.body;
    cat.filename = req.file.filename;
    const catId = await catModel.addCat(cat, res);
    res.json(catId);
};

const deleteCat = async (req, res) => {
    const deleteCatById = await catModel.deleteCat(res, req.params.catId);

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
    deleteCat
}