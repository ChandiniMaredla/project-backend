const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  OwnerName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  size: {
    units: {
      type: Number,
    },
    acres: {
      type: Number,
    },
    cents: {
      type: Number,
    },
  },
  distance: {
    type: Number,
  },
  litigation: {
    type: Boolean,
  },
  price: {
    type: Number,
  },
  amenities: {
    boreWells: {
      type: Boolean,
    },
    electriCity: {
      type: Boolean,
    },
  },
  features: {
    type: String,
  },
  yearofCon: {
    type: Number,
  },
  reSale: {
    type: Boolean,
  },
  propertyImages: {
    type: String,
  },
});

const wishlistModel = mongoose.model('wishlist', wishlistSchema);

module.exports = wishlistModel;
