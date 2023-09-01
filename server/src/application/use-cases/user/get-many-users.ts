import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { UserRepository } from '../../repositories/user-repository'
import { User } from '../../entities/user'

interface GetManyUsersResponse {
  users: User[]
}

@Injectable()
export class GetManyUsers {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<GetManyUsersResponse> {
    try {
      const users = await this.usersRepository.findMany()

      return {
        users,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
