'use strict';

const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_user");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
    
  }
};

const getUserById = async (res, userId) => {
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
    const [rows] = await promisePool.query('INSERT INTO wop_user(name, email, password) VALUE (?,?,?)', [user.name, user.email, user.passwd]);
    console.log('user model insert', rows);
    return rows.insertId;
  } catch (e) {

    res.status(501).json({ message: 'something went wrong'});
    return;
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
}
