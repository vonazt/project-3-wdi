const mongoose = require('mongoose');

const recordCommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5}
});

const recordSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: Array },
  label: { type: String, required: true },
  recordComments: [ recordCommentSchema ],
  releaseDate: { type: Number, maxLength: 4, minLength: 4 },
  condition: { type: String, required: true },
  cardData: Array,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

recordSchema.virtual('avgRating')
  .get(function() {
    return Math.floor(this.recordComments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0) / this.recordComments.length);
  });

recordSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Record', recordSchema);
