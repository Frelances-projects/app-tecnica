import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { GroupsRepository } from '../../repositories/groups-repository'
import { Group } from '../../entities/group'

interface GetGroupByIdResponse {
  group: Group
}

@Injectable()
export class GetGroupById {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute(groupId: string): Promise<GetGroupByIdResponse> {
    try {
      const group = await this.groupsRepository.findById(groupId)

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
