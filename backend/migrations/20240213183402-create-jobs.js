'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
    job_id: {  
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    recruiter_id: { 
      type: Sequelize.INTEGER,
      allowNull: false,
    
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    job_type: { 
      type: Sequelize.ENUM('full-time', 'part-time', 'contract', 'internship'),
      allowNull: false,
      defaultValue: 'full-time'
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  });
  await queryInterface.addConstraint('Jobs', {
    fields: ['recruiter_id'],
    type: 'foreign key',
    name: 'jobs_recruiter_fk',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Jobs', 'jobs_recruiter_fk');
    await queryInterface.dropTable('Jobs');
  }
};
