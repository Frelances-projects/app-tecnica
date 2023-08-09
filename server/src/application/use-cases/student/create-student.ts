import { Injectable } from '@nestjs/common';

import { StudentsRepository } from '../../repositories/students-repository';
import { GetStudentByEmail } from './get-student-by-email';
import { GetStudentByNumber } from './get-student-by-number';
import { Student } from '../../entities/student';

interface CreateStudentRequest {
  name: string;
  email: string;
  number: number;
  enrolledAt: string;
}

interface CreateStudentResponse {
  student: Student;
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private getStudentByEmail: GetStudentByEmail,
    private getStudentByNumber: GetStudentByNumber,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    try {
      const { email, name, enrolledAt, number } = request;

      const { student: foundStudentByEmail } =
        await this.getStudentByEmail.execute(email);

      if (foundStudentByEmail) {
        if (
          foundStudentByEmail.email &&
          foundStudentByEmail.number === number
        ) {
          throw new Error('This email and number has already been used');
        }

        throw new Error('This email has already been used');
      }

      const { student: foundStudentByNumber } =
        await this.getStudentByNumber.execute(number);

      if (foundStudentByNumber) {
        throw new Error('This number has already been used');
      }

      const student = new Student({ email, name, enrolledAt, number });

      await this.studentsRepository.create(student);

      return {
        student,
      };
    } catch (error) {
      throw error;
    }
  }
}
