import { DriverLicenseCategory as RawDriverLicenseCategory } from '@prisma/client'

import {
  DriverLicenseCategory,
  Installments,
} from '../../../../application/entities/driver-license-category'

export class PrismaDriverLicenseCategoryMapper {
  static toPrisma(driverLicenseCategory: DriverLicenseCategory) {
    return {
      id: driverLicenseCategory.id,
      name: driverLicenseCategory.name,
      schoolId: driverLicenseCategory.schoolId,
      price: driverLicenseCategory.price,
      installments: driverLicenseCategory.installments,
      vehicles: driverLicenseCategory.vehicles,
      createdAt: driverLicenseCategory.createdAt,
    }
  }

  static toDomain(raw: RawDriverLicenseCategory): DriverLicenseCategory {
    return new DriverLicenseCategory(
      {
        name: raw.name,
        schoolId: raw.schoolId,
        price: raw.price,
        installments: raw.installments as unknown as Installments,
        vehicles: raw.vehicles,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
