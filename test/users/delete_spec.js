/* global describe, beforeEach, it, api, expect */
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let userId;
let token;

describe('GET /users/:id', () => {
  beforeEach(done => {
    User
      .remove({})
      .then( () => User.create({
        username: 'richard',
        email: 'richard@test.com',
        password: 'pass',
        passwordConfirmation: 'pass',
        avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
      }))
      .then( (user) => {
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
        userId = user._id;
        done();
      } );
  });

  it('should return a 401 response without a token', done => {
    api.delete(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response', done => {
    api.delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should return no data', done => {
    api.delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  });

});
