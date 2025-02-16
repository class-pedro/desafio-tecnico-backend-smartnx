import { ICommentCreate } from '../../domain/comments/commentCreateDTO';
import { IComment } from '../../domain/comments/commentDTO';
import { ICommentUpdate } from '../../domain/comments/commentUpdateDTO';
import { IUser } from '../../domain/users/userDTO';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { ICommentsRepository } from '../../repository/comment/ICommentsRepository';
import { IPostRepository } from '../../repository/post/IPostRepository';
import { IUserRepository } from '../../repository/user/IUserRepository';
import { ICommentService } from './ICommentService';

export class CommentService implements ICommentService {
  constructor(
    readonly commentsRepository: ICommentsRepository,
    readonly usersRepository: IUserRepository,
    readonly postsRepository: IPostRepository
  ) {}

  async create(newComment: ICommentCreate) {
    const { postId } = newComment;

    const post = await this.postsRepository.getById(postId);

    if (!post) {
      throw new NotFoundError(
        'O post em que você tentou comentar não está mais disponível.'
      );
    }

    return await this.commentsRepository.create(newComment);
  }

  async getById(commentId: string) {
    return await this.commentsRepository.getById(commentId);
  }

  async listByPost(postId: string) {
    const post = await this.postsRepository.getById(postId);

    if (!post) {
      throw new NotFoundError('O post não está mais disponível.');
    }

    return await this.commentsRepository.listByPost(postId);
  }

  async canContinue(commentId: string, username: string) {
    const comment = await this.getById(commentId);
    const user = await this.usersRepository.getUserByUsername(username);

    if (!comment) {
      throw new NotFoundError('Comentário não encontrado.');
    }

    const post = await this.postsRepository.getById(comment?.postId);
    post?.authorId;

    if (!post) {
      throw new NotFoundError('Post não encontrado.');
    }

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    const { authorId: postOwner } = post;
    const { username: requesterUsername } = user;

    if (
      postOwner !== requesterUsername &&
      comment.authorId !== requesterUsername
    ) {
      throw new UnauthorizedError('Você não pode alterar um comentário que não é seu.');
    }
  }

  async update(
    commentId: string,
    updateComment: ICommentUpdate,
    username: string
  ) {
    await this.canContinue(commentId, username);

    const updatedCommentsQuantity = await this.commentsRepository.update(
      commentId,
      updateComment
    );

    if (updatedCommentsQuantity === 0) {
      return null;
    }

    const updatedComment = await this.getById(commentId);

    return updatedComment;
  }

  async delete(commentId: string, username: string) {
    await this.canContinue(commentId, username);
    await this.commentsRepository.delete(commentId);
  }
}
