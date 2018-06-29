/* global describe, beforeEach, it, api, expect */
const User = require('../../models/user');

const userData =
  [{
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
  }];

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

  it('should return an array', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(user => expect(user).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach((user, index) => {
          expect(res.body[index].username).to.eq(userData[index].username);
          expect(res.body[index].email).to.eq(userData[index].email);
          expect(res.body[index].avatar).to.eq(userData[index].avatar);
          done();
        });
      });
  });

});
