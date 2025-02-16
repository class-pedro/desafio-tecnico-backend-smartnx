import { NextFunction, Request, Response } from 'express';
import { ICommentService } from '../../service/comment/ICommentService';
import { commentCreateDTO } from '../../domain/comments/commentCreateDTO';
import { commentUpdateDTO } from '../../domain/comments/commentUpdateDTO';

export class CommentController {
  constructor(private readonly commentService: ICommentService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentCreateForm = commentCreateDTO.parse(req.body);

      const response = await this.commentService.create(commentCreateForm);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  };

  listByPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const response = await this.commentService.listByPost(postId);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const { username, ...commentUpdatePayload } = req.body;

      const commentUpdateForm = commentUpdateDTO.parse(commentUpdatePayload);

      const response = await this.commentService.update(
        postId,
        commentUpdateForm,
        username
      );

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const { username } = req.body;

      await this.commentService.delete(postId, username);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
