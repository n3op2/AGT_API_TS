import jwt from 'jsonwebtoken';
import conifg from 'config';
import uuidv4 from 'uuid';
import { Request, Response } from 'express';

const options: object = {
  expiresIn: '1h',
};

type tokenCb = (err: object | null, token: string | null) => void;
type verifyCb = (err: object | null, user: string | object) => void;

interface Err {
  err: object;
};

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
  public verifyToken = async (token: any, cb: verifyCb) => {
    await jwt.verify(token, this.pass, {}, (err, user) => {
      if (err) return cb(err, {});
      cb(null, user);
    });
  };
}

