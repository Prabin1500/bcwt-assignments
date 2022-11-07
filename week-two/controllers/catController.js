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

const createCat =  (req, res) => {
    console.log(req.body);
    res.send("adding a cat");
};

const deleteCat =  (req, res) => {
    
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};