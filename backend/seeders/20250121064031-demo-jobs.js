'use strict';

/** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
// 'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Jobs', [
      {
        title: 'Software Engineer',
        description: 'Develop and maintain software solutions.',
        category: 'Software engineering',
        location: 'Addis Abeba',
        salary: 'To be discussed in the interview',
        // jobType: 'engineering',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        title: 'Project Manager',
        description: 'Manage and coordinate projects.',
        category: 'Management',
        location: 'Addis Abeba',
        salary: 'To be discussed in the interview',
        // jobType: 'Management',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Jobs', null, {});
  },
};
