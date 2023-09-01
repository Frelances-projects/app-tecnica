import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { UserRepository } from '../../repositories/user-repository'
import { User } from '../../entities/user'

interface GetManyUsersBySchoolResponse {
  users: User[]
}

@Injectable()
export class GetManyUsersBySchool {
  constructor(private usersRepository: UserRepository) {}

  async execute(schoolId: string): Promise<GetManyUsersBySchoolResponse> {
    try {
      const users = await this.usersRepository.findManyBySchool(schoolId)

      return {
        users,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
