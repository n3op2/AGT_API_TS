import express from 'express';
import { Request, Response } from 'express';
import * as http from 'http';
import config from 'config';
import bodyParser from 'body-parser';
import { Auth } from './lib/auth';

const PORT = config.get('server.port');
const auth = new Auth();
const app = express();
app.set('Access-Control-Allow-Origin', '*');
app.use(bodyParser.json());

auth.generateToken({}, (err, token) => {
  console.log(token)
});

app.get('/', (req: Request, res: Response) => {

});
/*
const generate = async () => {
};
*/

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server has starter...');
});



