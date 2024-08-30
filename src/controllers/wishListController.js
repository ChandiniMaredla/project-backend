const { Request, Response } = require('express');
const { buyersModel } = require('../models/buyersModel');
const { wishlistModel } = require('../models/wishlistModel');

// Add a property to the wishlist
const addToWishlist = async (req, res) => {
    try {
        const buyerId = req.params._id;
        // Find the property by ID
        const property = await buyersModel.findById(buyerId);
        if (!property) {
            return res.status(404).json({ message: "Property not found", success: false });
        }

        // Check if the property is already in the wishlist
        const existingWishlistItem = await wishlistModel.findOne({ _id: property._id });
        if (existingWishlistItem) {
            return res.status(400).json({ message: "Property already in wishlist", success: false });
        }

        // Create a new wishlist item
        const wishlistItem = new wishlistModel(property.toObject());

        // Save the wishlist item
        await wishlistItem.save();

        res.status(201).json({ message: "Property added to wishlist successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error adding property to wishlist", error });
    }
};

// Get all wishlist items
const getWishlist = async (req, res) => {
    try {
        const wishlistItems = await wishlistModel.find();
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist items", error });
    }
};

module.exports = {
    addToWishlist,
    getWishlist
};
