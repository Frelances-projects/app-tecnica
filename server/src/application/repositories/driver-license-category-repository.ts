import { DriverLicenseCategory } from '../entities/driver-license-category'

export abstract class DriverLicenseCategoryRepository {
  abstract create(driverLicenseCategory: DriverLicenseCategory): Promise<void>
  abstract findById(
    driverLicenseCategoryId: string,
  ): Promise<DriverLicenseCategory | null>

  abstract findMany(): Promise<DriverLicenseCategory[]>
  abstract findManyBySchool(schoolId: string): Promise<DriverLicenseCategory[]>
  abstract save(driverLicenseCategory: DriverLicenseCategory): Promise<void>
  abstract delete(driverLicenseCategoryId: string): Promise<void>
}
