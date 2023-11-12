import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { GetUserByEmail } from './get-user-by-email'
import { EmailService } from 'src/mail/email.service'

interface ForgotUserPasswordRequest {
  email: string
  link: string
}

@Injectable()
export class ForgotUserPassword {
  constructor(
    private emailService: EmailService,
    private getUserByEmail: GetUserByEmail,
    private jwtService: JwtService,
  ) {}

  async execute(data: ForgotUserPasswordRequest): Promise<void> {
    try {
      const { link, email } = data

      const { user } = await this.getUserByEmail.execute(email)

      if (!user) {
        return
      }

      const payload = { email: user.email }

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      })

      await this.emailService.sendEmailToPerson({
        recipient: user.email,
        subject: 'Redefinição de senha',
        body: `<h3>Olá!</h3>
        <p>${user.name} (esperamos que tenha sido você) solicitou uma redefinição de senha. Se você não solicitou esta ação, basta ignorar este email.</p>
        <p>Para redefinir sua senha, use o link abaixo:</p>
        <p>
        <a href='${link}/${token}'>Redefinir senha</a>
        </p>
        <p>Este link é válido por 1 hora.</p>`,
      })
    } catch (error) {
      if (error) throw error

      throw new InternalServerErrorException()
    }
  }
}
