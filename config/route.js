'use strict';
const express = require('express'), routing = express(),
  user = require('../routes/user');

routing.use(user);

module.exports = routing;