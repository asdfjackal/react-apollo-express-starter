import express from 'express';
import request from 'request';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';

import { schema } from './data/schema'

const PORT = 4000;

const reactDevServer = "http://localhost:3000"

const server = express();

/* Insert routes for api endpoints here*/

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: 'graphql'
}));

server.get('/*', function (req, res) {
  var url = reactDevServer + req.url;
  req.pipe(request(url)).pipe(res);
});

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
