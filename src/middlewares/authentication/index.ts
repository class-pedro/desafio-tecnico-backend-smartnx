import { UserRepository } from '../../repository/user/UserRepository';
import { AuthenticationMiddleware } from './authenticationMiddleware';

const usersRepository = new UserRepository();

export const authenticationMiddleware = new AuthenticationMiddleware(
  usersRepository
);
