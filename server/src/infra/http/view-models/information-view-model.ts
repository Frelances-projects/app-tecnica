import { Information } from '../../../application/entities/information'

export class InformationViewModel {
  static toHTTP(information: any) {
    return {
      id: information.id,
      name: information.name,
      description: information.description,
      date: information.date,
      schoolId: information.schoolId,
      createdAt: information.createdAt,
      school: information.props.school,
    }
  }
}
