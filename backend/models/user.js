'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('recruiter', 'applicant'),
      allowNull: false,
      // defaultValue: 'applicant',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Map to the `created_at` column
    updatedAt: 'updated_at' // Optional: If you want snake_case for updatedAt too
  });
  return User;
};