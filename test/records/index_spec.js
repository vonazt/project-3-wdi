/* global describe, it, api, expect, beforeEach */
const Record = require('../../models/record');

const recordData = [{
  artist: 'David Bowie',
  title: 'The Man Who Sold The World',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genre: 'Rock',
  releaseDate: '1970',
  condition: 'Mint'
}];

describe('GET /records', ()=>{
  beforeEach(done => {
    Record
      .remove({})
      .then( () => Record.create(recordData))
      .then( () => done() );
  });

  it('should return a 200 response', done => {
    api.get('/api/records')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});
