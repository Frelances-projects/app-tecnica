import { Group } from '../entities/group'

export abstract class GroupsRepository {
  abstract create(group: Group): Promise<void>
  abstract findById(groupId: string): Promise<Group | null>
  abstract findByName(groupName: string): Promise<Group | null>
  abstract findMany(): Promise<Group[]>
}
