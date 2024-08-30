const express = require('express');
const {  createCommercial, getCommercials } = require('../controllers/commercialController');

const commercialRoutes = express.Router();

// Correct route definitions
commercialRoutes.post('/postcommercial', createCommercial);
commercialRoutes.get('/getcommercial', getCommercials);

module.exports = commercialRoutes;