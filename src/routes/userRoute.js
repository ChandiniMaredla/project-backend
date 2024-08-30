const express = require('express');
const { createUser, deleteUser, getUsers, updateUser, getProfile } = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
// userRoutes.post('/create', createUser);
userRoutes.put('/update/:_id', updateUser);
userRoutes.delete('/delete/:_id', deleteUser);
userRoutes.get('/getprofile',getProfile);
module.exports = userRoutes;
