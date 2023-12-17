import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

import { CreateGroup } from '../../../application/use-cases/group/create-group'
import { GetGroupById } from '../../../application/use-cases/group/get-group-by-id'
import { GetGroupByName } from '../../../application/use-cases/group/get-group-by-name'
import { GetManyGroups } from '../../../application/use-cases/group/get-many-groups'

import { GroupViewModel } from '../view-models/group-view-model'

import { CreateGroupBody } from '../dtos/group/create-group-body'

@Controller('group')
export class GroupController {
  constructor(
    private createGroup: CreateGroup,
    private getGroupById: GetGroupById,
    private getGroupByName: GetGroupByName,
    private getManyGroups: GetManyGroups,
  ) {}

  @Get(':groupId')
  async getById(@Param('groupId') groupId: string) {
    const { group } = await this.getGroupById.execute(groupId)

    return {
      group: GroupViewModel.toHTTP(group),
    }
  }

  @Get('name/find')
  async getByName(@Query('groupName') groupName: string) {
    const { group } = await this.getGroupByName.execute(groupName)

    return {
      group: GroupViewModel.toHTTP(group),
    }
  }

  @Get()
  async getMany() {
    const { groups } = await this.getManyGroups.execute()

    const groupsToHTTP = groups.map((group) => GroupViewModel.toHTTP(group))

    return {
      groups: groupsToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateGroupBody) {
    const { group } = await this.createGroup.execute(body)

    return {
      group: GroupViewModel.toHTTP(group),
    }
  }
}
