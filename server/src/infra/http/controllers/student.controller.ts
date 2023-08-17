import { Body, Controller, Get, Param, Put, Post } from '@nestjs/common'

import { CreateStudent } from '../../../application/use-cases/student/create-student'
import { UpdateStudent } from '../../../application/use-cases/student/update-student'
import { GetStudentById } from '../../../application/use-cases/student/get-student-by-id'
import { GetManyStudents } from '../../../application/use-cases/student/get-many-students'

import { StudentViewModel } from '../view-models/student-view-model'

import { CreateStudentBody } from '../dtos/student/create-student-body'
import { UpdateStudentBody } from '../dtos/student/update-student-body'

@Controller('student')
export class StudentController {
  constructor(
    private createStudent: CreateStudent,
    private updateStudent: UpdateStudent,
    private getStudentById: GetStudentById,
    private getManyStudents: GetManyStudents,
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

  @Post()
  async create(@Body() body: CreateStudentBody) {
    const { student } = await this.createStudent.execute(body)

    return {
      student: StudentViewModel.toHTTP(student),
    }
  }

  @Put(':studentId')
  async update(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentBody,
  ) {
    const { name, email, number } = body

    const { student } = await this.updateStudent.execute({
      id: studentId,
      name,
      email,
      number,
    })

    return {
      student: StudentViewModel.toHTTP(student),
    }
  }
}
