const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5 }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  wishlist: { type: Array },
  userComments: [ userCommentSchema ],
  profileData: { type: Array }
});

userSchema.set('toJSON',{
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.set('toJSON', {
  virtuals: true
});

userSchema.virtual('records', {
  localField: '_id',
  foreignField: 'owner',
  ref: 'Record'
});

userSchema.virtual('avgRating')
  .get(function() {
    return Math.floor(this.userComments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0) / this.userComments.length);
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
