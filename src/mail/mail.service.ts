import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  private mailersend: MailerSend;

  constructor() {
    this.mailersend = new MailerSend({ apiKey: process.env.API_KEY });
  }


  async sendResetCodeToEmail(to:string,reset_Code:string){
    const sentFrom = new Sender(process.env.EMAIL, 'resetPass'); 

    const recipients = [new Recipient(to)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('Password Reset')
      .setHtml(
        `<p>Your password reset code is: <strong>${reset_Code}</strong></p>`,
      )
      .setText(`Your password reset code is: ${reset_Code}`);

    try {
      await this.mailersend.email.send(emailParams);
    } catch (error) {
      console.error('Error sending email:', error);

      const errorMessage = error.message || JSON.stringify(error);

      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }


  async sendEmailcomfirmation(to:string,emailcomfirmationString:string){


    const sentFrom = new Sender(process.env.EMAIL, 'resetPass'); 

    const recipients = [new Recipient(to)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('Verify Email')
      .setHtml(
        `<p>verify your email: <strong>http://localhost:3000/authentication/verify-email/${emailcomfirmationString}</strong></p>`,
      )
      .setText(`verify your email: http://localhost:3000/authentication/verify-email/${emailcomfirmationString}`);

    try {
      await this.mailersend.email.send(emailParams);
    } catch (error) {
      console.error('Error sending email:', error);

      const errorMessage = error.message || JSON.stringify(error);

      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }
  }
  




