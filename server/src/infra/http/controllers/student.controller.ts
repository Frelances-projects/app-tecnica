import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
  Patch,
} from '@nestjs/common'

import { CreateStudent } from '../../../application/use-cases/student/create-student'
import { CreateStudentSession } from '../../../application/use-cases/student/create-student-session'
import { UpdateStudent } from '../../../application/use-cases/student/update-student'
import { GetStudentById } from '../../../application/use-cases/student/get-student-by-id'
import { GetManyStudents } from '../../../application/use-cases/student/get-many-students'
import { DeleteStudent } from '../../../application/use-cases/student/delete-student'
import { GetManyStudentsBySchool } from 'src/application/use-cases/student/get-many-students-by-school'
import { ForgotStudentPassword } from 'src/application/use-cases/student/forgot-user-password'
import { ResetStudentPassword } from 'src/application/use-cases/student/reset-student-password'

import { StudentViewModel } from '../view-models/student-view-model'

import { CreateStudentBody } from '../dtos/student/create-student-body'
import { CreateStudentSessionBody } from '../dtos/student/create-student-session-body'
import { UpdateStudentBody } from '../dtos/student/update-student-body'
import { ForgotStudentPasswordBody } from '../dtos/student/forgot-password-student-body'
import { ResetStudentPasswordBody } from '../dtos/student/reset-password-student-body'

@Controller('student')
export class StudentController {
  constructor(
    private createStudent: CreateStudent,
    private createStudentSession: CreateStudentSession,
    private updateStudent: UpdateStudent,
    private deleteStudent: DeleteStudent,
    private getStudentById: GetStudentById,
    private getManyStudents: GetManyStudents,
    private forgotStudentPassword: ForgotStudentPassword,
    private resetStudentPassword: ResetStudentPassword,
    private getManyStudentsBySchool: GetManyStudentsBySchool,
  ) {}

  @Get(':studentId')
  async getById(@Param('studentId') studentId: string) {
    const { student } = await this.getStudentById.execute(studentId)

    return {
      student: StudentViewModel.toHTTP(student),
    }
  }

  @Get()
  async getMany() {
    const { students } = await this.getManyStudents.execute()

    const studentsToHTTP = students.map((student) =>
      StudentViewModel.toHTTP(student),
    )

    return {
      students: studentsToHTTP,
    }
  }

  @Get('/school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { students } = await this.getManyStudentsBySchool.execute(schoolId)

    const studentsToHTTP = students.map((student) =>
      StudentViewModel.toHTTP(student),
    )

    return {
      students: studentsToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateStudentBody) {
    const { student } = await this.createStudent.execute(body)

    return {
      student: StudentViewModel.toHTTP(student),
    }
  }

  @Post('session')
  async createSession(@Body() body: CreateStudentSessionBody) {
    const { student } = await this.createStudentSession.execute(body)

    return {
      student: StudentViewModel.toHTTP(student),
    }
  }

  @Put(':studentId')
  async update(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentBody,
  ) {
    const {
      name,
      email,
      number,
      phone,
      driverLicenseCategoryId,
      // enrolledAt,
      schoolId,
      firebaseToken,
      imtId,
    } = body

    const { student } = await this.updateStudent.execute({
      id: studentId,
      name,
      email,
      number,
      phone,
      driverLicenseCategoryId,
      // enrolledAt,
      schoolId,
      firebaseToken,
      imtId,
    })

    return {
      student: StudentViewModel.toHTTP(student),
    }
  }

  @Delete(':studentId')
  async delete(@Param('studentId') studentId: string) {
    await this.deleteStudent.execute(studentId)
  }

  @Post('password/forgot-password')
  async forgotPassword(@Body() body: ForgotStudentPasswordBody) {
    const { email, link } = body

    await this.forgotStudentPassword.execute({ email, link })
  }

  @Patch('password/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetStudentPasswordBody,
  ) {
    const { newPassword } = body

    await this.resetStudentPassword.execute({ token, newPassword })
  }
}
