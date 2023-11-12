import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { GetStudentByEmail } from './get-student-by-email'
import { EmailService } from 'src/mail/email.service'

interface ForgotStudentPasswordRequest {
  email: string
  link: string
}

@Injectable()
export class ForgotStudentPassword {
  constructor(
    private emailService: EmailService,
    private getStudentByEmail: GetStudentByEmail,
    private jwtService: JwtService,
  ) {}

  async execute(data: ForgotStudentPasswordRequest): Promise<void> {
    try {
      const { link, email } = data

      const { student } = await this.getStudentByEmail.execute(email)

      if (!student) {
        return
      }

      const payload = { email: student.email }

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      })

      await this.emailService.sendEmailToPerson({
        recipient: student.email,
        subject: 'Redefinição de senha',
        body: `<h3>Olá!</h3>
        <p>${student.name} (esperamos que tenha sido você) solicitou uma redefinição de senha. Se você não solicitou esta ação, basta ignorar este email.</p>
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
