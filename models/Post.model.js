const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const now = Date.now()

const postSchema = new Schema({
  //   post_author_id: {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "User"
  //   },
  //   post_text: String,
  //   total_comments: Number,
  //   total_likes: Number,
  //   likes: [{
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "User"
  //   }],
  //   comments: [{
  //     comment_user_id: {
  //       type: mongoose.SchemaTypes.ObjectId,
  //       ref: "User"
  //     },
  //     comment_text: String,
  //     section: String,
  //     date: { type: Date, default: Date.now }
  //   }],
  //   image: String
  // }, {
  //   timestamps: {
  //     createdAt: { type: Date, default: Date.now }
  //   }
  name: String, message: String

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post


