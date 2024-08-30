// Import necessary modules
const fieldModel = require('../models/fieldModel');

// Get all fields
const getFields = async (req, res) => {
    try {
        const fields = await fieldModel.find();
        res.status(200).send({ data: fields });
    } catch (error) {
        res.status(500).json({ message: "Error fetching fields", error });
    }
};

// Create a new field
const insertFieldDetails = async (req, res) => {
    try {
   
        const {userId, role} = req.user.user;
console.log(req.user.user);
        const fieldDetailsData = {
           userId,
            role,
            ...req.body // Spread the rest of the fields from the request body
        };
        console.log(fieldDetailsData);
        const fieldDetails = new fieldModel(fieldDetailsData);
        await fieldDetails.save();
        res.status(201).json({ message: "field details added successfully", success: true });
    } catch (error) {
        res.status(400).json({ message: "Error inserting field details", error });
    }
};


// Export functions
module.exports = {
    getFields,
    insertFieldDetails
};
