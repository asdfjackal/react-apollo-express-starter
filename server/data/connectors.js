import Sequelize from 'sequelize';

var db = new Sequelize(process.env.PG_URI);

const UserModel = db.define('user', {
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
});

const UserProfileModel = db.define('userProfile', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

UserProfileModel.belongsTo(UserModel);

const User = db.models.user;
const UserProfile = db.models.userProfile;

export { User, UserProfile };
