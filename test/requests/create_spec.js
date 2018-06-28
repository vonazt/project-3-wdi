/* global describe, it, api, expect, beforeEach,   */
const Request = require('../../models/request');
const Record = require('../../models/record');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const requestData = {};
let recordOneId;
let recordTwoId;
let token;

describe('POST /requests', () => {
  beforeEach(done => {
    Request
      .remove({})
      .then(() => Record.remove({}))
      .then(() => User.remove({}))
      .then(() => User.create({
        username: 'test',
        email: 'test',
        password: 'test',
        passwordConfirmation: 'test'
      }))
      .then( user => {
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
      })
      .then(() => Record.create([{
        artist: 'Test Artist',
        title: 'Test Album',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genres: ['Rock'],
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint'
      },{
        artist: 'Test Artist 2',
        title: 'Test Album 2',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genres: ['Rock'],
        label: 'RCA 2',
        releaseDate: 1972,
        condition: 'Mint 2'
      }]))
      .then(record => {
        recordOneId = record[0]._id;
        recordTwoId = record[1]._id;
      })
      .then(() => Request.create({
        wantedRecord: recordOneId,
        offeredRecord: [recordTwoId],
        message: 'Test offer'
      }))
      .then((request) => {
        requestData.wantedRecord = request.wantedRecord;
        requestData.offeredRecord = request.offeredRecord;
        requestData.message = request.message;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.post(`/api/records/${recordOneId}/requests`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {
    api.post(`/api/records/${recordOneId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .send(requestData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the created request', done => {
    api.post(`/api/records/${recordOneId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .send(requestData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'wantedRecord',
          'offeredRecord',
          'message'
        ]);
        done();
      });
  });
});
