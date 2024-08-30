const residentialModel = require('../models/residentialModel');

const createResidential = async (req, res) => {
try {
// Extract userId from req.user
const userId = req.user.user.userId;

// Log request body and userId for debugging
console.log('Request Body:', req.body);
console.log('User ID:', userId);

// Check if email is null or undefined
if (req.body.owner && req.body.owner.ownerEmail === null) {
console.log("email",req.body.owner.ownerEmail);
return res.status(400).send({ message: 'Email cannot be null' });
}

// Create a new instance of the residential model with data from the request body
const residential = new residentialModel({ userId, ...req.body });

// Save the residential document to the database
await residential.save();

// Send a success response
res.send({ message: "Residential Property Added Successfully", success: true });
} catch (error) {
// Log detailed error information
console.error('Error Details:', error);

// Handle any errors and send response
res.status(400).send({ message: "Error Adding Residential Property", error: error.message || error });
}
};



const getPropertiesByUserId = async (req, res) => {
try {
// Extract userId from req.user which should be set by authentication middleware
const userId = req.user.user.userId;

// Log userId for debugging
console.log('User ID:', userId);

// Query the residentialModel collection to find properties with the specified userId
const properties = await residentialModel.find({ userId }).exec();

if (properties.length === 0) {
return res.status(404).json({ message: 'No properties found for this user' });
}

// Send the found properties as the response
res.status(200).json(properties);
} catch (error) {
// Log detailed error information
console.error('Error Details:', error);

// Handle any errors and send response
res.status(500).json({ message: 'Error retrieving properties', error: error.message || error });
}
};



module.exports = { createResidential,getPropertiesByUserId };