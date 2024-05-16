'use strict';

require('dotenv').config();

const URL = process.env.URL;

const Vendor = require('./Vendor');

const acmeWidgets = new Vendor(URL, 'Acme-widgets', 1000);

const flowers = new Vendor(URL, '1-800-flowers', 3000);


