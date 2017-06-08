import { graphql } from 'graphql';
import schema from './schema';
import db, { User, UserProfile } from './connectors';

beforeAll(() => {
  db.sync();
});

beforeEach(async () => {
  return await db.truncate({ cascade: true });
});

test('createUser mutation creates a user correctly', async () => {
  const createUser =
  `mutation {
    createUser(username: "test", email: "test@test.test", password: "test") {
      username
    }
  }`;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, createUser, rootValue, context);
  const { data } = result;
  console.log(data);

  expect(data.createUser.username).toBe("test");
});
