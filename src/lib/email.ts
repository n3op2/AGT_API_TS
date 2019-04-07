import nodemailer from 'nodemailer';
import config from 'config';

const t = nodemailer.createTransport(config.get('smtp'));

type _sendBody = {
  title: string,
  vars: string[],
  msg?: string,
  footer?: string
}
type _boolCb = (b: boolean) => void; 
type _send = (to: string, body: _sendBody) => Promise<boolean>;

const cutErr = function(e: object): string {
  const s: string = '...';
  return JSON.stringify(e).slice(0, 15) + s;
}

const Send: _send =
  function(to: string, body: _sendBody): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    t.sendMail({to: to, subject: to, html: body.title}, (err, res) => {
      if (err) {
        console.log('ERR: ', cutErr(err));
        return resolve(false);
      }
      console.log('INFO: ', res);
      resolve(true);
    });
  });
}

export interface MailTypes {
  sendBody: _sendBody;
}

export class Mail {
  private from: string;
  constructor() {
    this.from = 'from@from.com';
  }

  public send = async function send(to: string, body: _sendBody, cb: _boolCb) {
    console.log('send body -> ', body);
    await Send(to, body).then(sendRes => { 
      if (!sendRes) return cb(sendRes);
      cb(sendRes);
    });
  }
}

