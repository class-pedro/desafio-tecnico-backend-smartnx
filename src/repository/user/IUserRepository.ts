import { IUser } from '../../domain/users/userDTO';

export interface IUserRepository {
  list: () => Promise<IUser[]>;
  create: (createUser: IUser) => Promise<void>;
  getUserByUsername: (username: string) => Promise<IUser | null>;
}
