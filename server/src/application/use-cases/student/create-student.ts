import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'

import { Student } from '../../entities/student'
import { StudentsRepository } from '../../repositories/students-repository'
import { GetStudentByEmail } from './get-student-by-email'
import { GetStudentByNumber } from './get-student-by-number'
import { CreatePayment } from '../payment/create-payment'
import { GetDriverLicenseCategoryById } from '../driver-license-category/get-driver-license-category-by-id'

interface CreateStudentRequest {
  name: string
  email: string
  schoolId: string
  paymentMethod: 'INSTALLMENTS' | 'INCASH'
  driverLicenseCategoryId: string
  number: number
  phone: string
  birthDate: string
  imtId?: string
  enrolledAt: string
}

interface CreateStudentResponse {
  student: Student
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private getStudentByEmail: GetStudentByEmail,
    private getStudentByNumber: GetStudentByNumber,
    private createPayment: CreatePayment,
    private getDriverLicenseCategoryById: GetDriverLicenseCategoryById,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    try {
      const {
        email,
        name,
        enrolledAt,
        schoolId,
        paymentMethod,
        driverLicenseCategoryId,
        number,
        phone,
        birthDate,
        imtId,
      } = request

      const { student: foundStudentByEmail } =
        await this.getStudentByEmail.execute(email)

      if (foundStudentByEmail) {
        if (
          foundStudentByEmail.email &&
          foundStudentByEmail.number === number
        ) {
          throw new ConflictException(
            'This email and number has already been used',
          )
        }

        throw new ConflictException('This email has already been used')
      }

      const { student: foundStudentByNumber } =
        await this.getStudentByNumber.execute(number)

      if (foundStudentByNumber) {
        throw new ConflictException('This number has already been used')
      }

      const { driverLicenseCategory } =
        await this.getDriverLicenseCategoryById.execute(driverLicenseCategoryId)

      const { payment } = await this.createPayment.execute({
        method: paymentMethod,
        total: driverLicenseCategory.price,
        amountOfInstallments:
          paymentMethod === 'INSTALLMENTS'
            ? Object.values(driverLicenseCategory.installments).filter(
                (value) => value !== undefined && value !== null,
              ).length
            : null,
        amountOfRemainingInstallments:
          paymentMethod === 'INSTALLMENTS'
            ? Object.values(driverLicenseCategory.installments).filter(
                (value) => value !== undefined && value !== null,
              ).length
            : null,
        amountOfInstallmentsPaid: paymentMethod === 'INSTALLMENTS' ? 0 : null,
      })

      const student = new Student({
        email,
        name,
        enrolledAt,
        number,
        schoolId,
        paymentId: payment.id,
        driverLicenseCategoryId,
        phone,
        birthDate,
        imtId,
      })

      await this.studentsRepository.create(student)

      return {
        student,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
