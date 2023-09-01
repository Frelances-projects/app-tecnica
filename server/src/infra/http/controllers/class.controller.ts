import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CreateClass } from 'src/application/use-cases/class/create-class'
import { GetClassById } from '../../../application/use-cases/class/get-class-by-id'
import { GetManyClasses } from '../../../application/use-cases/class/get-many-classes'
import { GetManyClassesByCategory } from '../../../application/use-cases/class/get-many-classes-by-category'

import { ClassViewModel } from '../view-models/class-view-model'
import { CreateClassBody } from '../dtos/class/create-class-body'
import { GetClassesByCategoryBody } from '../dtos/class/get-classes-by-category-body'

@Controller('class')
export class ClassController {
  constructor(
    private createClass: CreateClass,
    private getClassById: GetClassById,
    private getManyClasses: GetManyClasses,
    private getManyClassesByCategory: GetManyClassesByCategory,
  ) {}

  @Get(':classId')
  async getById(@Param('classId') classId: string) {
    const { class: lesson } = await this.getClassById.execute(classId)

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

  @Get('category')
  async getManyByCategory(@Body() body: GetClassesByCategoryBody) {
    const { classes } = await this.getManyClassesByCategory.execute(
      body.category,
    )

    const classesToHTTP = classes.map((lesson) => ClassViewModel.toHTTP(lesson))

    return {
      classes: classesToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateClassBody) {
    const { class: lesson } = await this.createClass.execute(body)

    return {
      class: ClassViewModel.toHTTP(lesson),
    }
  }
}
