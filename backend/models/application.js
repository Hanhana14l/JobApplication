'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Application.init({
    jobId: DataTypes.INTEGER,
    applicantId: DataTypes.INTEGER,
    resume: DataTypes.STRING,
    cover_letter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};