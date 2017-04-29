import Sequelize from 'sequelize';

var db = new Sequelize(process.env.PG_URI);

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

export { User, UserProfile };
