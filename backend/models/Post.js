const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must belong to a user'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  text: {
    type: String,
    default: '',
  },
  image: {
    type: String, // URL or base64
    default: '',
  },
  likes: {
    type: [String], // Array of usernames who liked
    default: [],
  },
  comments: [
    {
      username: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index for sorting by date
  },
});

module.exports = mongoose.model('Post', postSchema);
