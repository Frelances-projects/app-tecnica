import { School } from '../../../application/entities/school'

export class SchoolViewModel {
  static toHTTP(school: any) {
    return {
      id: school.id,
      name: school.name,
      groupId: school.groupId,
      createdAt: school.createdAt,
      driverLicenseCategories: school.props.driverLicenseCategories,
    }
  }
}
