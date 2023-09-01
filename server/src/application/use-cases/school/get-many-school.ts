import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { SchoolRepository } from '../../repositories/school-repository'
import { School } from '../../entities/school'

interface GetManySchoolResponse {
  school: School[]
}

@Injectable()
export class GetManySchool {
  constructor(private schoolRepository: SchoolRepository) {}

  async execute(): Promise<GetManySchoolResponse> {
    try {
      const school = await this.schoolRepository.findMany()

      return {
        school,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
