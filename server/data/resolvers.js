import { User, UserProfile } from './connectors';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET;

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
      return User.findOne({
        where: {
          username
        }
      }).then((user) => {
        console.log(user);
        return bcrypt.compare(password, user.password).then((res) => {
          if(res){
            const token = jwt.encode({username}, SECRET);
            return {token};
          }else{
            return {error: "Incorrect Password"};
          }
        });
      });
    },
    updateUserProfile(_, {id, firstName, lastName}){
      return UserProfile.update({firstName, lastName}, {where: {id}})
      .then((affected) => {
        return UserProfile.findOne({ where: { id } })
      });
    },
    createUser(_, {username, email, password}){
      return User.findAll({
        where: {
          $or: [
            { username },
            { email }
          ]
        }
      }).then((users) => {
        if (users.length != 0){
          return null;
        }
        return bcrypt.hash(password, SALT_ROUNDS).then( (hash) => {
          return User.create({
            username,
            password: hash,
            email,
          }).then((user) => {
            return UserProfile.create({
              firstName: "",
              lastName: "",
              userId: user.id,
            }).then((userProfile) => {
              return user;
            })
          });
        });

      });
    },
  },
  User: {
    profile(user){
      return UserProfile.findOne({where: {id: user.id}});
    }
  }
}
