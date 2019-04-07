import express from 'express';
import * as http from 'http';
import config from 'config';
import bodyParser from 'body-parser';
import { Auth } from './lib/auth';
import * as mail from './lib/email';

const m = new mail.Mail();

// Controller prop definitions
type _sendBody = mail.MailTypes['sendBody'];
type _c = {
  postFeedback: (to: string, req: _sendBody, cb: (res: boolean) => void) => void;
  getSmtp: () => string;
};

// Constroller
const c: _c = {
  getSmtp: function(): string {
    return `SMTP SERVER [${config.get('smtp.host')}]`;
  },

  postFeedback: function(to: string, req: _sendBody, cb: (res: boolean) => void) {
    m.send(to, req, (mRes) => cb(mRes));
  }
}

c.postFeedback('ycom', { title: 'hi', vars: ['a', 'b', 'c'] }, (r) => console.log(r));
console.log(c.getSmtp());

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



