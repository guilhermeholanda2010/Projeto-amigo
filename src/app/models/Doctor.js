import Sequelize, { Model }  from 'sequelize';
import bcrypt from 'bcryptjs';

class Doctor extends Model {
  static init(sequelize){
      super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
      );

      this.addHook('beforeSave', async (doctor)=> {
        if(doctor.password){
          doctor.password_hash = await bcrypt.hash(doctor.password, 8);

        }
      });
      return this;
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Doctor;