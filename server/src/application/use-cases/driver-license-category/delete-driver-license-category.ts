import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { DriverLicenseCategoryRepository } from '../../repositories/driver-license-category-repository'
import { GetDriverLicenseCategoryById } from './get-driver-license-category-by-id'

@Injectable()
export class DeleteDriverLicenseCategory {
  constructor(
    private driverLicenseCategoryRepository: DriverLicenseCategoryRepository,
    private getDriverLicenseCategoryById: GetDriverLicenseCategoryById,
  ) {}

  async execute(driverLicenseCategoryId: string): Promise<void> {
    try {
      const { driverLicenseCategory } =
        await this.getDriverLicenseCategoryById.execute(driverLicenseCategoryId)

      await this.driverLicenseCategoryRepository.delete(
        driverLicenseCategory.id,
      )
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
