import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { SchoolRepository } from '../../repositories/school-repository'
import { School } from '../../entities/school'

interface CreateSchoolRequest {
  name: string
  groupId?: string
}

interface CreateSchoolResponse {
  school: School
}

@Injectable()
export class CreateSchool {
  constructor(private schoolRepository: SchoolRepository) {}

  async execute(request: CreateSchoolRequest): Promise<CreateSchoolResponse> {
    try {
      const { name, groupId } = request

      const school = new School({ name, groupId })

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
