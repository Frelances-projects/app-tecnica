import { School } from '../entities/school'

export abstract class SchoolRepository {
  abstract create(school: School): Promise<void>
  abstract findById(schoolId: string): Promise<School | null>
  abstract findMany(): Promise<School[]>
}
