import express from 'express';
import * as http from 'http';
import config from 'config';
import bodyParser from 'body-parser';
import { Auth } from './lib/auth';
import Mail from './lib/email';

const m = new Mail();
m.send('asddasdl.asdom', { title: '', vars: [] }, (res: boolean) => {
  console.log(res ? 'success' : 'error'); 
});

const PORT = config.get('server.port');
const auth = new Auth();
const app = express();

app.use(bodyParser.json());

const testObject: object = {
  name: 'paul',
  email: 'email@email.com'
};

// Middleware
app.use('/api', (req, res, next) => {
  // TODO: Rename header to something that makes more sense
  if (req.headers.token) {
    const token = req.headers.token;
    auth.verifyToken(token, (verifyErr, verifiedUser): void => {
      if (verifyErr) return console.log(verifyErr);
      req.user = verifiedUser;
      res.send(verifiedUser);
    });
  } else {
    res.send('Token was not provided...');
  }
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



