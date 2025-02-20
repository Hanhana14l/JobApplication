'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure jobId is not null
        references: {
          model: 'Jobs', // Reference the Jobs table
          key: 'job_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      applicantId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure applicantId is not null
        references: {
          model: 'Users', // Reference the Users table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure the resume field is mandatory
      },
      cover_letter: {
        type: Sequelize.STRING,
        allowNull: true, // Allow NULL values
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'rejected'), // Use Sequelize.ENUM
        allowNull: false,
        defaultValue: 'pending',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Applications');
  }
};
