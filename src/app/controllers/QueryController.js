import * as Yup from 'yup';
import Query from "../models/Query";

class QueryController{

  async index(req, res){

    const queries = await Query.findAll({
      where: {doctor_id: req.doctorId, check: false},
    });

    return res.json(queries);
  }

  async store(req, res){

    const schema = Yup.object().shape({
      pacient_name: Yup.string().required(),
      pacient_cpf: Yup.string().length(11).required(),
      query_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failure' });
    }

    const {  pacient_name, pacient_cpf, query_date} = req.body;

    const queries = await Query.create({
      pacient_name,
      pacient_cpf,
      query_date,
      doctor_id: req.doctorId,
    });
    
    return res.json(queries);
  }

  async update(req, res){
    
    const { query_id } = req.params;

    const query = await Query.findByPk(query_id);

    if (!query) {
      return res.status(400).json({ error: 'Query not found' });
    }

    await query.update(req.body);

    return res.json(query);
  }

  async delete(req, res){
    
    const { query_id } = req.params;

    const query = await Query.findByPk(query_id);

    if (!query) {
      return res.status(400).json({ error: 'Query not found' });
    }

    if(query.doctor_id !== req.doctorId){
      return res.status(401).json({ error: 'You are not the owner of this query' });
    }

    await query.destroy();

    return res.send();
  }
}
export default new QueryController();