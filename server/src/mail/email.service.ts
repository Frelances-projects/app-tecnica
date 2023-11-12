import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

type SendEmailParams = {
  recipient: string
  subject: string
  body: string
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailToPerson({ recipient, subject, body }: SendEmailParams) {
    await this.mailerService.sendMail({
      to: recipient,
      subject,
      html: body,
    })
  }
}
