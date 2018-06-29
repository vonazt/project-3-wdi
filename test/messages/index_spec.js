/* global describe, it, api, expect, beforeEach,   */
const Message = require('../../models/message');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData = [
  {
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
  },
  {
    username: 'martin',
    email: 'martin@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_405,q_auto:eco,w_600/https://inews.co.uk/wp-content/uploads/2017/05/GamesMaster-main.jpg'
  }
];

let userOneId;
let userTwoId;
let messageId;
let token;

const messageData= [{
  userOneId: userOneId,
  userTwoId: userTwoId
}];

describe('GET /messages', () => {
  beforeEach(done => {
    User
      .remove({})
      .then(() => Message.remove({}))
      .then(() => User.create(userData[0]))
      .then( user => {
        userOneId = user._id;
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
      })
      .then(() => User.create(userData[1]))
      .then( user => {
        userTwoId = user._id;
      })
      .then(() => Message.create(messageData))
      .then((message) => {
        messageId = message._id;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/messages')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get('/api/messages')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});
