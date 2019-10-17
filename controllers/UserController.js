'use strict';
const passwordHash = require('password-hash'),
  { tbluser } = require('../models'),
jwt = require('jsonwebtoken');
class UserController {
  
  // constructor(name){
  //   this.name = name ;
  // }
  
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
  
  Logout(req,res){
    jwt.sign({ token }, 'ExpressRestFullAPIVALIDATE', { expiresIn:'5s' }, (err, token) => {
      res.json('success logout'+token)
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
    const input = JSON.parse(JSON.stringify(req.body));
    
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
    tbluser.findAll().then((usr) => {
      res.json({status:"token match",data:usr});
    });
  }
  
  async GetdataById(req,res){
    const id = req.params.id;
    res.json({data:await tbluser.findByPk(id)})
  }
  
  async UpdateData(req,res){
    const input = JSON.parse(JSON.stringify(req.body)),
    id = req.params.id;
    if(input.username === undefined || input.password === undefined){
      res.json({msg:'cannot empty !'});
    }
    const passwordToSave = passwordHash.generate(input.password),
    data = {
      username: input.username,
      password: passwordToSave
    };
    tbluser.findByPk(id).then((Users) => {
      Users.update(data);
      res.json({msg:'success updated'});
    }).catch((err) => {;
      res.json({msg:err.message})
    });
  }
  
  async DeleteData(req,res){
    const input = JSON.parse(JSON.stringify(req.body)),
    id = input.id;
    tbluser.findByPk(id).then((row) => {
      row.destroy();
      res.json({message: 'sukses terhapus !'});
    }).catch((err) => {
      res.json({message: err.message});
    });
  }
  
}

module.exports = UserController