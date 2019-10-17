'use strict';
const express = require('express'),
  user = require('../controllers/UserController'),
  check = require('..//helper/Validation'),
  users = new user(),
  router = express.Router();

router.get('/', users.index);
router.get('/user',check.ValidateToken,users.Getdata);
router.get('/user/:id', check.ValidateToken,users.GetdataById);
router.post('/user', users.setToken);
router.get('/logout', users.Logout);
router.post('/register', check.ValidateToken,users.Register);
router.put('/user/:id', check.ValidateToken,users.UpdateData);
router.delete('/user', check.ValidateToken,users.DeleteData);

module.exports = router;