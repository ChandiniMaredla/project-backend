// controllers/commercialController.js
const Commercial = require('../models/commercialModel');
// Function to create a new commercial property
const createCommercial = async (req, res) => {
  try {
    const {userId, role} = req.user.user;
    console.log(req.user.user);
            const createcomm = {
               userId,
                role,
                ...req.body // Spread the rest of the fields from the request body
    };
      // console.log(createcomm);
      const commercialDetails = new Commercial(createcomm);
      await commercialDetails.save();


    res.status(201).json("property added successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Function to get all commercial properties
const getCommercials = async (req, res) => {
  try {
    const commercials = await Commercial.find();
    res.status(200).json(commercials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Exporting the display function
module.exports = {
   createCommercial, getCommercials
};
