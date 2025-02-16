import { UserRepository } from '../../repository/user/userRepository';
import { UserService } from '../../service/user/userService';
import { UserController } from './userController';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
