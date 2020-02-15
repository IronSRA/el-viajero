const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  surname: String,
  email: String,
  photo: String,
  hidden: Boolean,
  about: String,
  visiting_now: String,
  visited_cities: Array,
  rating: Number,
  comments: [{
    body: String,
    section: String,
    date: Date
  }],
  pictures: [{
    image: String,
    description: String,
    date: Date
  }],
  travelbuddies: Array


}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;