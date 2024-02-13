import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { DriverLicenseCategoryRepository } from '../../repositories/driver-license-category-repository'
import { DriverLicenseCategory } from '../../entities/driver-license-category'
import { GetDriverLicenseCategoryById } from './get-driver-license-category-by-id'

interface UpdateDriverLicenseCategoryRequest {
  driverLicenseCategoryId: string
  name?: string
  price?: number
  vehicles?: string[]
  firstInstallment?: number
  secondInstallment?: number
  thirdInstallment?: number
  fourthInstallment?: number
}

interface UpdateDriverLicenseCategoryResponse {
  driverLicenseCategory: DriverLicenseCategory
}

@Injectable()
export class UpdateDriverLicenseCategory {
  constructor(
    private driverLicenseCategoryRepository: DriverLicenseCategoryRepository,
    private getDriverLicenseCategoryById: GetDriverLicenseCategoryById,
  ) {}

  async execute(
    request: UpdateDriverLicenseCategoryRequest,
  ): Promise<UpdateDriverLicenseCategoryResponse> {
    try {
      const {
        driverLicenseCategoryId,
        name,
        price,
        vehicles,
        firstInstallment,
        secondInstallment,
        thirdInstallment,
        fourthInstallment,
      } = request

      const { driverLicenseCategory } =
        await this.getDriverLicenseCategoryById.execute(driverLicenseCategoryId)

      driverLicenseCategory.name = name ?? driverLicenseCategory.name
      driverLicenseCategory.vehicles =
        vehicles ?? driverLicenseCategory.vehicles
      driverLicenseCategory.price =
        Number(price) * 100 ?? driverLicenseCategory.price
      driverLicenseCategory.installments.firstInstallment =
        Number(firstInstallment) * 100 ??
        driverLicenseCategory.installments.firstInstallment
      driverLicenseCategory.installments.secondInstallment =
        Number(secondInstallment) * 100 ??
        driverLicenseCategory.installments.secondInstallment
      driverLicenseCategory.installments.thirdInstallment =
        Number(thirdInstallment) * 100 ??
        driverLicenseCategory.installments.thirdInstallment
      driverLicenseCategory.installments.fourthInstallment =
        Number(fourthInstallment) * 100 ??
        driverLicenseCategory.installments.fourthInstallment

      await this.driverLicenseCategoryRepository.save(driverLicenseCategory)

      return {
        driverLicenseCategory,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
