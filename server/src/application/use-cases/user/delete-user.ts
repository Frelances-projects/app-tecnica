import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { UserRepository } from '../../repositories/user-repository'
import { GetUserById } from './get-user-by-id'

@Injectable()
export class DeleteUser {
  constructor(
    private userRepository: UserRepository,
    private getUserById: GetUserById,
  ) {}

  async execute(userId: string): Promise<void> {
    try {
      const { user } = await this.getUserById.execute(userId)

      await this.userRepository.delete(user.id)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
