"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    //SELECT wop_cat.cat_id, wop_cat.name, wop_cat.weight, wop_cat.owner, wop_cat.birthdate, wop_cat.filename, wop_user.name as ownername FROM wop_cat Left join wop_user on wop_cat.owner = wop_user.user_id ;
    const [rows] = await promisePool.query("SELECT * FROM wop_cat");
    console.log(rows);
    return rows;
    
    } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getCatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_cat WHERE cat_id = ?", [catId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
    
  }
};

const addCat = async (cat, res) => {     
  try {
    const [rows] = await promisePool.query('INSERT INTO wop_cat(name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)', [cat.name, cat.weight, cat.owner, cat.filename, cat.birthdate]);
    console.log('cat model insert', rows);
    return rows.insertId;
  } catch (e) {
    console.error('cat model addCat error', e.message);
    res.status(500).json({ message: 'something went wrong'});
  }
};

const deleteCatById = async(res,catId) => {
  try{
    const [rows] = await promisePool.execute("DELETE FROM wop_cat WHERE cat_id = ?" , [catId]);
    return rows[0];
  }catch(e){
    console.error('cat model deleteCat error', e.message);
  }
};

const modifyCat = async (res, req) => {
  try{
    const [rows] = await promisePool.query("UPDATE wop_cat SET name = ?, weight = ?,owner =?, birthdate =? WHERE cat_id= ?" , [req.body.name, req.body.weight, req.body.owner, req.body.birthdate, req.body.id]);
    console.log("cat modified", rows);
    return rows[0];
  }catch(e){
    console.error('Error while modifying cat', e.message);
  }
};


module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  modifyCat,
};
