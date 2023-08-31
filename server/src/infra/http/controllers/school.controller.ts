import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CreateSchool } from '../../../application/use-cases/school/create-school'
import { GetSchoolById } from '../../../application/use-cases/school/get-school-by-id'
import { GetManySchool } from '../../../application/use-cases/school/get-many-school'

import { SchoolViewModel } from '../view-models/school-view-model'

import { CreateSchoolBody } from '../dtos/school/create-school-body'

@Controller('school')
export class SchoolController {
  constructor(
    private createSchool: CreateSchool,
    private getSchoolById: GetSchoolById,
    private getManySchool: GetManySchool,
  ) {}

  @Get(':schoolId')
  async getById(@Param('schoolId') schoolId: string) {
    const { school } = await this.getSchoolById.execute(schoolId)

    return {
      school: SchoolViewModel.toHTTP(school),
    }
  }

  @Get()
  async getMany() {
    const { school } = await this.getManySchool.execute()

    const schoolToHTTP = school.map((school) => SchoolViewModel.toHTTP(school))

    return {
      school: schoolToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateSchoolBody) {
    const { school } = await this.createSchool.execute(body)

    return {
      school: SchoolViewModel.toHTTP(school),
    }
  }
}
