const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: String},
  releaseDate: String,
  condition: { type: String, required: true }
});

module.exports = mongoose.model('Record', recordSchema);
