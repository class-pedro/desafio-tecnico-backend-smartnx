import { UserRepository } from '../../repository/user/UserRepository';
import { UserService } from '../../service/user/UserService';
import { UserController } from './userController';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
