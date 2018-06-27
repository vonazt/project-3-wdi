/* global describe, it, api, expect, beforeEach */
/* global describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const Record = require('../../models/record');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

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

describe('POST /records', () => {

  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Record.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/records')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {
    api.post('/api/records')
      .set('Authorization', `Bearer ${token}`)
      .send(recordData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the created record', done => {
    api.post('/api/records')
      .set('Authorization', `Bearer ${token}`)
      .send(recordData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'artist',
          'title',
          'image',
          'genres',
          'label',
          'releaseDate',
          'condition'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/records')
      .set('Authorization', `Bearer ${token}`)
      .send(recordData)
      .end((err, res) => {
        expect(res.body.artist).to.eq(recordData.artist);
        expect(res.body.title).to.eq(recordData.title);
        expect(res.body.image).to.eq(recordData.image);
        expect(res.body.genres).to.deep.eq(recordData.genres);
        expect(res.body.label).to.eq(recordData.label);
        expect(res.body.releaseDate).to.eq(recordData.releaseDate);
        expect(res.body.condition).to.eq(recordData.condition);
        done();
      });
  });
});
