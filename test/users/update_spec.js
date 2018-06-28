/* global describe, beforeEach, it, api, expect */
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const updatedUserData =
  {
    username: 'richardupdated'
  };

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
    api.put(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUserData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUserData)
      .end((err, res) => {
        expect(res.body.username).to.eq(updatedUserData.username);
        done();
      });
  });

});
