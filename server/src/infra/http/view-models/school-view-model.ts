import { School } from '../../../application/entities/school'

export class SchoolViewModel {
  static toHTTP(school: any) {
    return {
      id: school.id,
      name: school.name,
      createdAt: school.createdAt,
      driverLicenseCategories: school.props.driverLicenseCategories,
    }
  }
}
