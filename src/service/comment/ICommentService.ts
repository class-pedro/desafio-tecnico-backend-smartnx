import { ICommentCreate } from '../../domain/comments/commentCreateDTO';
import { IComment } from '../../domain/comments/commentDTO';
import { ICommentUpdate } from '../../domain/comments/commentUpdateDTO';

export interface ICommentService {
  create: (newComment: ICommentCreate) => Promise<IComment>;
  getById: (commentId: string) => Promise<IComment | null>;
  canContinue: (commentId: string, username: string) => Promise<void>;
  update: (
    commentId: string,
    updateComment: ICommentUpdate,
    username: string
  ) => Promise<IComment | null>;
  delete: (commentId: string, username: string) => Promise<void>;
  listByPost: (postId: string) => Promise<IComment[]>;
}
