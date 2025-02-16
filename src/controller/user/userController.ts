import { NextFunction, Request, Response } from 'express';
import { userDTO } from '../../domain/users/userDTO';
import { userLoginDTO } from '../../domain/users/userLoginDTO';
import { IUserService } from '../../service/user/IUserService';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.list();

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreateData = userDTO.parse(req.body);
      await this.userService.create(userCreateData);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userLoginData = userLoginDTO.parse(req.body);

      const response = await this.userService.login(userLoginData);

      res.status(200).json({ token: response });
    } catch (error) {
      next(error);
    }
  };
}
