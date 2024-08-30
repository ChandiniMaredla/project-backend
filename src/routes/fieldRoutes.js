const express = require('express');
const { getFields,insertFieldDetails } = require('../controllers/fieldController');

const fieldRoutes = express.Router();

fieldRoutes.get('/getfields', getFields);
fieldRoutes.post('/insert', insertFieldDetails);


module.exports = fieldRoutes;
