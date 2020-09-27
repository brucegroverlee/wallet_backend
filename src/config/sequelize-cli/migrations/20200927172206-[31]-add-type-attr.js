'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('categoryGroups', 'type', {
            type: Sequelize.STRING,
            defaultValue: "expenses",
        }, { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('categoryGroups', 'type', { transaction: t }),
      ]);
    });
  }
};
