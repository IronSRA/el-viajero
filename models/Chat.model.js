const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const now = Date.now()

const chatSchema = new Schema({
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
  message: {
    user: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }],
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    message: String
  },

});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat