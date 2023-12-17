import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { GroupsRepository } from '../../repositories/groups-repository'
import { Group } from '../../entities/group'

interface CreateGroupRequest {
  name: string
}

interface CreateGroupResponse {
  group: Group
}

@Injectable()
export class CreateGroup {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute(request: CreateGroupRequest): Promise<CreateGroupResponse> {
    try {
      const { name } = request

      const group = new Group({ name })

      await this.groupsRepository.create(group)

      return {
        group,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
