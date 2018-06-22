const express = require('express');
const app = express();
const {port, dbURI} = require('./config/environment');


const mongoose = require('mongoose');

mongoose.connect(dbURI);

app.listen(port, ()=> console.log(`Listening in on ${port}`));
module.exports = app;
