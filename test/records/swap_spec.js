/* global describe, it, api, expect, beforeEach */
const Record = require('../../models/record');
const User = require('../../models/user');
const Request = require('../../models/request');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const recordData = [{
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
}];

const userData = [
  {
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    numberOfTrades: 0,
    avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
  },
  {
    username: 'martin',
    email: 'martin@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    numberOfTrades: 0,
    avatar: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_405,q_auto:eco,w_600/https://inews.co.uk/wp-content/uploads/2017/05/GamesMaster-main.jpg'
  }
];
const requestData = {};

let token;
let ownerOne;
let ownerTwo;

describe('POST /records/swap', ()=>{
  beforeEach(done => {
    User
      .remove({})
      .then(() => Record.remove({}))
      .then(() => User.create(userData[0]))
      .then( user => {
        ownerOne = user._id;
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
      })
      .then(() => User.create(userData[1]))
      .then( user => {
        ownerTwo = user._id;
      })
      .then(() => Record.create([{
        artist: 'Test Artist',
        title: 'Test Album',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genres: ['Rock'],
        owner: ownerOne,
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint'
      },{
        artist: 'Test Artist 2',
        title: 'Test Album 2',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genres: ['Rock'],
        owner: ownerTwo,
        label: 'RCA 2',
        releaseDate: 1972,
        condition: 'Mint 2'
      }]))
      .then((record) => {
        recordData[0].owner = record[0].owner;
        recordData[1].owner = record[1].owner;
        recordData[0]._id = record[0]._id;
        recordData[1]._id = record[1]._id;
      })
      .then(() => Request.create({
        wantedRecord: recordData[0]._id,
        offeredRecord: [recordData[1]._id],
        message: 'test-message'
      }))
      .then((request) => {
        requestData.ownedRecordId = request.wantedRecord;
        requestData.offeredRecordId = request.offeredRecord;
        requestData._id = request._id;
      })
      .then(done);
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/records/swap')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.post('/api/records/swap')
      .set('Authorization', `Bearer ${token}`)
      .send(requestData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

});
