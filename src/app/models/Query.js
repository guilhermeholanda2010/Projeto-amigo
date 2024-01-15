import Sequelize, { Model } from 'sequelize';

class Query extends Model{
  static init(sequelize){
    super.init(
      {
      pacient_name: Sequelize.STRING,
      pacient_cpf: Sequelize.STRING,
      query_date: Sequelize.STRING,
      check: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models){
    this.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
  }
}

export default Query;