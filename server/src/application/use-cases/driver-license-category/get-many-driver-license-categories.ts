import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { DriverLicenseCategoryRepository } from '../../repositories/driver-license-category-repository'
import { DriverLicenseCategory } from '../../entities/driver-license-category'

interface GetManyDriverLicenseCategoryResponse {
  driverLicenseCategories: DriverLicenseCategory[]
}

@Injectable()
export class GetManyDriverLicenseCategory {
  constructor(
    private driverLicenseCategoryRepository: DriverLicenseCategoryRepository,
  ) {}

  async execute(): Promise<GetManyDriverLicenseCategoryResponse> {
    try {
      const driverLicenseCategories =
        await this.driverLicenseCategoryRepository.findMany()

      return {
        driverLicenseCategories,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
