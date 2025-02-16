import { ModelStatic } from 'sequelize';
import { IPostRepository } from './IPostRepository';
import Post from '../../infra/database/models/Post';
import { IPostCreate } from '../../domain/posts/postCreateDTO';
import User from '../../infra/database/models/User';
import Comment from '../../infra/database/models/Comment';
import { IPostUpdate } from '../../domain/posts/postUpdateDTO';

export class PostRepository implements IPostRepository {
  private model: ModelStatic<Post> = Post;

  async create(newPost: IPostCreate) {
    return await this.model.create(newPost);
  }

  async list() {
    return await this.model.findAll({
      include: [
        {
          model: User,
          as: 'postAuthor',
          attributes: ['name', 'username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              as: 'commentAuthor',
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async getById(postId: string) {
    return await this.model.findOne({ where: { id: postId } });
  }

  async update(postId: string, updatePost: IPostUpdate) {
    const { content } = updatePost;
    const [updatedRow] = await this.model.update(
      { content },
      { where: { id: postId } }
    );

    return updatedRow;
  }

  async delete(postId: string) {
    await this.model.destroy({
      where: {
        id: postId,
      },
    });
  }
}
