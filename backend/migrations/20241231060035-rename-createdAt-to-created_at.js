'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename 'createdAt' to 'created_at' in the relevant tables
    await queryInterface.renameColumn('Users', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Jobs', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Categories', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Applications', 'createdAt', 'created_at');
  },

  async down(queryInterface, Sequelize) {
    // Reverse the changes in case of rollback
    await queryInterface.renameColumn('Users', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Jobs', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Categories', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Applications', 'created_at', 'createdAt');
  }
};
