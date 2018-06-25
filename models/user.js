const mongoose = require('mongoose-fill');
const bcrypt = require('bcrypt');
const commentSchema = require('./comment');
const Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  comments: [ commentSchema ]
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.virtual('records', {
  localField: '_id',
  foreignField: 'owner',
  ref: 'Record'
});

userSchema.fill('incomingRequests', function(callback){
  const requests = this.records.map(record => {
    return this.model('Request')
      .find({ wantedRecord: record._id })
      .populate('wantedRecord')
      .populate({
        path: 'offeredRecord',
        populate: {
          path: 'owner'
        }
      });
  });
  Promise.all(requests)
    .then(allRequests => {
      const requests = allRequests
        .reduce((flattened, requests) => flattened.concat(requests))
        .map(request => {
          request = request.toJSON();
          delete request.wantedRecord.comments;
          delete request.offeredRecord.comments;
          delete request.offeredRecord.owner.comments;
          return request;
        });
      callback(null, requests);
    });
});

userSchema.fill('outgoingRequests', function(callback){
  const requests = this.records.map(record => {
    return this.model('Request')
      .find({ offeredRecord: record._id })
      .populate('offeredRecord')
      .populate({
        path: 'wantedRecord',
        populate: {
          path: 'owner'
        }
      });
  });
  Promise.all(requests)
    .then(allRequests => {
      const requests = allRequests
        .reduce((flattened, requests) => flattened.concat(requests))
        .map(request => {
          request = request.toJSON();
          delete request.wantedRecord.comments;
          delete request.wantedRecord.owner.comments;
          delete request.offeredRecord.comments;
          return request;
        });

      callback(null, requests);
    });
});

userSchema.virtual('avgRating')
  .get(function() {
    return Math.floor(this.comments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0) / this.comments.length);
  });

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordsMatch(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
