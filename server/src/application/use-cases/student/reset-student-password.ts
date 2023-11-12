import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { StudentsRepository } from 'src/application/repositories/students-repository'
import { GetStudentByEmail } from './get-student-by-email'

import { GenerateHash } from 'src/helpers/generate-hash'

interface ResetStudentPasswordRequest {
  token: string
  newPassword: string
}

@Injectable()
export class ResetStudentPassword {
  constructor(
    private jwtService: JwtService,
    private getStudentByEmail: GetStudentByEmail,
    private studentsRepository: StudentsRepository,
    private generateHash: GenerateHash,
  ) {}

  async execute(data: ResetStudentPasswordRequest): Promise<void> {
    try {
      const { newPassword, token } = data

      const { email } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      const { student } = await this.getStudentByEmail.execute(email)

      if (!student) {
        throw new NotFoundException('Student not found')
      }

      const passwordHashed = await this.generateHash.execute(newPassword)

      student.password = passwordHashed

      await this.studentsRepository.save(student)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
