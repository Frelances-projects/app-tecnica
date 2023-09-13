import { DriverLicenseCategory } from '../../../application/entities/driver-license-category'

export class DriverLicenseCategoryViewModel {
  static toHTTP(driverLicenseCategory: DriverLicenseCategory) {
    return {
      id: driverLicenseCategory.id,
      name: driverLicenseCategory.name,
      price: driverLicenseCategory.price,
      schoolId: driverLicenseCategory.schoolId,
      installments: driverLicenseCategory.installments,
      createdAt: driverLicenseCategory.createdAt,
    }
  }
}
