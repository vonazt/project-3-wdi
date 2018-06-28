/* global describe, beforeEach, it, expect, api */

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = {
  username: 'richard',
  email: 'richard@test.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
};

const commentData = {
  content: 'test-text',
  rating: 3
};
let token;
let userId;

describe('POST /users/:id/comments', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api.post(`/api/users/${userId}/comments`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.post(`/api/users/${userId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return the created comment', done => {
    api.post(`/api/users/${userId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.body.comments[0]).to.be.an('object');
        expect(res.body.comments[0]).to.include.keys([
          '_id',
          'content',
          'author'
        ]);
        done();
      });
  });

});
