const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat