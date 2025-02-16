import { IPostCreate } from '../../domain/posts/postCreateDTO';
import { IPost } from '../../domain/posts/postDTO';
import { IPostUpdate } from '../../domain/posts/postUpdateDTO';

export interface IPostService {
  create: (newPostPayload: IPostCreate) => Promise<IPost>;
  list: () => Promise<IPost[]>;
  getById: (postId: string) => Promise<IPost | null>;
  canContinue: (postId: string, username: string) => Promise<void>;
  update: (
    postId: string,
    updatePostPayload: IPostUpdate,
    username: string
  ) => Promise<IPost | null>;
  delete: (postId: string, username: string) => Promise<void>;
}
