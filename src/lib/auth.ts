import jwt from 'jsonwebtoken';
import conifg from 'config';
import uuidv4 from 'uuid';

const options: Object = {
  expiresIn: '1h',
};

export class Auth {
  private pass: string;
  constructor() {
    this.pass = uuidv4(); 
  }
  public generateToken = (user: Object): string => {
    return jwt.sign(user, this.pass, {});
  }
}

