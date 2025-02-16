import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import User from './User';

class Post extends Model {
  declare id: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare authorId: string;
}

Post.init(
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
  { sequelize: db, tableName: 'posts', timestamps: true }
);

User.hasMany(Post, {
  foreignKey: 'authorId',
});

Post.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'postAuthor'
})

export default Post;
