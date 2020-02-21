const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const now = Date.now()

const chatSchema = new Schema({

  message: {
    users: {
      sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      },
      receptor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    message: String
  },

});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat