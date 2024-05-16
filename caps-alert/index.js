'use strict';

require('dotenv').config();

const URL = process.env.URL;

const Alert = require('./Alert');//replace Vendor with Alert

const weather = new Alert(URL, 'Weather', 1000);

const traffic = new Alert(URL, 'Traffic', 3000);


