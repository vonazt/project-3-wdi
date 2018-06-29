/* global describe, beforeEach, it, expect, api */

const Record = require('../../../models/record');
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

let recordId;
let userId;
let commentId;
let token;


describe('RECORDS /records/:id/comments/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Record.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(() => Record.create({
        artist: 'Test Artist',
        title: 'Test Album',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genres: ['Rock'],
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint',
        comments: [
          {
            content: 'text-test',
            rating: 4
          }
        ]
      }))
      .then((record) => {
        recordId = record._id;
        record.owner = userId;
        commentId = record.comments[0]._id;
      })
      .then(done);
  });

  it('should return a 401 response without a token', done => {
    api.delete(`/api/records/${recordId}/comments/${commentId}`)
      .end((err, res) =>{
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200', done => {
    api.delete(`/api/records/${recordId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) =>{
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return no data', done => {
    api.delete(`/api/records/${recordId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.comments).to.be.empty;
        done();
      });
  });

});
