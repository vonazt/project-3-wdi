const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true},
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  rating: { type: Number, min: 1, max: 5}
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
  cardData: Array,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
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
