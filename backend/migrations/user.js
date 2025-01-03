'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM('recruiter', 'applicant'), // Define role as ENUM
        allowNull: false,
        defaultValue: 'applicant', // Set default role to 'applicant'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure name is not null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure email is not null
        unique: true, // Enforce uniqueness for email
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure password is not null
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
   
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Set default value
      },
    
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Automatically update on changes
      // }
    }
   );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
