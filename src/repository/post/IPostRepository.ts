import { IPostCreate } from '../../domain/posts/postCreateDTO';
import { IPost } from '../../domain/posts/postDTO';
import { IPostUpdate } from '../../domain/posts/postUpdateDTO';

export interface IPostRepository {
  create: (newPost: IPostCreate) => Promise<IPost>;
  list: () => Promise<IPost[]>;
  getById: (postId: string) => Promise<IPost | null>;
  update: (postId: string, updatePost: IPostUpdate) => Promise<number>;
  delete: (postId: string) => Promise<void>;
}
