const express = require('express');
const { getPropertiesByLocation, getPropertiesByUserId, insertPropertyRatings, getAllProperties } = require('../controllers/propertyController');

const propertyRoutes = express.Router();
propertyRoutes.get('/getallprops',getAllProperties);
propertyRoutes.get('/getpropbyid',getPropertiesByUserId);
propertyRoutes.get('/:location', getPropertiesByLocation);

propertyRoutes.post('/',insertPropertyRatings);


module.exports = propertyRoutes;
