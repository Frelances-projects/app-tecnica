import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'

import { CreateScheduledClass } from '../../../application/use-cases/scheduled-class/create-scheduled-class'
import { UpdateScheduledClass } from '../../../application/use-cases/scheduled-class/update-scheduled-class'
import { UpdateScheduledClassStatus } from '../../../application/use-cases/scheduled-class/update-scheduled-class-status'
import { GetScheduledClassById } from '../../../application/use-cases/scheduled-class/get-scheduled-class-by-id'
import { GetManyScheduledClasses } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes'
import { GetManyScheduledClassesByClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-class'
import { GetManyScheduledClassesBySchool } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-school'
import { GetManyScheduledClassesByCategoryClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-category-class'
import { GetManyScheduledClassesBySchoolAndCategoryClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-school-category-class'
import { GetManyScheduledClassesByStudent } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-student'

import { ScheduledClassViewModel } from '../view-models/scheduled-class-view-model'

import { CreateScheduledClassBody } from '../dtos/scheduled-class/create-scheduled-class-body'
import { UpdateScheduledClassBody } from '../dtos/scheduled-class/update-scheduled-class-body'
import { UpdateScheduledClassStatusBody } from '../dtos/scheduled-class/update-scheduled-class-status-body'

@Controller('scheduled-class')
export class ScheduledClassController {
  constructor(
    private createScheduledClass: CreateScheduledClass,
    private updateScheduledClass: UpdateScheduledClass,
    private updateScheduledClassStatus: UpdateScheduledClassStatus,
    private getScheduledClassById: GetScheduledClassById,
    private getManyScheduledClasses: GetManyScheduledClasses,
    private getManyScheduledClassesByClass: GetManyScheduledClassesByClass,
    private getManyScheduledClassesBySchool: GetManyScheduledClassesBySchool,
    private getManyScheduledClassesByCategoryClass: GetManyScheduledClassesByCategoryClass,
    private getManyScheduledClassesBySchoolAndCategoryClass: GetManyScheduledClassesBySchoolAndCategoryClass,
    private getManyScheduledClassesByStudent: GetManyScheduledClassesByStudent,
  ) {}

  @Get(':scheduledClassId')
  async getById(@Param('scheduledClassId') scheduledClassId: string) {
    const { scheduledClass } = await this.getScheduledClassById.execute(
      scheduledClassId,
    )

    return {
      scheduledClass: ScheduledClassViewModel.toHTTP(scheduledClass),
    }
  }

  @Get()
  async getMany() {
    const { scheduledClasses } = await this.getManyScheduledClasses.execute()

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
    }
  }

  @Get('student/:studentId')
  async getManyByStudent(@Param('studentId') studentId: string) {
    const { scheduledClasses } =
      await this.getManyScheduledClassesByStudent.execute(studentId)

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
    }
  }

  @Get('class/:classId')
  async getManyByClass(@Param('classId') classId: string) {
    const { scheduledClasses } =
      await this.getManyScheduledClassesByClass.execute(classId)

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
    }
  }

  @Get('school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { scheduledClasses } =
      await this.getManyScheduledClassesBySchool.execute(schoolId)

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
    }
  }

  @Get('class/category')
  async getManyByCategoryClass(
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { scheduledClasses } =
      await this.getManyScheduledClassesByCategoryClass.execute(category)

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
    }
  }

  @Get('category/:schoolId')
  async getManyBySchoolAndCategory(
    @Param('schoolId') schoolId: string,
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { scheduledClasses } =
      await this.getManyScheduledClassesBySchoolAndCategoryClass.execute(
        schoolId,
        category,
      )

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateScheduledClassBody) {
    const { scheduledClass } = await this.createScheduledClass.execute(body)

    return {
      scheduledClass: ScheduledClassViewModel.toHTTP(scheduledClass),
    }
  }

  @Put(':scheduledClassId')
  async update(
    @Param('scheduledClassId') scheduledClassId: string,
    @Body() body: UpdateScheduledClassBody,
  ) {
    const { classId, schedulingDate, schedulingHour, status } = body

    const { scheduledClass } = await this.updateScheduledClass.execute({
      scheduledClassId,
      classId,
      schedulingDate,
      schedulingHour,
      status,
    })

    return {
      scheduledClass: ScheduledClassViewModel.toHTTP(scheduledClass),
    }
  }

  @Put(':scheduledClassId/status')
  async updateStatus(
    @Param('scheduledClassId') scheduledClassId: string,
    @Body() body: UpdateScheduledClassStatusBody,
  ) {
    const { status } = body

    const { scheduledClass } = await this.updateScheduledClassStatus.execute({
      scheduledClassId,
      status,
    })

    return {
      scheduledClass: ScheduledClassViewModel.toHTTP(scheduledClass),
    }
  }
}
