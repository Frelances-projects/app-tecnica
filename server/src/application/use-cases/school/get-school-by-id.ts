import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { SchoolRepository } from '../../repositories/school-repository'
import { School } from '../../entities/school'

interface GetSchoolByIdResponse {
  school: School
}

@Injectable()
export class GetSchoolById {
  constructor(private schoolRepository: SchoolRepository) {}

  async execute(schoolId: string): Promise<GetSchoolByIdResponse> {
    try {
      const school = await this.schoolRepository.findById(schoolId)

      if (!school) {
        throw new NotFoundException('School not found')
      }

      return {
        school,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
