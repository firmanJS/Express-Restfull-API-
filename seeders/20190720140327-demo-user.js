'use strict';
const passwordHash = require('password-hash');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tblusers', [{
        username: 'user',
        password: passwordHash.generate('user'),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('tblusers', null, {});
  }
};
