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

const modifyCat = async (req, res) => {
    
    const result = await catModel.modifyCat(res, req);
   if(!result){
    res.send("Cat edited.");
   }else{
    res.sendStatus(502);
   }

};

const createCat = async (req, res) => {
    const cat = req.body;
    cat.filename = req.file.filename;
    const catid = await catModel.addCat(cat, res);
    //res.send("Success adding a cat with id:" + catid);
};

const deleteCat = async (req, res) => {
    const deleteCatById = await catModel.deleteCatById(res, req.params.catId);
    res.send("Deleted a cat with id :" + req.params.catId);
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat,
};