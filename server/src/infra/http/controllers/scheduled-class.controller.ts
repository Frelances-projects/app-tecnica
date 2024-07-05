import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

import { CreateScheduledClass } from '../../../application/use-cases/scheduled-class/create-scheduled-class'
import { CreateManyScheduledClasses } from '../../../application/use-cases/scheduled-class/create-many-scheduled-class'
import { UpdateScheduledClass } from '../../../application/use-cases/scheduled-class/update-scheduled-class'
import { UpdateScheduledClassStatus } from '../../../application/use-cases/scheduled-class/update-scheduled-class-status'
import { DeleteScheduledClass } from 'src/application/use-cases/scheduled-class/delete-scheduled-class'
import { GetScheduledClassById } from '../../../application/use-cases/scheduled-class/get-scheduled-class-by-id'
import { GetManyScheduledClasses } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes'
import { GetManyScheduledClassesByClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-class'
import { GetManyScheduledClassesBySchool } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-school'
import { GetManyScheduledClassesByCategoryClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-category-class'
import { GetManyScheduledClassesBySchoolAndCategoryClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-school-category-class'
import { GetManyScheduledClassesByStudentAndCategoryClass } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-student-and-category'
import { GetManyScheduledClassesByStudent } from '../../../application/use-cases/scheduled-class/get-many-scheduled-classes-by-student'

import { ScheduledClassViewModel } from '../view-models/scheduled-class-view-model'

import { CreateScheduledClassBody } from '../dtos/scheduled-class/create-scheduled-class-body'
import { CreateManyScheduledClassBody } from '../dtos/scheduled-class/create-many-scheduled-class-body'
import { UpdateScheduledClassBody } from '../dtos/scheduled-class/update-scheduled-class-body'
import { UpdateScheduledClassStatusBody } from '../dtos/scheduled-class/update-scheduled-class-status-body'
import { CreatePracticalScheduledClassBody } from '../dtos/scheduled-class/create-practical-scheduled-class-body'

import { PushNotificationService } from 'src/push-notification/push-notification.service'
import { CreatePracticalScheduledClass } from 'src/application/use-cases/scheduled-class/create-practical-scheduled-class'

@Controller('scheduled-class')
export class ScheduledClassController {
  constructor(
    private createScheduledClass: CreateScheduledClass,
    private createManyScheduledClasses: CreateManyScheduledClasses,
    private createPracticalScheduledClass: CreatePracticalScheduledClass,
    private updateScheduledClass: UpdateScheduledClass,
    private updateScheduledClassStatus: UpdateScheduledClassStatus,
    private deleteScheduledClass: DeleteScheduledClass,
    private getScheduledClassById: GetScheduledClassById,
    private getManyScheduledClasses: GetManyScheduledClasses,
    private getManyScheduledClassesByClass: GetManyScheduledClassesByClass,
    private getManyScheduledClassesBySchool: GetManyScheduledClassesBySchool,
    private getManyScheduledClassesByCategoryClass: GetManyScheduledClassesByCategoryClass,
    private getManyScheduledClassesBySchoolAndCategoryClass: GetManyScheduledClassesBySchoolAndCategoryClass,
    private getManyScheduledClassesByStudentAndCategoryClass: GetManyScheduledClassesByStudentAndCategoryClass,
    private getManyScheduledClassesByStudent: GetManyScheduledClassesByStudent,
    private pushNotificationService: PushNotificationService,
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

  @Get('student/:studentId/category')
  async getManyByStudentAndCategory(
    @Param('studentId') studentId: string,
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { scheduledClasses } =
      await this.getManyScheduledClassesByStudentAndCategoryClass.execute(
        studentId,
        category,
      )

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

  @Get('classes/category')
  async getManyByCategoryClass(
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
    @Query('page') page?: number,
    @Query('studentName') studentName?: string,
    @Query('studentNumber') studentNumber?: number,
    @Query('schedulingDate') schedulingDate?: string,
  ) {
    const { scheduledClasses, total } =
      await this.getManyScheduledClassesByCategoryClass.execute({
        categoryClass: category,
        page: page ? Number(page) : undefined,
        studentName,
        studentNumber,
        schedulingDate,
      })

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
      total,
    }
  }

  @Get('category/:schoolId')
  async getManyBySchoolAndCategory(
    @Param('schoolId') schoolId: string,
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
    @Query('page') page?: number,
    @Query('studentName') studentName?: string,
    @Query('studentNumber') studentNumber?: number,
    @Query('schedulingDate') schedulingDate?: string,
  ) {
    const { scheduledClasses, total } =
      await this.getManyScheduledClassesBySchoolAndCategoryClass.execute({
        schoolId,
        categoryClass: category,
        page: page ? Number(page) : undefined,
        studentName,
        studentNumber,
        schedulingDate,
      })

    const scheduledClassesToHTTP = scheduledClasses.map((scheduledClass) =>
      ScheduledClassViewModel.toHTTP(scheduledClass),
    )

    return {
      scheduledClasses: scheduledClassesToHTTP,
      total,
    }
  }

  @Post()
  async create(@Body() body: CreateScheduledClassBody) {
    const { scheduledClass } = await this.createScheduledClass.execute(body)

    // if (scheduledClass.schedulingDate && scheduledClass.schedulingHour) {
    //   await Promise.all([
    //     this.pushNotificationService.sendNotificationToStudent({
    //       studentId: scheduledClass.studentId,
    //       title: 'Nova aula de condução marcada!',
    //       body: `Uma nova aula de condução foi marcada para: ${format(
    //         new Date(scheduledClass.schedulingDate),
    //         'PPP',
    //         { locale: pt },
    //       )} ás ${
    //         scheduledClass.schedulingHour
    //       }, por favor, confirme a sua presença!`,
    //     }),

    //     this.pushNotificationService.sendSmsToStudent({
    //       studentId: scheduledClass.studentId,
    //       body: `Nova aula de condução marcada, ${format(
    //         new Date(scheduledClass.schedulingDate),
    //         'PPP',
    //         { locale: pt },
    //       )} ás ${scheduledClass.schedulingHour}, confirma a tua presença!`,
    //     }),
    //   ])
    // }

    return {
      scheduledClass: ScheduledClassViewModel.toHTTP(scheduledClass),
    }
  }

  @Post('practical-class')
  async createScheduledClassPractical(
    @Body() body: CreatePracticalScheduledClassBody,
  ) {
    const { scheduledClass } = await this.createPracticalScheduledClass.execute(
      body,
    )

    // await Promise.all([
    //   // this.pushNotificationService.sendNotificationToStudent({
    //   //   studentId: scheduledClass.studentId,
    //   //   title: 'Aula de condução marcada!',
    //   //   body: `Uma nova aula de condução foi marcada para: ${format(
    //   //     new Date(scheduledClass.schedulingDate),
    //   //     'PPP',
    //   //     { locale: pt },
    //   //   )} ás ${
    //   //     scheduledClass.schedulingHour
    //   //   }, por favor, confirme a sua presença!`,
    //   // }),

    //   this.pushNotificationService.sendSmsToStudent({
    //     studentId: scheduledClass.studentId,
    //     body: `Nova aula de condução marcada, ${format(
    //       new Date(scheduledClass.schedulingDate),
    //       'PPP',
    //       { locale: pt },
    //     )} ás ${scheduledClass.schedulingHour}, confirma a tua presença!`,
    //   }),
    // ])

    return {
      scheduledClass: ScheduledClassViewModel.toHTTP(scheduledClass),
    }
  }

  @Post('practical-class/create-many')
  async createManyScheduledClass(@Body() body: CreateManyScheduledClassBody) {
    const { scheduledClasses } = await this.createManyScheduledClasses.execute(
      body,
    )

    return {
      scheduledClasses: scheduledClasses.map((scheduledClass) =>
        ScheduledClassViewModel.toHTTP(scheduledClass),
      ),
    }
  }

  @Put(':scheduledClassId')
  async update(
    @Param('scheduledClassId') scheduledClassId: string,
    @Body() body: UpdateScheduledClassBody,
  ) {
    const {
      classId,
      schedulingDate,
      schedulingHour,
      status,
      vehicle,
      instructorId,
    } = body

    const { scheduledClass } = await this.updateScheduledClass.execute({
      scheduledClassId,
      classId,
      schedulingDate,
      schedulingHour,
      status,
      vehicle,
      instructorId,
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

  @Delete(':scheduledClassId')
  async delete(@Param('scheduledClassId') scheduledClassId: string) {
    await this.deleteScheduledClass.execute(scheduledClassId)
  }
}
