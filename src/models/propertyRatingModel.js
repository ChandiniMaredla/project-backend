const mongoose = require('mongoose');

const propertyRatingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
propertyId: {
    type: String,
    required: true
},
rating: {
    type: Number,
    required: true
},
review: {
    type: String,
}
});

const propertyRatingModel = mongoose.model('propertyRatings', propertyRatingSchema);

module.exports = propertyRatingModel;
