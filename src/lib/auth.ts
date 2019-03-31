import jwt from 'jsonwebtoken';
import conifg from 'config';
import uuidv4 from 'uuid';

const options: Object = {
  expiresIn: '1h',
};

type tokenCb = (err: object | null, token: string | null) => void;

export class Auth {
  private pass: string;
  constructor() {
    this.pass = uuidv4(); 
  }
  public generateToken = async (user: Object, cb: tokenCb) => {
    await jwt.sign(user, this.pass, {}, (err, token) => {
      if (err) return cb(err, null);
      cb(null, token); 
    });
  };
}

