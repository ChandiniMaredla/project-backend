const express = require('express');
const { userLoginController } = require('../controllers/noAuthController');
const { display } = require('../controllers/defaultController');
const { createUser } = require('../controllers/userController');


const noAuthRouter = express.Router();

noAuthRouter.post('/login', userLoginController);
noAuthRouter.post('/create', createUser);

noAuthRouter.get('/hi', display);

module.exports = noAuthRouter;
