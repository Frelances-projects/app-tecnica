import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

import { CreateClass } from 'src/application/use-cases/class/create-class'
import { GetClassById } from '../../../application/use-cases/class/get-class-by-id'
import { GetClassByCode } from '../../../application/use-cases/class/get-class-by-code'
import { GetManyClasses } from '../../../application/use-cases/class/get-many-classes'
import { GetManyClassesByCategory } from '../../../application/use-cases/class/get-many-classes-by-category'
import { GetManyClassesByCategoryAndStudent } from '../../../application/use-cases/class/get-many-classes-by-category-and-student'

import { ClassViewModel } from '../view-models/class-view-model'
import { CreateClassBody } from '../dtos/class/create-class-body'

@Controller('class')
export class ClassController {
  constructor(
    private createClass: CreateClass,
    private getClassById: GetClassById,
    private getClassByCode: GetClassByCode,
    private getManyClasses: GetManyClasses,
    private getManyClassesByCategory: GetManyClassesByCategory,
    private getManyClassesByCategoryAndStudent: GetManyClassesByCategoryAndStudent,
  ) {}

  @Get(':classId')
  async getById(@Param('classId') classId: string) {
    const { class: lesson } = await this.getClassById.execute(classId)

    return {
      class: ClassViewModel.toHTTP(lesson),
    }
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: number) {
    const { class: lesson } = await this.getClassByCode.execute(Number(code))

    return {
      class: ClassViewModel.toHTTP(lesson),
    }
  }

  @Get()
  async getMany() {
    const { classes } = await this.getManyClasses.execute()

    const classesToHTTP = classes.map((lesson) => ClassViewModel.toHTTP(lesson))

    return {
      classes: classesToHTTP,
    }
  }

  @Get('category/class-category')
  async getManyByCategory(
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { classes } = await this.getManyClassesByCategory.execute(category)

    const classesToHTTP = classes.map((lesson) => ClassViewModel.toHTTP(lesson))

    return {
      classes: classesToHTTP,
    }
  }

  @Get('category/:studentId')
  async getManyByCategoryAndStudent(
    @Param('studentId') studentId: string,
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { classes } = await this.getManyClassesByCategoryAndStudent.execute({
      category,
      studentId,
    })

    const classesToHTTP = classes.map((lesson) => ClassViewModel.toHTTP(lesson))

    return {
      classes: classesToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateClassBody) {
    console.log(
      '🚀 ~ file: class.controller.ts:85 ~ ClassController ~ create ~ CreateClassBody:',
      CreateClassBody,
    )
    const { class: lesson } = await this.createClass.execute(body)

    return {
      class: ClassViewModel.toHTTP(lesson),
    }
  }
}
