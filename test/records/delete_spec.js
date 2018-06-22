/* global describe, beforeEach, it, expect, api */

const Record = require('../../models/record');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const {secret}= require('../../config/environment');

const recordData = {
  artist: 'David Bowie',
  title: 'The Man Who Sold The World',
  image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
  genre: ['Rock'],
  releaseDate: 1970,
  condition: 'Mint',
  comments: [{
    content: 'great pressing',
    rating: 4,
    author: userData[1]
  }, {
    content: 'not bowie\'s best',
    rating: 3,
    author: userData[0]
  }]
};

let token;
let recordId;

describe('DELETE /records/:id', () => {
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
    api.delete(`/api/records/${recordId}`)
      .end((err, res) =>{
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204', done => {
    api.delete(`/api/records/${recordId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) =>{
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should return no data', done => {
    api
      .delete(`/api/records/${recordId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  });
});
