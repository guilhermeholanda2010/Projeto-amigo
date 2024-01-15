import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Doctor from '../app/models/Doctor';
import Query from '../app/models/Query';

const models = [Doctor, Query];

class Database{
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    
    models
    .map(model => model.init(this.connection))
    .map(model=> model.associate && model.associate(this.connection.models));
  }

}

export default new Database();