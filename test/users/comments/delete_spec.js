/* global describe, beforeEach, it, expect, api */

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');



const commentData = {
  content: 'test-text',
  rating: 3
};
let token;
let userId;
let commentId;

describe('DELETE /users/:id/comments/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create({
        username: 'richard',
        email: 'richard@test.com',
        password: 'pass',
        passwordConfirmation: 'pass',
        avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400',
        comments: [
          {
            content: 'text-test',
            rating: 4
          }
        ]
      }))
      .then(user => {
        userId = user._id;
        commentId = user.comments[0]._id;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api.delete(`/api/users/${userId}/comments/${commentId}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response', done => {
    api.delete(`/api/users/${userId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('Should return no data', done => {
    api.delete(`/api/users/${userId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.comments).to.be.empty;
        done();
      });
  });

});
