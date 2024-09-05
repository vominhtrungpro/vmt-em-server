// email.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    // Create a transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('GMAIL_USER'), // Your Gmail email
        pass: configService.get('GMAIL_PASS')// Your Gmail password
      },
    });
  }

  // Function to send an email
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"NestJS App"`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
      });
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
