import { User, UserProfile } from './connectors';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { JWT_SECRET } from '../settings'

const SALT_ROUNDS = 10;

export const resolvers = {
  Query: {
    user(_, args) {
      return User.findOne({ where: args });
    },
    userProfile(_, args) {
      return UserProfile.findOne({ where: args });
    },
    viewer(obj) {
      if(!obj)
        return null;
      return User.findOne({ where: { username: obj.username }});
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
            const token = jwt.encode({username}, JWT_SECRET);
            return {token};
          }else{
            return {error: "Incorrect Password"};
          }
        });
      });
    },
    updateUserProfile(obj, {id, firstName, lastName}){
      return UserProfile.findOne({ where: {id} })
      .then((profile) => {
        return User.findOne({ where: {id: profile.userId}})
        .then((user) => {
          if(user.username === obj.username){
            return profile.update({firstName, lastName})
            .then(() => {
              return profile.reload()
              .then(() => {
                return profile;
              });
            });
          }else{
            return null;
          }
        });
      });
      return UserProfile.update({firstName, lastName}, {where: {id}})
      .then(() => {
        return UserProfile.findOne({ where: { id } })
        .then((affected) => {
          return affected;
        })
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
