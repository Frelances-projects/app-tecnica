import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Class } from '../../entities/class'
import { GetManyClasses } from './get-many-classes'
import { ClassRepository } from '../../repositories/class-repository'
import { generateRandomCode } from '../../../helpers/generate-random-code'

interface CreateClassRequest {
  name: string
  category: 'THEORETICAL' | 'PRACTICAL'
  description?: string
  code?: number
}

interface CreateClassResponse {
  class: Class
}

@Injectable()
export class CreateClass {
  constructor(
    private classRepository: ClassRepository,
    private getManyClasses: GetManyClasses,
  ) {}

  async execute(request: CreateClassRequest): Promise<CreateClassResponse> {
    try {
      const { name, category, description, code } = request

      if (code) {
        const lesson = new Class({
          name,
          category,
          description,
          code,
        })

        await this.classRepository.create(lesson)

        return {
          class: lesson,
        }
      } else {
        const { classes } = await this.getManyClasses.execute()

        let uniqueCode: number
        do {
          uniqueCode = generateRandomCode(6)
        } while (classes.some((lesson) => lesson.code === uniqueCode))

        const lesson = new Class({
          name,
          category,
          description,
          code: uniqueCode,
        })

        await this.classRepository.create(lesson)

        return {
          class: lesson,
        }
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
