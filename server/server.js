import express from 'express';
import request from 'request';

const PORT = 4000;

const reactDevServer = "http://localhost:3000"

const server = express();

server.get('/', function (req, res) {
  res.send('Hello World!');
});

server.get('/test/', function (req, res) {
  res.send('test');
});

server.get('/*', function (req, res) {
  var url = reactDevServer + req.url;
  req.pipe(request(url)).pipe(res);
});

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
