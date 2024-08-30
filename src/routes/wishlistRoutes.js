const express = require('express');
// const { getBuyers, createBuyer } = require('../controllers/buyersController');
const { addToWishlist, getWishlist } = require('../controllers/wishListController');

const wishlistRoutes = express.Router();

wishlistRoutes.get('/getwishList', getWishlist);
wishlistRoutes.post('/addtowishList', addToWishlist);
// wishlistRoutes.put('/update/:_id', updateBuyer);
// wishlistRoutes.delete('/delete/:_id', deleteBuyer);

module.exports = wishlistRoutes;
