/* global describe, beforeEach, it, expect, api */

const Record = require('../../models/record');

const recordData = {
  artist: 'David Bowie',
  title: 'The Man Who Sold The World',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genre: 'Rock',
  releaseDate: 1970,
  condition: 'Mint'
};

let recordId;

describe('GET /records/:id', () => {
  beforeEach(done => {
    Record
      .remove({})
      .then(() => Record.create(recordData))
      .then((record) => {
        recordId = record._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/records/${recordId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/records/${recordId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/records/${recordId}`)
      .end((err, res) => {
        expect(res.body.artist).to.eq(recordData.artist);
        expect(res.body.title).to.eq(recordData.title);
        expect(res.body.image).to.eq(recordData.image);
        expect(res.body.genre).to.eq(recordData.genre);
        expect(res.body.releaseDate).to.eq(recordData.releaseDate);
        expect(res.body.condition).to.eq(recordData.condition);
        done();
      });
  });
});
