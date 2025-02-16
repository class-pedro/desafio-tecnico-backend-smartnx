import { IPostCreate } from '../../domain/posts/postCreateDTO';
import { IPost } from '../../domain/posts/postDTO';
import { IPostUpdate } from '../../domain/posts/postUpdateDTO';
import { IUser } from '../../domain/users/userDTO';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { IPostRepository } from '../../repository/post/IPostRepository';
import { IUserRepository } from '../../repository/user/IUserRepository';
import { IPostService } from './IPostService';

export class PostService implements IPostService {
  constructor(
    readonly postsRepository: IPostRepository,
    readonly usersRepository: IUserRepository
  ) {}

  async create(newPostPayload: IPostCreate) {
    return await this.postsRepository.create(newPostPayload);
  }

  async list() {
    return await this.postsRepository.list();
  }

  async getById(postId: string) {
    return await this.postsRepository.getById(postId);
  }

  async canContinue(postId: string, username: string) {
    const post = await this.getById(postId);
    const user = await this.usersRepository.getUserByUsername(username);

    if (!post) {
      throw new NotFoundError('Post não encontrado.');
    }

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    const { username: requesterUsername } = user;

    if (post.authorId !== requesterUsername) {
      throw new UnauthorizedError('Você não pode alterar/excluir um post que não é seu.');
    }
  }

  async update(
    postId: string,
    updatePostPayload: IPostUpdate,
    username: string
  ) {
    await this.canContinue(postId, username);

    const updatedPostsQuantity = await this.postsRepository.update(
      postId,
      updatePostPayload
    );

    if (updatedPostsQuantity === 0) {
      return null;
    }

    const updatedPost = await this.getById(postId);

    return updatedPost;
  }

  async delete(postId: string, username: string) {
    await this.canContinue(postId, username);
    await this.postsRepository.delete(postId);
  }
}
