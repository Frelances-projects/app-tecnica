import { DriverLicenseCategory } from '../../../application/entities/driver-license-category'

export class DriverLicenseCategoryViewModel {
  static toHTTP(driverLicenseCategory: any) {
    return {
      id: driverLicenseCategory.id,
      name: driverLicenseCategory.name,
      price: driverLicenseCategory.price,
      schoolId: driverLicenseCategory.schoolId,
      installments: driverLicenseCategory.installments,
      vehicles: driverLicenseCategory.vehicles,
      createdAt: driverLicenseCategory.createdAt,
      school: driverLicenseCategory.props.school,
    }
  }
}
