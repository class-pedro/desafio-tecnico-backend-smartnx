import { UserRepository } from '../../repository/user/userRepository';
import { AuthenticationMiddleware } from './authenticationMiddleware';

const usersRepository = new UserRepository();

export const authenticationMiddleware = new AuthenticationMiddleware(
  usersRepository
);
