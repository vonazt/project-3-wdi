const express = require('express');
const app = express();
const { port, dbURI } = require('./config/environment');

const mongoose = require('mongoose');

mongoose.connect(dbURI);

const routes = require('./config/routes');

app.use('/api', routes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Something went wrong' });
  next(err);
});

app.listen(port, ()=> console.log(`Listening in on ${port}`));
