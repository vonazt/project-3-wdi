/* global describe, beforeEach, it, expect, api */

const Record = require('../../models/record');

const recordData = {
  artist: 'Test Artist',
  title: 'Test Album',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genres: ['Rock'],
  label: 'RCA',
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
        expect(res.body.genres).to.deep.eq(recordData.genres);
        expect(res.body.label).to.eq(recordData.label);
        expect(res.body.releaseDate).to.eq(recordData.releaseDate);
        expect(res.body.condition).to.deep.eq(recordData.condition);
        done();
      });
  });
});
