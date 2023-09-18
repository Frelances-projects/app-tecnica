import { Information } from '../entities/information'

export abstract class InformationRepository {
  abstract create(information: Information): Promise<void>
  abstract findById(informationId: string): Promise<Information | null>
  abstract delete(informationId: string): Promise<void>
  abstract findMany(): Promise<Information[]>
  abstract findManyBySchool(schoolId: string): Promise<Information[]>
  abstract save(information: Information): Promise<void>
}
