const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const now = Date.now();

const RestaurantSchema = new Schema({
  name: String,
  place_id: String,
  rating: Number,
  type: String,
  geometry:
  {
    location: {
      latitude: Number,
      longitude: Number,
    }
  },
  address: String,
  phone_number: String,
  international_phone_numer: String,
  hours: {
    open: Date,
    close: Date,
  },
  open_now: Boolean,
  price_level: Number,
  website: String,
  photos: Array,
  reviews: Array,
},
  {
    timestamps: { type: Date, default: Date.now }
  });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;