const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  wantedRecord: { type: mongoose.Schema.ObjectId, ref: 'Record', required: true },
  offeredRecord: { type: mongoose.Schema.ObjectId, ref: 'Record', required: true },
  message: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' }
});

module.exports = mongoose.model('Request', requestSchema);
