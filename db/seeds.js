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
  content: 'great pressing',
  rating: 4,
  author: users[1]
}, {
  content: 'not bowie\'s best',
  rating: 3,
  author: users[0]
}];

users[1].comments = [{
  content: 'comes on three vinyl',
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
        artist: 'Richard Aritst',
        title: 'Richard Album',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genres: ['Rock'],
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint',
        owner: users[0],
        comments: [{
          content: 'great pressing',
          rating: 4,
          author: users[1]
        }, {
          content: 'not bowie\'s best',
          rating: 3,
          author: users[0]
        }]
      }, {
        artist: 'Martin Artist',
        title: 'Martin Album',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Aphex_Twin_-_Syro_alt_cover.jpg/220px-Aphex_Twin_-_Syro_alt_cover.jpg',
        genres: ['Electronic', 'Experimental'],
        label: 'Warp',
        releaseDate: 2014,
        condition: 'VG',
        owner: users[1],
        comments: [{
          content: 'comes on three vinyl',
          rating: 5,
          author: users[0]
        }]
      }, {
        artist: 'Richard Aritst 2',
        title: 'Richard Album 2',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/CannibalOxTheColdVein.jpg/220px-CannibalOxTheColdVein.jpg',
        genre: ['Rock'],
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint',
        owner: users[0],
        comments: [{
          content: 'great pressing',
          rating: 4,
          author: users[1]
        }, {
          content: 'not bowie\'s best',
          rating: 3,
          author: users[0]
        }]
      }, {
        artist: 'Richard Aritst 3',
        title: 'Richard Album 3',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Low_%28album%29.jpg/220px-Low_%28album%29.jpg',
        genre: ['Rock'],
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint',
        owner: users[0],
        comments: [{
          content: 'great pressing',
          rating: 4,
          author: users[1]
        }, {
          content: 'not bowie\'s best',
          rating: 3,
          author: users[0]
        }]
      }, {
        artist: 'Martin Artist 2',
        title: 'Martin Album 2',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Year_of_the_Snitch_album_cover.jpg/220px-Year_of_the_Snitch_album_cover.jpg',
        genre: ['Electronic', 'Experimental'],
        label: 'Warp',
        releaseDate: 2014,
        condition: 'VG',
        owner: users[1],
        comments: [{
          content: 'comes on three vinyl',
          rating: 5,
          author: users[0]
        }]
      }, {
        artist: 'Martin Artist 3',
        title: 'Martin Album 3',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Bottomlesspitdeathgrips.jpg/220px-Bottomlesspitdeathgrips.jpg',
        genre: ['Electronic', 'Experimental'],
        label: 'Warp',
        releaseDate: 2014,
        condition: 'VG',
        owner: users[1],
        comments: [{
          content: 'comes on three vinyl',
          rating: 5,
          author: users[0]
        }]
      }]);
    })
    .then(records => console.log(`${records.length} record(s) created`))
    .catch(err => console.log(err))
    .finally(() =>  mongoose.connection.close());
});
