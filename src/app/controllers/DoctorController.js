import * as Yup from 'yup';
import Doctor from '../models/Doctor';
class DoctorController{
  async store(req, res){

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
      .email()
      .required(),
      cpf: Yup.string()
      .length(11)
      .required(),
      password: Yup.string()
      .required()
      .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validacao' });
    }

    const emailExists = await Doctor.findOne({
      where: { email: req.body.email },
    });

    const cpfExists = await Doctor.findOne({
      where: { cpf: req.body.cpf },
    });
    
    if (emailExists) {
      return res.status(400).json({ error: 'Email já cadastrado.' })
    }

    if (cpfExists) {
      return res.status(400).json({ error: 'CPF já cadastrado.' })
    }
    
    const {id, name, cpf, email} = await Doctor.create(req.body);

    return res.json({
      id,
      name,
      cpf,
      email,
    });
  }

  async update(req, res){

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string().length(11),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword,field)=>
      oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password,field)=>
      password ? field.required().oneOf([Yup.ref('password')]) : field
      ),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validacao' });
    }

    const { email, cpf, oldPassword } = req.body;

    const doctor = await Doctor.findByPk(req.userId);

    if (email !== doctor.email)  {
      const emailExists = await Doctor.findOne({
        where: { email: req.body.email },
      });
      if(emailExists){
        return res.status(400).json({ error: 'Email já cadastrado.' });
        
      }
    }

    if (cpf !== doctor.cpf)  {
      const cpfExists = await Doctor.findOne({
        where: { cpf: req.body.cpf },
      });
      if(cpfExists){
        return res.status(400).json({ error: 'CPF já cadastrado.' });
        
      }
    }

    if(oldPassword && !(await doctor.checkPassword(oldPassword))){
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const {id, name} = await doctor.update(req.body);

    return res.json({ 
      id,
      name,
      cpf,
      email,
    });
  }
}

export default new DoctorController();