const express = require('express');
const { register, login } = require('../controller/auth');
const { getAllUser, getSingleUser, updateUser, deleteUser } = require('../controller/usersController');



const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/users').get(getAllUser);
router.route('/users/:id').get(getSingleUser);
router.route('/users/:id').put(updateUser);
router.route('/users/:id').delete(deleteUser);





module.exports = router