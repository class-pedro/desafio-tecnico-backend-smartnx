import { ModelStatic } from 'sequelize';
import { IUserRepository } from './IUserRepository';
import User from '../../infra/database/models/User';
import { IUser } from '../../domain/users/userDTO';

export class UserRepository implements IUserRepository {
  private model: ModelStatic<User> = User;

  async list() {
    return await this.model.findAll();
  }

  async create(createUser: IUser) {
    await this.model.create(createUser);
  }

  async getUserByUsername(username: string) {
    return this.model.findOne({
      where: {
        username: username,
      },
    });
  }
}
