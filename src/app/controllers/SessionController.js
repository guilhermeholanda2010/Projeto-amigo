import Doctor from '../models/Doctor';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth'

class SessionController{
  async store(req, res){

    const { cpf, password } = req.body;

    const doctor = await Doctor.findOne({
      where: { cpf },
    });

    if (!doctor) {
      return res.status(400).json({ error: 'Médico não cadastrado.' });
    }

    if(!(await doctor.checkPassword(password))){
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    const { id, name, email} = doctor;

    return res.json({ 
     user:{
      id,
      name,
      cpf,
      email,
     },
     token: jwt.sign({ id }, auth.secret, {
      expiresIn: auth.expiresIn,
     }),
    });

  }
}

export default new SessionController();