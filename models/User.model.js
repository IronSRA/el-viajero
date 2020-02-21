const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const now = Date.now()

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  surname: String,
  email: String,
  photo: String,
  hidden: Boolean,
  location: String,
  about: String,
  visiting_now: String,
  visited_cities: [String],
  rating: Number,
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dnzarhjsc/image/upload/v1582292344/folder-name/egg_ghl8sj.png'
  },
  comments: [{
    body: String,
    section: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  pictures: [{
    image: String,
    description: String,
    date: {
      type: Date,
      default: Date.now
    },
    likes: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }]
  }],
  favourites: {
    cities: [String],
    restaurants: [String],
    places: [String]
  },
  travelbuddies: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }]


}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User