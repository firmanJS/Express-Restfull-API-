'use strict';
const express = require('express'),
  user = require('../controllers/UserController'),
  users = new user(),
  router = express.Router();

router.get('/', users.index);
router.get('/getData', users.Getdata);
router.get('/getDataById/:id', users.GetdataById);
router.post('/user/setToken', users.setToken);
router.get('/logout', users.Logout);
router.post('/register', users.Register);
router.put('/UpdateData/:id', users.UpdateData);
router.delete('/DeleteData', users.DeleteData);

module.exports = router;