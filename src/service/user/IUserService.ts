import { IUser } from '../../domain/users/userDTO';
import { IUserLogin } from '../../domain/users/userLoginDTO';

export interface IUserService {
  list: () => Promise<IUser[]>;
  create: (createUserPayload: IUser) => Promise<void>;
  login: (loginPayload: IUserLogin) => Promise<string>;
}
