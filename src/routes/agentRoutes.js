const express = require('express');
const { insertAgentRatings,getAgentRatingsByAgentId, getAgentRatings} = require('../controllers/agentController');

const agentRoutes = express.Router();

agentRoutes.post('/',insertAgentRatings);
agentRoutes.get('/getAgentRatingById',getAgentRatingsByAgentId);
agentRoutes.get('/getratings',getAgentRatings);
module.exports = agentRoutes;
