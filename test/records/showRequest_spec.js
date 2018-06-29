/* global describe, beforeEach, it, expect, api */

const Record = require('../../models/record');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const {secret}= require('../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const recordData = {
  artist: 'Test Artist',
  title: 'Test Album',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genres: ['Rock'],
  label: 'RCA',
  releaseDate: 1970,
  condition: 'Mint'
};
let token;
let recordId;

describe('GET /records/:id/comments', () => {
  beforeEach(done => {
    Record
      .remove({})
      .then(() => User.remove({}))
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(() => Record.create(recordData))
      .then((record) => {
        recordId = record._id;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.get(`/api/records/${recordId}/requests`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/records/${recordId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/records/${recordId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/records/${recordId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body[0].artist).to.eq(recordData.artist);
        expect(res.body[0].title).to.eq(recordData.title);
        expect(res.body[0].image).to.eq(recordData.image);
        expect(res.body[0].genres).to.deep.eq(recordData.genres);
        expect(res.body[0].label).to.eq(recordData.label);
        expect(res.body[0].releaseDate).to.eq(recordData.releaseDate);
        expect(res.body[0].condition).to.deep.eq(recordData.condition);
        done();
      });
  });
});
