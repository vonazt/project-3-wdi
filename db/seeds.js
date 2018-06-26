const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Record = require('../models/record');
const User = require('../models/user');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

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

  Promise.all(users.map(user => user.save()))
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
      }]);
    })
    .then(records => console.log(`${records.length} record(s) created`))
    .catch(err => console.log(err))
    .finally(() =>  mongoose.connection.close());
});
