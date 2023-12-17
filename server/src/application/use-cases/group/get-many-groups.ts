import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { GroupsRepository } from '../../repositories/groups-repository'
import { Group } from '../../entities/group'

interface GetManyGroupsResponse {
  groups: Group[]
}

@Injectable()
export class GetManyGroups {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute(): Promise<GetManyGroupsResponse> {
    try {
      const groups = await this.groupsRepository.findMany()

      return {
        groups,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
