import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { DriverLicenseCategoryRepository } from '../../repositories/driver-license-category-repository'
import { DriverLicenseCategory } from '../../entities/driver-license-category'

interface GetDriverLicenseCategoryByIdResponse {
  driverLicenseCategory: DriverLicenseCategory
}

@Injectable()
export class GetDriverLicenseCategoryById {
  constructor(
    private driverLicenseCategoryRepository: DriverLicenseCategoryRepository,
  ) {}

  async execute(
    driverLicenseCategoryId: string,
  ): Promise<GetDriverLicenseCategoryByIdResponse> {
    try {
      const driverLicenseCategory =
        await this.driverLicenseCategoryRepository.findById(
          driverLicenseCategoryId,
        )

      if (!driverLicenseCategory) {
        throw new NotFoundException('Driver License Category not found')
      }

      return {
        driverLicenseCategory,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
