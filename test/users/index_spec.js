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

describe('GET /users', () => {
  beforeEach(done => {
    User
      .remove({})
      .then( () => User.create(userData))
      .then( () => done() );
  });

  it('should return a 200 response', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  xit('should return an array', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

});
