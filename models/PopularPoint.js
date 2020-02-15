const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popularPointSchema = new Schema({
  name: String,
  place_id: String,
  long_name: String,
  rating: Number,
  type: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  formatted_address: String,
  formatted_phone_number: String,
  hours: {
    open: Date,
    close: Date,
  },
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

const Popular = mongoose.model('Popular', popularPointSchema);
module.exports = Popular;