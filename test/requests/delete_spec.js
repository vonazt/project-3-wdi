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
let requestId;

const updatedRequestData = {
  message: 'test offer 2'
};

describe('DELETE /requests/:id', () => {
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
        requestData._id = request._id;
        requestId = request._id;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.delete(`/api/requests/${requestId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response', done => {
    api.delete(`/api/requests/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should return no data', done => {
    api.delete(`/api/requests/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  });

});
