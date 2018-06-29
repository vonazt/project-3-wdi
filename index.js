const express = require('express');
const app = express();
const { port, dbURI } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(dbURI);

const routes = require('./config/routes');

app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static(`${__dirname}/public`));
app.get('/*',(req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, ()=> console.log(`Listening in on ${port}`));

module.exports = app;
