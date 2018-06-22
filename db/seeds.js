const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Record = require('../models/record');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Record.create({
    artist: 'David Bowie',
    title: 'The Man Who Sold The World',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/MWSTWUS2.jpg/220px-MWSTWUS2.jpg',
    genre: 'Rock',
    releaseDate: '1970',
    condition: 'Mint'
  })
    .then(records => console.log(`${records.length} record(s) created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
