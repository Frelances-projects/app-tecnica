import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { SchoolRepository } from '../../repositories/school-repository'
import { School } from '../../entities/school'

interface CreateSchoolRequest {
  name: string
}

interface CreateSchoolResponse {
  school: School
}

@Injectable()
export class CreateSchool {
  constructor(private schoolRepository: SchoolRepository) {}

  async execute(request: CreateSchoolRequest): Promise<CreateSchoolResponse> {
    try {
      const { name } = request

      const school = new School({ name })

      await this.schoolRepository.create(school)

      return {
        school,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
