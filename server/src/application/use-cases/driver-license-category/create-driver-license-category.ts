import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { DriverLicenseCategoryRepository } from '../../repositories/driver-license-category-repository'
import { DriverLicenseCategory } from '../../entities/driver-license-category'

interface CreateDriverLicenseCategoryRequest {
  name: string
  price: number
  schoolId: string
  vehicles: string[]
  firstInstallment: number
  secondInstallment: number
  thirdInstallment?: number
  fourthInstallment?: number
}

interface CreateDriverLicenseCategoryResponse {
  driverLicenseCategory: DriverLicenseCategory
}

@Injectable()
export class CreateDriverLicenseCategory {
  constructor(
    private driverLicenseCategoryRepository: DriverLicenseCategoryRepository,
  ) {}

  async execute(
    request: CreateDriverLicenseCategoryRequest,
  ): Promise<CreateDriverLicenseCategoryResponse> {
    try {
      const {
        name,
        price,
        schoolId,
        vehicles,
        firstInstallment,
        secondInstallment,
        thirdInstallment,
        fourthInstallment,
      } = request

      const driverLicenseCategory = new DriverLicenseCategory({
        name,
        price: Number(price) * 100,
        schoolId,
        vehicles,
        installments: {
          firstInstallment: Number(firstInstallment) * 100,
          secondInstallment: Number(secondInstallment) * 100,
          thirdInstallment: Number(thirdInstallment) * 100 ?? null,
          fourthInstallment: Number(fourthInstallment) * 100 ?? null,
        },
      })

      await this.driverLicenseCategoryRepository.create(driverLicenseCategory)

      return {
        driverLicenseCategory,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
