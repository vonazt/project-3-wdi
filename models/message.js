const mongoose = require('mongoose');
const commentSchema = require('./comment');

const messageSchema = new mongoose.Schema({
  comments: [ commentSchema ],
  userOneId: { type: mongoose.Schema.ObjectId, ref: 'User'},
  userTwoId: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Message', messageSchema);
