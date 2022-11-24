'use strict';

const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT user_id, name, email, role FROM wop_user");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
    
  }
};

const getUserById = async (userId, res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_user WHERE user_id = ?", [userId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
    
  }
};

const addUser = async (user, res) => {
  try {
    const [rows] = await promisePool.query('INSERT INTO wop_user(name, email, password) VALUES (?,?,?)', [user.name, user.email, user.passwd]);
    console.log('user model insert', rows);
    return rows.insertId;
  } catch (e) {
    res.status(500).json({ message: 'something went wrong'});
    return;
  }
};

const getUserLogin = async (user) =>{
  try{
    console.log('getUserLogin()', user);
    const[rows] = await promisePool.execute(
      'SELECT * FROM wop_user WHERE email = ?;',
      user);
    return rows;
  } catch(e){
    console.error('error:', e.message);
    res.status(500).send(e.message);
  }
};

const deleteUser = async (req, userId) => {
  try{
    const [rows] = await promisePool.execute("DELETE FROM wop_user WHERE user_id = ?" , [userId]);
    console.log("Deleted a user");
    return rows[0];
  }catch(e){
    console.error('user delete errot error', e.message);
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  getUserLogin
}
