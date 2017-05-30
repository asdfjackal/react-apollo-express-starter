import express from 'express';
import request from 'request';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import colors from 'colors';

import schema from './data/schema';
import { PORT, JWT_SECRET } from './settings';

const reactDevServer = 'http://localhost:3000';

const server = express();

if (JWT_SECRET === 'secret-key') {
  console.log('%s no secret key has been defined in environment variables', colors.red('[WARNING]'));
}

/* Insert routes for api endpoints here*/
server.use('/graphql',
  jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
  }),
  bodyParser.json(),
  graphqlExpress((req) => {
    if (!req.user) {
      return { schema };
    }
    return {
      schema,
      rootValue: req.user,
    };
  }),
);

server.use('/graphiql', graphiqlExpress({
  endpointURL: 'graphql',
}));

server.get('/*', (req, res) => {
  const url = reactDevServer + req.url;
  req.pipe(request(url)).pipe(res);
});

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
