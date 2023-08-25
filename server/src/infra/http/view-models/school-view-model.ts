import { School } from '../../../application/entities/school'

export class SchoolViewModel {
  static toHTTP(school: School) {
    return {
      id: school.id,
      name: school.name,
      createdAt: school.createdAt,
    }
  }
}
