// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Job extends Model {
//     static associate(models) {
//       // Define associations here
//       Job.belongsTo(models.User, {
//         foreignKey: 'recruiterId',
//         as: 'recruiter'
//       });
//     }
//   }
//   Job.init({
//     jobId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     recruiterId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     title: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     category: DataTypes.STRING,
//     location: DataTypes.STRING,
//     salary: DataTypes.STRING,
//     jobType: {
//       type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
//       allowNull: false,
//       defaultValue: 'full-time'
//     }
//   }, {
//     sequelize,
//     modelName: 'Job',
//     timestamps: true,
//     createdAt: 'createdAt',
//     updatedAt: 'updatedAt',
//     // Add this to disable the default 'id' field
//     id: false
//   });
//   return Job;
// };

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'recruiter_id',
        as: 'recruiter'
      });
    }
  }

  Job.init({
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    recruiter_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    salary: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    job_type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'Jobs', // Explicit table name
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true // Add this for snake_case fields
  });

  return Job;
};