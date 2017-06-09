import Sequelize from 'sequelize';
import { PG_URI } from '../settings';

const db = new Sequelize(PG_URI, {logging: false});

const UserModel = db.define('user', {
  username: { allowNull: false, type: Sequelize.STRING },
  password: { allowNull: false, type: Sequelize.STRING },
  email: { allowNull: false, type: Sequelize.STRING },
});

const UserProfileModel = db.define('userProfile', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

UserProfileModel.belongsTo(UserModel);

db.sync();

const User = db.models.user;
const UserProfile = db.models.userProfile;

export default db;
export { User, UserProfile };
