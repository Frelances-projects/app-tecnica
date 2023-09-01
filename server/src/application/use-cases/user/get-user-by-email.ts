import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { UserRepository } from '../../repositories/user-repository'
import { User } from '../../entities/user'

interface GetUserByEmailResponse {
  user: User | null
}

@Injectable()
export class GetUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<GetUserByEmailResponse> {
    try {
      const user = await this.userRepository.findByEmail(email)

      if (!user) {
        return { user: null }
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
