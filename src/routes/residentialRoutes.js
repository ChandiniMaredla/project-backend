const express = require('express');
const { createResidential,getPropertiesByUserId } = require('../controllers/residentialController');

const residentialRoutes = express.Router();

residentialRoutes.post('/add', createResidential);
residentialRoutes.get('/getting',getPropertiesByUserId)

module.exports = residentialRoutes;