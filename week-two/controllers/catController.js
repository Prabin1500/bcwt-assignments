'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCats = async (req,res) =>{
    const cats = await catModel.getAllCats();
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

const modifyCat = (req, res) => {
    
};

const createCat = async (req, res) => {
    const cat = req.body;
    cat.filename = req.file.filename;
    const id = await catModel.addCat(cat, res);
    res.send("Success")
};

const deleteCat = async (req, res) => {
    const deleteCat = await catModel.deleteCat(req,res);
    res.send("Deleted a cat");
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};