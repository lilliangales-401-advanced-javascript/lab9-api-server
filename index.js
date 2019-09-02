'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

// console.log(process.env.MONGODB_URI)

/**
 * Start Server on specified port
 * @param port {integer} (defaults to process.env.PORT)
 */


require('./src/app.js').start(process.env.PORT);
