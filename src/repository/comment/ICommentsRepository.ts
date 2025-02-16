import { ICommentCreate } from '../../domain/comments/commentCreateDTO';
import { IComment } from '../../domain/comments/commentDTO';
import { ICommentUpdate } from '../../domain/comments/commentUpdateDTO';

export interface ICommentsRepository {
  create: (newComment: ICommentCreate) => Promise<IComment>;
  getById: (commentId: string) => Promise<IComment | null>;
  update: (commentId: string, updateComment: ICommentUpdate) => Promise<number>;
  delete: (commentId: string) => Promise<void>;
  listByPost: (postId: string) => Promise<IComment[]>;
}
