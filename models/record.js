const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: String},
  releaseDate: { type: Number, maxLength: 4, minLength: 4 },
  condition: { type: String, required: true }
});

module.exports = mongoose.model('Record', recordSchema);
