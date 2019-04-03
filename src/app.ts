import express from 'express';
import * as http from 'http';
import config from 'config';
import bodyParser from 'body-parser';
import { Auth } from './lib/auth';

const PORT = config.get('server.port');
const auth = new Auth();
const app = express();

app.set('Access-Control-Allow-Origin', '*');
app.use(bodyParser.json());

const testObject: object = {
  name: 'paul',
  email: 'email@email.com'
};

// Middleware
app.use('/api', (req, res, next) => {
  // TODO: Rename header to something that makes more sense
  if (req.headers.token && typeof req.headers.token === 'string') {
    const token: string = req.headers.token
    auth.verifyToken(token, (err, user) => {
      if (err) res.send(err);
      req.user = user;
      return next();
    });
  }
  res.send('Token was not provided...');
});

app.get('/login', (req, res) => {
  // We assume that we have successfully
  // authenticated...
  auth.generateToken(testObject, (err, token) => {
    // TODO: Logger!
    if (err) return res.send(err);
    res.send({ Token: token });
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server has started...');
});



