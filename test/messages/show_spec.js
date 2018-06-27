/* global describe, it, api, expect, beforeEach,   */
const Message = require('../../models/message');
const Comment = require('../../models/comment');
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

const commentData = {
  content: 'test-text'
};

let userOneId;
let userTwoId;
let token;
let messageId;
let messageData= {
  userOneId: userOneId,
  userTwoId: userTwoId,
  comments: [{ content: 'test' }]
};
let commentId;

describe('GET /messages/:id', () => {
  beforeEach(done => {
    User
      .remove({})
      .then(() => Message.remove({}))
      .then(() => User.create(userData[0]))
      .then( user => {
        userOneId = user._id;
      })
      .then(() => User.create(userData[1]))
      .then( user => {
        userTwoId = user._id;
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
      })
      .then(() => Message.create({
        userOneId: userOneId,
        userTwoId: userTwoId,
        comments: [{ content: 'test' }]
      }))
      .then((message) => {
        messageData.userOneId = message.userOneId;
        messageData.userTwoId = message.userTwoId;
        messageId = message._id;
        commentId = message.comments[0]._id;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.get(`/api/messages/${messageId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/messages/${messageId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/messages/${messageId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/messages/${messageId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.userOneId).to.eq(messageData.userOneId.toString());
        expect(res.body.userTwoId).to.eq(messageData.userTwoId.toString());
        expect(res.body.comments[0].content).to.deep.eq(messageData.comments[0].content);
        done();
      });
  });
});
