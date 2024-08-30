// controllers/fieldController.js


const propertyRatingModel = require('../models/propertyRatingModel');
const residentialModel = require('../models/residentialModel');
const commercialModel = require('../models/commercialModel');
const fieldModel = require('../models/fieldModel');
const getPropertiesByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    if (!location) {
      return res.status(400).json({ message: 'Location parameter is required' });
    }

    // Create a query object
    let query = {};

    // Check if the location input is a number (for pinCode)
    if (!isNaN(location)) {
      // Convert to a number if it is numeric
      const pinCode = Number(location);
      query['address.pinCode'] = pinCode;
    } else {
      // Otherwise, search in other fields
      query['$or'] = [
        { 'address.village': location },
        { 'address.mandal': location },
        { 'address.district': location },
        { 'address.state': location },
      ];
    }

    // Execute the query
    const properties = await fieldModel.find(query);
    
    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getPropertyByUserId
 const getPropertiesByUserId = async (req, res) =>{
    try {
const userId= req.user.user.userId;
console.log(userId)
const properties = await fieldModel.find({ userId: userId });
if (properties.length === 0) {
    return res.status(404).json({ message: 'No properties found' });
  }

  res.status(200).json(properties);
} catch (error) {
  res.status(500).json({ message: error.message });
}
}

//get all properties
const getAllProperties = async (req, res) => {
  try {
    // Fetch data from all three collections
    const fieldProperties = await fieldModel.find().exec();
    const residentialProperties = await residentialModel.find().exec();
    const commercialProperties = await commercialModel.find().exec();

    // Combine the results
    const allProperties = [
      ...fieldProperties,
      ...residentialProperties,
      ...commercialProperties,
    ];

    // Check if any properties were found
    if (allProperties.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }

    // Send the combined result back to the client
    res.status(200).json(allProperties);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};



//insertPropertyRatings
const insertPropertyRatings = async (req,res) => {
    try{
      
        const userId = req.user.user.userId;
        const firstName= req.user.user.firstName;
        const lastName = req.user.user.lastName;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing in request", success: false });
        }

        const ratingsData = {
           userId,
           firstName,
           lastName,
            ...req.body // Spread the rest of the fields from the request body
        };
        //console.log(fieldDetailsData);
        const ratings = new propertyRatingModel(ratingsData);
        await ratings.save();
        res.status(201).json({ message: "rating details added successfully", success: true });
    } catch (error) {
        res.status(400).json({ message: "Error inserting rating details", error });
    }
};

//get property ratings

module.exports = {
  getPropertiesByLocation,getPropertiesByUserId,insertPropertyRatings,getAllProperties
};
