/* global describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const Record = require('../../models/record');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const recordData = {
  artist: 'Test Artist',
  title: 'Test Album',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genres: ['Rock'],
  label: 'RCA',
  releaseDate: 1970,
  condition: 'Mint'
};

const updatedRecordData = {
  artist: 'Aphex Twin',
  title: 'Syro',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Aphex_Twin_-_Syro_alt_cover.jpg/220px-Aphex_Twin_-_Syro_alt_cover.jpg',
  genre: ['Electronic', 'Experimental'],
  label: 'RCA',
  releaseDate: 2014,
  condition: 'VG'
};

let recordId;
let token;

describe('PUT /records/:id', () => {
  beforeEach(done => {
    Record
      .remove({})
      .then(() => User.remove({}))
      .then(() => Record.create(recordData))
      .then((record) => {
        recordId = record._id;
      })
      .then(() => User.create({
        username: 'test',
        email: 'test',
        password: 'test',
        passwordConfirmation: 'test'
      }))
      .then( user => {
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.put(`/api/records/${recordId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response with a token', done => {
    api.put(`/api/records/${recordId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a record', done => {
    api.put(`/api/records/${recordId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedRecordData)
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
    api.put(`/api/records/${recordId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedRecordData)
      .end((err, res) => {
        expect(res.body.artist).to.eq(updatedRecordData.artist);
        expect(res.body.title).to.eq(updatedRecordData.title);
        expect(res.body.image).to.eq(updatedRecordData.image);
        expect(res.body.label).to.eq(updatedRecordData.label);
        expect(res.body.releaseDate).to.eq(updatedRecordData.releaseDate);
        expect(res.body.condition).to.eq(updatedRecordData.condition);
        done();
      });
  });
});
