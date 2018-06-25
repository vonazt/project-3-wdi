const mongoose = require('mongoose');
const commentSchema = require('./comment');

const requestSchema = new mongoose.Schema({
  offer: { type: mongoose.Schema.ObjectId, ref: 'Record', required: true },
  message: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' }
  // madeBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const recordSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: Array },
  label: { type: String, required: true },
  comments: [ commentSchema ],
  releaseDate: { type: Number, maxLength: 4, minLength: 4 },
  condition: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  requests: [ requestSchema ]
});

recordSchema.virtual('avgRating')
  .get(function() {
    return Math.floor(this.comments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0) / this.comments.length);
  });

recordSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Record', recordSchema);
