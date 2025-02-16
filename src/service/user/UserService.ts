import { IUser } from '../../domain/users/userDTO';
import { IUserLogin } from '../../domain/users/userLoginDTO';
import { AppError, BadRequestError } from '../../errors';
import { IUserRepository } from '../../repository/user/IUserRepository';
import { IUserService } from './IUserService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async list() {
    return await this.userRepository.list();
  }

  async create(createUserPayload: IUser) {
    const { password, username } = createUserPayload;

    const user = await this.userRepository.getUserByUsername(username);

    if (user) {
      throw new AppError('Este username ja está em uso', 409);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUserPayload = {
      ...createUserPayload,
      password: hashPassword,
    };

    await this.userRepository.create(newUserPayload);
  }

  async login(loginPayload: IUserLogin) {
    const { username, password } = loginPayload;
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new BadRequestError('Usuário ou senha inválidos.');
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError('Usuário ou senha inválidos.');
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      }
    );

    return token;
  }
}
