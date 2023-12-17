import { Group } from '../../../application/entities/group'

export class GroupViewModel {
  static toHTTP(group: any) {
    return {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      schools: group.props.schools,
    }
  }
}
