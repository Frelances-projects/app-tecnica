import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'

import { UserRepository } from '../../repositories/user-repository'
import { User } from '../../entities/user'

interface GetUserByIdResponse {
  user: User
}

@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<GetUserByIdResponse> {
    try {
      const user = await this.userRepository.findById(userId)

      if (!user) {
        throw new NotFoundException('User not found')
      }

      return {
        user,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
