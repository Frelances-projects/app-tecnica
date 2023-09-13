import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { DriverLicenseCategoryRepository } from '../../repositories/driver-license-category-repository'
import { DriverLicenseCategory } from '../../entities/driver-license-category'

interface GetManyDriverLicenseCategoryBySchoolResponse {
  driverLicenseCategories: DriverLicenseCategory[]
}

@Injectable()
export class GetManyDriverLicenseCategoryBySchool {
  constructor(
    private driverLicenseCategoryRepository: DriverLicenseCategoryRepository,
  ) {}

  async execute(
    schoolId: string,
  ): Promise<GetManyDriverLicenseCategoryBySchoolResponse> {
    try {
      const driverLicenseCategories =
        await this.driverLicenseCategoryRepository.findManyBySchool(schoolId)

      return {
        driverLicenseCategories,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
