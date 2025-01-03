'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure title is not null
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false, // Ensure description is not null
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure category is not null
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure location is not null
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure salary is not null
      },
      jobType: {
        type: Sequelize.ENUM('full-time', 'part-time', 'contract', 'internship'), // Limit job type to specific options
        allowNull: false,
        defaultValue: 'full-time', // Set default value to 'full-time'
      },
      recruiterId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure every job is associated with a recruiter
        references: {
          model: 'Users', // Establish foreign key relationship with Users table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Automatically set current timestamp
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Automatically update on changes
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};
