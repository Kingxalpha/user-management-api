require('dotenv').config()
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const connection = require('../db/connect')
const JWT_SECRET = process.env.JWT_SECRET;

const getAllUser = async(req, res)=>{
    try {
        connection.query('SELECT * FROM user', (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error retrieving users');
          } else {
            res.json(results);
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
      }
}

const getSingleUser = async(req, res)=>{
    const userId = req.params.id;

    try {
      connection.query('SELECT * FROM user WHERE id = ?', [userId], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error retrieving user');
        } else if (results.length === 0) {
          res.status(404).send('User not found');
        } else {
          res.json(results[0]);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving user');
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username } = req.body;

    try {
        const updatedUser = { username };

        connection.query('UPDATE user SET ? WHERE id = ?', [updatedUser, userId], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error updating user');
            } else {
                res.status(200).send('User updated successfully');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
}


const deleteUser = async(req, res)=>{
    const userId = req.params.id;

  try {
    connection.query('DELETE FROM user WHERE id = ?', [userId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
      } else {
        res.status(200).send('User deleted successfully');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user');
  }
            
}


module.exports = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}