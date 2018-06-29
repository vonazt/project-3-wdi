const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: 'User'},
  rating: { type: Number, min: 1, max: 5}
});

module.exports = commentSchema;
