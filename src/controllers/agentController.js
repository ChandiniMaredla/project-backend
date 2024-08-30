const agentRatingModel = require('../models/agentRatingModel');

//insertAgentRatings
const insertAgentRatings = async (req,res) => {
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
        const ratings = new agentRatingModel(ratingsData);
        await ratings.save();
        res.status(201).json({ message: "rating details added successfully", success: true });
    } catch (error) {
        res.status(400).json({ message: "Error inserting rating details", error });
    }
};

//api for agent to view his own ratings
const getAgentRatingsByAgentId = async (req, res) =>{
    try {
const agentId= req.user.user.userId;
//console.log(userId)
const ratings = await agentRatingModel.find({ agentId: agentId });
if (ratings.length === 0) {
    return res.status(404).json({ message: 'No ratings found' });
  }

  res.status(200).json(ratings);
} catch (error) {
  res.status(500).json({ message: error.message });
}
}

//api for displaying ratings of an agent, agentId is sent through path params
const getAgentRatings = async (req, res) => {
  try {
    const agentId = req.params; // Extract agentId from the token
const ratings = await agentRatingModel.find({ agentId: agentId });
if (ratings.length === 0) {
    return res.status(404).json({ message: 'No ratings found' });
  }

  res.status(200).json(ratings);
} catch (error) {
  res.status(500).json({ message: error.message });
}   
};



//api for buyer and seller to view a particular agent ratings
// const getAgentRatingsByAgentId = async (req, res) =>{
//     try {
// const agentId= req.user.user.userId;
// //console.log(userId)
// const ratings = await agentRatingModel.find({ agentId: agentId });
// if (ratings.length === 0) {
//     return res.status(404).json({ message: 'No ratings found' });
//   }

//   res.status(200).json(ratings);
// } catch (error) {
//   res.status(500).json({ message: error.message });
// }
// }

module.exports = {
 insertAgentRatings,getAgentRatingsByAgentId,getAgentRatings
};