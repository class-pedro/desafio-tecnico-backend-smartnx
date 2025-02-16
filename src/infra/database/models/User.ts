import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';

class User extends Model {
  declare username: string;
  declare name: string;
  declare password: string;
}

User.init(
  {
    username: {
      type: sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
