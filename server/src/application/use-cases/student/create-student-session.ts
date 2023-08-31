import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'

import { Student } from 'src/application/entities/student'
import { StudentsRepository } from '../../repositories/students-repository'
import { GetStudentByNumber } from './get-student-by-number'

import { GenerateHash } from 'src/helpers/generate-hash'
import { CompareHash } from 'src/helpers/compare-hash'
import { CreateToken } from 'src/helpers/create-token'

interface CreateStudentSessionRequest {
  number: number
  password: string
}

interface CreateStudentSessionResponse {
  student: Student
}

@Injectable()
export class CreateStudentSession {
  constructor(
    private studentsRepository: StudentsRepository,
    private getStudentByNumber: GetStudentByNumber,
    private generateHash: GenerateHash,
    private compareHash: CompareHash,
    private createToken: CreateToken,
  ) {}

  async execute(
    request: CreateStudentSessionRequest,
  ): Promise<CreateStudentSessionResponse> {
    try {
      const { number, password } = request

      const { student } = await this.getStudentByNumber.execute(number)

      if (!student) {
        throw new NotFoundException('Student not found')
      }

      const token = await this.createToken.execute(student.id)

      if (student.password) {
        const isValidStudent = await this.compareHash.execute(
          password,
          student.password,
        )

        if (!isValidStudent) {
          throw new UnauthorizedException('Incorrect password')
        }

        student.token = token
      } else {
        const passwordHashed = await this.generateHash.execute(password)

        student.token = token
        student.password = passwordHashed
      }

      await this.studentsRepository.save(student)

      return { student }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
