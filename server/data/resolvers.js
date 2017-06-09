import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { User, UserProfile } from './connectors';
import { JWT_SECRET } from '../settings';

const SALT_ROUNDS = 10;

const resolvers = {
  Query: {
    user(_, args) {
      console.log(args);
      if(!args.username && ! args.id){
        return null;
      }
      return User.findOne({ where: args });
    },
    userProfile(_, args) {
      return UserProfile.findOne({ where: args });
    },
    viewer(obj) {
      if (!obj) {
        return null;
      }
      return User.findOne({ where: { username: obj.username } });
    },
  },
  Mutation: {
    createToken(_, { username, password }) {
      return User.findOne({
        where: {
          username,
        },
      }).then((user) => {
        return bcrypt.compare(password, user.password).then((res) => {
          if (res) {
            const token = jwt.encode({ username }, JWT_SECRET);
            return { token };
          }
          return { error: 'Incorrect Password' };
        });
      });
    },
    updateUserProfile(obj, { id, firstName, lastName }) {
      return UserProfile.findOne({ where: { id } })
      .then(profile => (
        User.findOne({ where: { id: profile.userId } })
        .then((user) => {
          if (user.username === obj.username) {
            return profile.update({ firstName, lastName })
            .then(() => (
              profile.reload()
              .then(() => (profile))
            ));
          }
          return null;
        })
      ));
    },
    createUser(_, { username, email, password }) {
      return User.findAll({
        where: {
          $or: [
            { username },
            { email },
          ],
        },
      }).then((users) => {
        if (users.length !== 0) {
          return null;
        }
        return bcrypt.hash(password, SALT_ROUNDS).then(hash => (
          User.create({
            username,
            password: hash,
            email,
          }).then(user => (
            UserProfile.create({
              firstName: '',
              lastName: '',
              userId: user.id,
            }).then(() => (user))
          ))
        ));
      });
    },
  },
  User: {
    profile(user) {
      return UserProfile.findOne({ where: { id: user.id } });
    },
  },
};

export default resolvers;
