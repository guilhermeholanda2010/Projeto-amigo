import { Router } from 'express';

import authMiddleware from './app/middlewares/auth'

import DoctorController from './app/controllers/DoctorController';
import SessionController from './app/controllers/SessionController';
import QueryController from './app/controllers/QueryController';

const routes = new Router();

routes.post('/doctors', DoctorController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/doctors', DoctorController.update);

routes.post('/queries', QueryController.store);
routes.get('/queries', QueryController.index);
routes.put('/queries/:query_id', QueryController.update);
routes.delete('/queries/:query_id', QueryController.delete);


export default routes;
