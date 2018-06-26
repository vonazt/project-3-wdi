const mongoose = require('mongoose');
const commentSchema = require('./comment');

const messageSchema = new mongoose.Schema({
  comments: [ commentSchema ],
  userOneId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  userTwoId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Message', messageSchema);
