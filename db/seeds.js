const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Record = require('../models/record');
const User = require('../models/user');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([{
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    wishlist: [{
      artist: 'Death Grips',
      album: 'Exmilitary'
    }, {
      artist: 'El-P',
      album: 'I\'ll Sleep When You\'re Dead'
    }]
  }, {
    username: 'martin',
    email: 'martin@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    wishlist: [{
      artist: 'Led Zeppelin',
      album: 'IV'
    }]
  }])
    .then(users => {
      console.log(`${users.length} users created`);
      return Record.create([{
        artist: 'David Bowie',
        title: 'The Man Who Sold The World',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
        genre: ['Rock'],
        label: 'RCA',
        releaseDate: 1970,
        condition: 'Mint',
        owner: users[0],
        recordComments: [{
          content: 'great pressing',
          rating: 4,
          author: users[1]
        }, {
          content: 'not bowie\'s best',
          rating: 3,
          author: users[0]
        }]
      }, {
        artist: 'Aphex Twin',
        title: 'Syro',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Aphex_Twin_-_Syro_alt_cover.jpg/220px-Aphex_Twin_-_Syro_alt_cover.jpg',
        genre: ['Electronic', 'Experimental'],
        label: 'Warp',
        releaseDate: 2014,
        condition: 'VG',
        owner: users[1],
        recordComments: [{
          content: 'comes on three vinyl',
          rating: 5,
          author: users[0]
        }]
      }]);
    })
    .then(records => console.log(`${records.length} record(s) created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
