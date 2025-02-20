'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jobs', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    
    await queryInterface.addColumn('Jobs', 'category', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
    
    await queryInterface.addColumn('Jobs', 'location', {
      type: Sequelize.STRING(100),
      allowNull: false
    });
    
    await queryInterface.addColumn('Jobs', 'salary', {
      type: Sequelize.STRING(50),
      allowNull: true // Allow null if salary is optional
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jobs', 'description');
    await queryInterface.removeColumn('Jobs', 'category');
    await queryInterface.removeColumn('Jobs', 'location');
    await queryInterface.removeColumn('Jobs', 'salary');
  }
};
