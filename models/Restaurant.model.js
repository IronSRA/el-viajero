const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  place_id: String,
  rating: Number,
  type: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  formatted_address: String,
  formatted_phone_number: String,
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
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;