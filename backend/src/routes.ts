import { Router } from 'express';
import ClassController from './controllers/ClasseController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = Router();

const classController = new ClassController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classController.index);
routes.post('/classes', classController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
