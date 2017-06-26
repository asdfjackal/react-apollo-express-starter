import { graphql } from 'graphql';
import schema from './schema';
import db, { User, UserProfile } from './connectors';

beforeEach(async () => {
  return await db.truncate({ cascade: true });
});

const createUser =
`mutation createUser($username: String!, $email: String!, $password: String!, $captcha: String!){
  createUser(username: $username, email: $email, password: $password, captcha: $captcha) {
    id
    username
    profile{
      id
    }
  }
}`;

const updateUserProfile =
`mutation updateUserProfile($id: Int!, $firstName: String, $lastName: String){
  updateUserProfile(id: $id, firstName: $firstName, lastName: $lastName) {
    firstName
    lastName
  }
}`;

const createToken =
`mutation createToken($username: String!, $password: String!){
  createToken(username: $username, password: $password){
    token
    error
  }
}
`;

const viewer =
`query{
  viewer{
    id
  }
}`;

const user =
`query user($id: Int, $username: String){
  user(id: $id, username: $username){
    id
    username
  }
}`;

const userProfile =
`query userProfile($id: Int!){
  userProfile(id: $id){
    id
    firstName
    lastName
  }
}`;

test('createUser mutation creates a user correctly', async () => {
  const rootValue = {};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  expect(result.data.createUser.username).toBe("test");
});

test('updateUserProfile correctly handles one or both arguments', async () => {
  const rootValue = {username: "test"};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;
  result = await graphql(schema, updateUserProfile, rootValue, context, {id, firstName: "John", lastName: "Smith"});
  expect(result.data.updateUserProfile.firstName).toBe("John");
  expect(result.data.updateUserProfile.lastName).toBe("Smith");

  result = await graphql(schema, updateUserProfile, rootValue, context, {id, firstName: "Jane"});
  expect(result.data.updateUserProfile.firstName).toBe("Jane");
  expect(result.data.updateUserProfile.lastName).toBe("Smith");

  result = await graphql(schema, updateUserProfile, rootValue, context, {id, lastName: "Doe"});
  expect(result.data.updateUserProfile.firstName).toBe("Jane");
  expect(result.data.updateUserProfile.lastName).toBe("Doe");
});

test('updateUserProfile does not work if user is not logged in', async () => {
  const rootValue = {};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;

  result = await graphql(schema, updateUserProfile, rootValue, context, {id, firstName: "John", lastName: "Smith"});
  expect(result.data.updateUserProfile).toBeNull();
});

test('createToken provides token when given valid credentials', async () => {
  const rootValue = {};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;

  result = await graphql(schema, createToken, rootValue, context, {username: "test", password: "test"});
  expect(result.data.createToken.error).toBeNull();
  expect(result.data.createToken.token).not.toBeNull();
});

test('createToken provides error when given invalid credentials', async () => {
  const rootValue = {};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;
  result = await graphql(schema, createToken, rootValue, context, {username: "test", password: "hunter2"});
  expect(result.data.createToken.error).not.toBeNull();
  expect(result.data.createToken.token).toBeNull();
});

test('viewer works if user is logged in', async () => {
  const rootValue = {username: "test"};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;

  result = await graphql(schema, viewer, rootValue, context);
  expect(result.data.viewer).not.toBeNull();
});

test('viewer does not work if user is not logged in', async () => {
  const rootValue = {};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;
  result = await graphql(schema, viewer, rootValue, context);
  expect(result.data.viewer).toBeNull();
});

test('user query shows correct information when given one or both arguments', async () => {
  const rootValue = {};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.id;

  result = await graphql(schema, user, rootValue, context, {id});
  expect(result.data.user.username).toBe("test");

  result = await graphql(schema, user, rootValue, context, {username: "test"});
  expect(result.data.user.username).toBe("test");
});

test('userProfile query shows correct information', async () => {
  const rootValue = {username: "test"};
  const context = {};

  var result;
  var data;

  result = await graphql(schema, createUser, rootValue, context, {username: "test", email: "test@test.test", password: "test", captcha: ""});
  const id = result.data.createUser.profile.id;
  result = await graphql(schema, updateUserProfile, rootValue, context, {id, firstName: "John", lastName: "Smith"});
  result = await graphql(schema, userProfile, rootValue, context, {id});
  expect(result.data.userProfile.firstName).toBe("John");
});
