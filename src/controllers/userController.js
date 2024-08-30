const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel'); 
const saltRounds = 10;

// Controller to get all users
const getUsers = async (req, res) => {
    try {
        const data = await userModel.find();
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller to create a new user
const createUser = async (req, res) => {
    try {
        const user = new userModel({ ...req.body });
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        console.log(user);

        user.save()
            .then(() => {
                res.send({ message: "User Added Successfully", success: true });
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller to update a user
const updateUser = async (req, res) => {
    try {
         const userId = req.user.user.userId;
        const updateData = req.body;

        const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        res.send({ message: "User Updated Successfully", success: true, user });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.user.user.userId;

        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        res.send({ message: "User Deleted Successfully", success: true });
    } catch (error) {
        res.status(500).send(error);
    }
};

//getProfile
const getProfile = async (req, res) => {
    try {
      // Assuming userId is provided in the request (e.g., from req.user)
      const userId = req.user.user.userId; // Adjust this based on your setup
  
      // Define the fields you want to retrieve
      const fields = 'profilePicture firstName lastName pinCode city email phoneNumber';
  
      // Find the user and project the specified fields
      const user = await userModel.findById(userId, fields).exec();
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error retrieving user profile', error });
    }
  };
  
module.exports = {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
    getProfile
};
