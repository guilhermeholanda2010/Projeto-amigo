'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.createTable('queries', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      doctor_id:{
        type: Sequelize.INTEGER,
        references: { model: 'doctors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      pacient_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pacient_cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      query_date:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      check:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
     
  },

  async down (queryInterface) {
    
    return queryInterface.dropTable('queries');
  }
};
