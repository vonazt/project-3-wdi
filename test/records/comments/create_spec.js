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

const commentData = {
  content: 'test-text',
  rating: 3
};
let recordId;
let token;
let userId;

describe('POST /records/:id/comments', () => {
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
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api.post(`/api/records/${recordId}/comments`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.post(`/api/records/${recordId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return the created comment', done => {
    api.post(`/api/records/${recordId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.body.comments[1]).to.be.an('object');
        expect(res.body.comments[1]).to.include.keys([
          '_id',
          'content',
          'author'
        ]);
        done();
      });
  });

});
