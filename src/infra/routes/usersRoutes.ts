import { Router } from 'express';
import { userController } from '../../controller/user';

const usersRoutes = Router();

usersRoutes.get('/user', userController.list.bind(userController));
usersRoutes.post('/user', userController.create.bind(userController));
usersRoutes.post('/login', userController.login.bind(userController));

export { usersRoutes };
