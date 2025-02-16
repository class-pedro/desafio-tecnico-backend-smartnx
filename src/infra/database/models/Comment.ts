import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import Post from './Post';
import User from './User';

class Comment extends Model {
  declare id: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare postId: string;
  declare authorId: string;
}

Comment.init(
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    postId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    authorId: {
      type: sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'username',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  { sequelize: db, tableName: 'comments', timestamps: true }
);

User.hasMany(Comment, {
  foreignKey: 'authorId',
});
Comment.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'commentAuthor'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
})

export default Comment;
