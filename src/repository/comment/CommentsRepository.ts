import { ModelStatic } from 'sequelize';
import { ICommentsRepository } from './ICommentsRepository';
import Comment from '../../infra/database/models/Comment';
import { ICommentCreate } from '../../domain/comments/commentCreateDTO';
import { ICommentUpdate } from '../../domain/comments/commentUpdateDTO';

export class CommentsRepository implements ICommentsRepository {
  private model: ModelStatic<Comment> = Comment;

  async create(newComment: ICommentCreate) {
    return await this.model.create(newComment);
  }

  async listByPost(postId: string) {
    return this.model.findAll({
      where: {
        postId,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async getById(commentId: string) {
    return this.model.findOne({ where: { id: commentId } });
  }

  async update(commentId: string, updateComment: ICommentUpdate) {
    const { content } = updateComment;

    const [updatedRow] = await this.model.update(
      { content },
      { where: { id: commentId } }
    );

    return updatedRow;
  }

  async delete(commentId: string) {
    await this.model.destroy({
      where: {
        id: commentId,
      },
    });
  }
}
