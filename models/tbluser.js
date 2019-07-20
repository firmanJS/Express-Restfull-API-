'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbluser = sequelize.define('tbluser', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  tbluser.associate = function(models) {
    // associations can be defined here
  };
  return tbluser;
};