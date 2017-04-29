import { User, UserProfile } from './connectors';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const resolvers = {
  Query: {
    user(_, args) {
      return User.findOne({ where: args });
    },
    userProfile(_, args) {
      return UserProfile.findOne({ where: args });
    },
    viewer() {

    },
  },
  Mutation: {
    createToken(_, {username, password}){

    },
    updateUserProfile(_, {id, firstName, lastName}){
      return UserProfile.update({firstName, lastName}, {where: {id}})
      .then((affected) => {
        return UserProfile.findOne({ where: { id } })
      });
    },
    createUser(_, {username, email, password}){
      const hash = bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        return hash;
      });
      console.log(hash);
      return User.create({
        username,
        password,
        email,
      }).then((user) => {
        return UserProfile.create({
          firstName: "",
          lastName: "",
          userId: user.id,
        }).then((userProfile) => {
          return userProfile.getUser();
        })
      });
    },
  },
  User: {
    profile(user){
      return UserProfile.findOne({where: {id: user.id}});
    }
  }
}
