'use strict';
const jwt = require('jsonwebtoken');

exports.ValidateToken = function (req,res,next){
  if (typeof req.headers['x-token-api'] !== 'undefined') {
    const token = req.headers['x-token-api'];
    jwt.verify(token, 'ExpressRestFullAPIGateway', (err) => {
      if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token not match !'
      });
      next();
    });
  }else{
    res.status(401).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
  }
}