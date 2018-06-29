/* global describe, beforeEach, it, api, expect */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const {secret}= require('../../config/environment');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let userId;

describe('POST /login', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id.toString();
        done();
      });
  });

  it('should return a 401 response if not registered', done => {
    api.post('/api/login')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response if registered', done => {
    api.post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

});
