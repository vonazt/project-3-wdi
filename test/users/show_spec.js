/* global describe, beforeEach, it, api, expect */
const User = require('../../models/user');

const userData =
  {
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
  };
  let userId;

describe('GET /users/:id', () => {
  beforeEach(done => {
    User
      .remove({})
      .then( () => User.create(userData))
      .then( (user) => {
        userId = user._id;
        done();
      } );
  });

  it('should return a 200 response', done => {
    api.get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.body.username).to.eq(userData.username);
        expect(res.body.email).to.eq(userData.email);
        expect(res.body.avatar).to.eq(userData.avatar);
        done();
      });
  });

});
