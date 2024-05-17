'use strict';

require('dotenv').config();

const URL = process.env.URL;

const Alert = require('./alert');

const weather = new Alert(URL, 'Weather', 1000);



