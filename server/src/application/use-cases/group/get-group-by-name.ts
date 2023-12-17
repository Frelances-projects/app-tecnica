import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { GroupsRepository } from '../../repositories/groups-repository'
import { Group } from '../../entities/group'

interface GetGroupByNameResponse {
  group: Group
}

@Injectable()
export class GetGroupByName {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute(groupName: string): Promise<GetGroupByNameResponse> {
    try {
      const group = await this.groupsRepository.findByName(groupName)

      if (!group) {
        throw new NotFoundException('Group not found')
      }

      return {
        group,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
