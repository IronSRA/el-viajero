const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  woeid: String,
  applicable_date: Date,
  weather_state_abbr: String,
  temperature: Array,
  humidity: Number,
  predictability: Number,
  wind_speed: Number,
  light: {
    sun_rise: Date,
    sun_set: Date
  },
  aqi: Number
}, {
  timestamps: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;