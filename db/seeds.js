const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const Record = require('../models/record');
const User = require('../models/user');
const { dbURI } = require('../config/environment');

const users = [
  new User({
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
  }),
  new User({
    username: 'martin',
    email: 'martin@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_405,q_auto:eco,w_600/https://inews.co.uk/wp-content/uploads/2017/05/GamesMaster-main.jpg'
  })
];

users[0].comments = [{
  content: 'very easy trade - would recommend',
  rating: 4,
  author: users[1]
}, {
  content: 'this guy is just the worst',
  rating: 3,
  author: users[0]
}];

users[1].comments = [{
  content: 'dude has the best collection ever',
  rating: 5,
  author: users[0]
}];

mongoose.connect(dbURI, (err, db) => {
  const promises = users.map(user => user.save());
  db.dropDatabase()
    .then(() => Promise.all(promises))
    .then(users => {
      console.log(`${users.length} users(s) created`);
      return Record.create([{
        artist: 'Led Zeppelin',
        title: 'IV',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg/220px-Led_Zeppelin_-_Led_Zeppelin_IV.jpg',
        genres: ['Hard rock', 'Blues rock'],
        label: 'Atlantic',
        releaseDate: 1971,
        condition: 'Good',
        owner: users[0],
        comments: [{
          content: 'great pressing of an amazing album',
          rating: 4,
          author: users[1]
        }, {
          content: 'no stairway!',
          rating: 3,
          author: users[0]
        }]
      }, {
        artist: 'Aphex Twin',
        title: 'Richard D. James Album',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Richard_d_james_album_cover.jpg/220px-Richard_d_james_album_cover.jpg',
        genres: ['Electronic', 'Drill \'n\' bass'],
        label: 'Warp',
        releaseDate: 1996,
        condition: 'Mint',
        owner: users[1],
        comments: [{
          content: 'aphex twin at his best - even better at 33rpm',
          rating: 5,
          author: users[0]
        }]
      }, {
        artist: 'Cannibal Ox',
        title: 'The Cold Vein',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/CannibalOxTheColdVein.jpg/220px-CannibalOxTheColdVein.jpg',
        genres: ['Hip hop'],
        label: 'Def Jux',
        releaseDate: 2001,
        condition: 'Very Good',
        owner: users[0],
        comments: [{
          content: 'El-P produces some incredible beats on this album but the pressing is shit',
          rating: 3,
          author: users[1]
        }, {
          content: 'love this album so much',
          rating: 5,
          author: users[0]
        }]
      }, {
        artist: 'David Bowie',
        title: 'Low',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Low_%28album%29.jpg/220px-Low_%28album%29.jpg',
        genres: ['Art rock', 'Avant pop'],
        label: 'RCA',
        releaseDate: 1977,
        condition: 'Acceptable',
        owner: users[0],
        comments: [{
          content: 'this record changed my life',
          rating: 4,
          author: users[1]
        }, {
          content: 'best bowie album!',
          rating: 3,
          author: users[0]
        }]
      }, {
        artist: 'Michael Jacjson',
        title: 'Thriller',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Michael_Jackson_-_Thriller.png/220px-Michael_Jackson_-_Thriller.png',
        genres: ['Pop', 'Post-disco', 'Funk'],
        label: 'Epic',
        releaseDate: 1982,
        condition: 'Good',
        owner: users[1],
        comments: [{
          content: 'can\'t get enough of this album',
          rating: 2,
          author: users[0]
        }]
      }, {
        artist: 'Sleep',
        title: 'Dopesmoker',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Dopesmoker_%28Reissue%29.jpeg/220px-Dopesmoker_%28Reissue%29.jpeg',
        genres: ['Drone', 'Experimental'],
        label: 'Rise Above',
        releaseDate: 1999,
        condition: 'Mint',
        owner: users[1],
        comments: [{
          content: 'An hour-long, single-song, drone masterpiece. Need I say more?',
          rating: 5,
          author: users[0]
        }]
      }]);
    })
    .then(records => console.log(`${records.length} record(s) created`))
    .catch(err => console.log(err))
    .finally(() =>  mongoose.connection.close());
});
