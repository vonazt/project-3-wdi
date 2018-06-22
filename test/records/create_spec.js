/* global describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const Record = require('../../models/record');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const recordData = [{
  artist: 'David Bowie',
  title: 'The Man Who Sold The World',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genre: 'Rock',
  releaseDate: '1970',
  condition: 'Mint'
}, {
  artist: 'Aphex Twin',
  title: 'Syro',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genre: 'IDN',
  releaseDate: 2012,
  condition: 'VG'
}];

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };

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
      .send(recordData[0])
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the created record', done => {
    api.post('/api/records')
      .set('Authorization', `Bearer ${token}`)
      .send(recordData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'artist',
          'title',
          'image',
          'genre',
          'releaseDate',
          'condition'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/records')
      .set('Authorization', `Bearer ${token}`)
      .send(recordData[0])
      .end((err, res) => {
        expect(res.body.artist).to.eq(recordData[0].artist);
        expect(res.body.title).to.eq(recordData[0].title);
        expect(res.body.image).to.eq(recordData[0].image);
        expect(res.body.genre).to.eq(recordData[0].genre);
        expect(res.body.releaseDate).to.eq(recordData[0].releaseDate);
        expect(res.body.condition).to.eq(recordData[0].condition);
        done();
      });
  });
});
