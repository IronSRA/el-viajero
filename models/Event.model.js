const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  description: String,
  rating: Number,
  type: String,
  venue: String,
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
  price: Number,
  website: String,
  photos: Array,
  reviews: Array,
},
  {
    timestamps: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;