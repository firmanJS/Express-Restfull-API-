'use strict';
const passwordHash = require('password-hash'),
{ tbluser } = require('../models'),
jwt = require('jsonwebtoken');
class UserController {
  
  constructor(name){
    this.name = name ;
  }
  
  index(req,res){
    res.json({
      msg:'welcome to simple restfull api expressjs Sequelize !',
      info : {
        step1:'set the token in url localhost:6500/setToken',
        username:'user',
        password:'user'
      }
    });
  }
  
  async setToken(req,res){
    const input = JSON.parse(JSON.stringify(req.body)),
    username = input.username.trim(),
    password = input.password.trim(),
    cek = await tbluser.findOne({
      where: {
        username: username
      }
    });
    if (cek) {
      const verify = passwordHash.verify(password, cek.password);
      if (verify != true) {
        res.json({msg:'Password incorect !'})
      } else {
        const userToken = {
          id: cek.id,
          username: cek.username
        }
        jwt.sign({
          userToken
        }, 'ExpressRestFullAPI', {
          expiresIn: '3h' //set exipre token
        }, (err, token) => {
          res.json({token:token})
        });
      }
    } else {
      res.json({msg:'username or password not match '});
    }
  }
  
  async Register(req, res) {
    const token = req.headers['x-token-api'],
    input = JSON.parse(JSON.stringify(req.body));
    jwt.verify(token, 'ExpressRestFullAPI', function (err) {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
    });
    if(input.username === undefined || input.password === undefined){
      res.json({msg:'cannot empty !'});
    }
    const passwordToSave = passwordHash.generate(input.password),
    data = {
      username: input.username,
      password: passwordToSave
    };
    tbluser.create(data).then(() => {
      res.json({msg:'success inserting !'});
    }).catch((err) => {
      res.json({msg:err.message});
    });
  }
  
  async Getdata(req,res){
    const token = req.headers['x-token-api'];
    jwt.verify(token, 'ExpressRestFullAPI', function (err) {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
    });
    tbluser.findAll().then((usr) => {
      res.json({status:"token match",data:usr});
    });
  }
  
  async GetdataById(req,res){
    const token = req.headers['x-token-api'],
    id = req.params.id;
    jwt.verify(token, 'ExpressRestFullAPI', function (err) {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
    });
    res.json({data:await tbluser.findByPk(id)})
  }
  
  async UpdateData(req,res){
    const token = req.headers['x-token-api'],
    input = JSON.parse(JSON.stringify(req.body)),
    id = req.params.id;
    jwt.verify(token, 'ExpressRestFullAPI', function (err) {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
    });
    if(input.username === undefined || input.password === undefined){
      res.json({msg:'cannot empty !'});
    }
    const passwordToSave = passwordHash.generate(input.password),
    data = {
      username: input.username,
      password: passwordToSave
    };
    jwt.verify(token, 'ExpressRestFullAPI', function (err) {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
    });
    tbluser.findByPk(id).then((Users) => {
      Users.update(data);
      res.json({msg:'success updated'});
    }).catch((err) => {;
      res.json({msg:err.message})
    });
  }
  
  async DeleteData(req,res){
    const token = req.headers['x-token-api'],
    input = JSON.parse(JSON.stringify(req.body)),
    id = input.id;
    jwt.verify(token, 'ExpressRestFullAPI', function (err) {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
    });
    tbluser.findByPk(id).then((row) => {
      row.destroy();
      res.json({message: 'sukses terhapus !'});
    }).catch((err) => {
      res.json({message: err.message});
    });
  }
  
}
module.exports = UserController