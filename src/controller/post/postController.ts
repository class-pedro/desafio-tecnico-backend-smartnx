import { NextFunction, Request, Response } from 'express';
import { postCreateDTO } from '../../domain/posts/postCreateDTO';
import { IPostService } from '../../service/post/IPostService';
import { postUpdateDTO } from '../../domain/posts/postUpdateDTO';

export class PostController {
  constructor(private readonly postService: IPostService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postCreateForm = postCreateDTO.parse(req.body);

      const response = await this.postService.create(postCreateForm);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.postService.list();
      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const { username, ...postContentUpdate } = req.body;
      const postContentPayload = postUpdateDTO.parse(postContentUpdate);

      const response = await this.postService.update(
        postId,
        postContentPayload,
        username
      );

      if (!response) {
        res.status(304).send('Não foi possível editar a postagem.');
      }

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const { username } = req.body;

      await this.postService.delete(postId, username);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
